const path = require('path');
const multer = require('multer');
var Gallery = require('express-photo-gallery');

// File Upload
const storage = multer.diskStorage({
    destination: './public/assets/images',
    filename: (req, file, cb) => {
        console.log(file),
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
}).single('image');

// Check file type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
}


module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('gallery');
    });

    app.post('/', (req, res) => {
        upload(req, res, (err) => {
            if(err) {
                res.render('gallery', {
                    msg: err
                });
            }
            else {
                if(req.file == undefined){
                    res.render('gallery', {
                      msg: 'Error: No File Selected!'
                    });
                  } else {
                    res.render('gallery', {
                      msg: 'File Uploaded!',
                      file: `assets/images/${req.file.filename}`
                    });
                  }
            }
        });        
    });

    var options = {
        title: 'My Awesome Photo Gallery'
    };
    
    app.use('/photos', Gallery('./public/assets/images', options));
};