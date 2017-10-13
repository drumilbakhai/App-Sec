// The main server file that helps to execute different functionality of the web-app.

// Including various dependencies for the executing the code
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

// Multer is a express library that allows the user to upload files to the Nodejs Server 
var multer = require('multer');

// The Controller file for the the logic of uploading and displaying images
var routesControls = require('./controller/imagesFile');

// The storage variable is used to store the filename on the directory names /public/uploads.
var storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, 'public/uploads')
 },
 filename: function(req, file, cb) {
 cb(null, file.originalname);
 }
});

// Setting the multer storage to the variable upload
var upload = multer({ storage:storage });


app.use(express.static(__dirname + '/public'));
mongoose.Promise = global.Promise;

// Connection to the mongoDB using the mongoose interface.
var promise = mongoose.connect('mongodb://localhost/sampleData', {
	useMongoClient: true
})

// If success then display the success on the console
promise.then(function(db){
	console.log('Connection Successfull');
})
.catch(function(err){
	console.log('Not able to make connection because '+err);
});

// Different routes to handle the logic. 
app.route('/')
  	.get(routesControls.connection)
  	.post(upload.single('myimage'),routesControls.uploadImage)

app.route('/images')
	.get(routesControls.getAllImages);

app.route('/images/:user')
	.get(routesControls.getImagesByUser);

app.route('/redirect')
   .get(routesControls.redirect);

app.route('/pagination')
   .get(routesControls.displayPagination);


app.listen(port);

console.log('Server Started on '+port);