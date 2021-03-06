// The main server file that helps to execute different functionality of the web-app.

// Including various dependencies for the executing the code
var express = require('express');
var app = express();
var helmet = require('helmet');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var path = require('path');
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
var upload = multer({ 
	storage:storage,
	fileFilter: function(req, file, callback){
		var ext = path.extname(file.originalname);
		console.log('File Extension is '+path.extname(file.originalname));
		
		if(ext !== '.png' && ext !== '.JPG' && ext !== '.gif' && ext !== '.jpeg') {
        	return callback(new Error('Only images are allowed'))
    	}
		callback(null, true)
	}
});


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

// Configuring the server for production level security.
app.use(helmet());

app.route('/images/user_*')
   .get(routesControls.handlingInvalidPages);

app.use(function(err,req,res,next){
	if(err.status !== 404){
		return next();
	}
	res.send(err.message || 'Page Not Found. Please Try a Valid URL');
});

// Different routes to handle the logic. 
app.route('/index')
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

app.use(function (req, res, next) {
  res.removeHeader("X-Powered-By");
  next();
});



app.listen(port);

console.log('Server Started on '+port);