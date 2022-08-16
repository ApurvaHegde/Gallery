var express = require('express');
var galleryController = require('./controllers/galleryController');

var app = express();

// Template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

// fire controllers
galleryController(app);

// listen to port
const port = process.env.PORT | 3000 
app.listen(port);
console.log('You are listening to port '+port);