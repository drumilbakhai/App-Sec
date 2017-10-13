// The control file to handle different API routes

var express = require('express');
var router = express.Router();
var multer = require('multer');
var mongoose = require('mongoose');
var fs = require('fs');

mongoose.set('debug', true);
// Defining mongoose schema.
var imageSchema = mongoose.Schema({
	user:{
		type: String,
		default: 'guest'
	},
	path:{
		type: String,
		required: true
	},
	originalname:{
		type: String,
		required: true
	},
	created:{
		type: Date,
		default: Date.now
	},
	caption:{
		type: String,
		default: 'No Caption Inserted'
	}
});

// Setting the mongoose to the different variables
var SingleImage = mongoose.model('image', imageSchema);


exports.connection = function(req,res){
	res.render('../views/index.ejs');
};

// The main logic to upload the images to the local directory.
exports.uploadImage = function(req,res){
	console.log('file name is '+req.file);
	if(!req.file){
		res.render('../views/error_upload.ejs');
	}
	else{
		// The dictionary imagePath contains different attributes such as path, original name and caption to store in mongoose.
		var imagePath = {}
		imagePath['path'] = req.file.path;
		imagePath['originalname'] = req.file.originalname;
		imagePath['caption'] = req.body.caption;

		// Calling the helper function to add image to the mongoose. The callback handles the error and data.
		addImage(imagePath, function(err,data){
			if(err){
				// Calling the page to render error message page.
				res.render('../views/error_upload.ejs');
			}
			else{
				// Calling the page to render Success message page.
				res.render('../views/success_upload.ejs')	
			}
		})
		
	}

}

exports.getAllImages = function(req,res){
	customPagination(req,res);
}

exports.getImagesByUser = function(req,res){
	// Call the function customPagination to retreive images specific to the user.
	var user = req.params.user;
	customPagination(req,res,user);
	
}

exports.redirect = function(req,res){
	res.render('../views/index.ejs');
}

exports.displayPagination= function(req, res){
	customPagination(req,res);
}

function addImage(imagePath, callback){
	SingleImage.create(imagePath, function(err,data){
		if(err){
			callback(err,null);
		}
		else{
			callback(null,data);
		}
	})
}


function customPagination(req,res,user){
	var query = {};
	if(!user){
		query={};
	}
	else{
		query['user'] = user
	}
	//set default variables
	var pageSize = 10,
	    currentPage = 1,
		images = [],
		imagesArrays = [],
		imagesList = [];
    
	// Getting the total number of images from the mongodb
   	SingleImage.count({}, function(err,count){
   		if(err){
   			console.log('err')
   		}
   		else{
   			var totalImages = count;
   			// pageCount Variables defines the total number of images.
   			var pageCount = Math.ceil(totalImages / pageSize);
   			console.log('Total Images are '+totalImages)
   			console.log("Query is "+query);
   			// Getting the records of the images using the find method. If the user is mentioned then retrieves the images uploaded only by that user.
   			SingleImage.find(query, ["-_id","path","user","caption"]).sort({'created':-1}).exec(function(err,data){
   				if(err){
   					console.log('Problem in retrieving Images '+err)
   				}
   				else{
   					// console.log(data);
   					// Making the images array to store the images record from the mongodb.
   					data.forEach(function(record){
   						var results = {};
   						results['user'] = record.user;
						results['caption'] = record.caption;
						var finalPath = record.path.replace('public','');
						results['path'] = finalPath;	
   						images.push(results);

   					})
   					// Here splicing the images array to according to the page size. I.E store the images of 1-10 in index 1 position.
   					// images 11-20 to index 2 position.
   					while(images.length > 0){
   						imagesArrays.push(images.splice(0,pageSize))
   					}
   					console.log('Images Aray splicer '+imagesArrays);
   					// Get the data only according the page index. 

   					if (typeof req.query.page !== 'undefined') {
				        currentPage = +req.query.page;
				    }
				    // If the pagenumber 2 is request all the imagesArray in the index 2 is retreived and send to the pagination front end
   					imagesList = imagesArrays[+currentPage -1];
   					// res.send(imagesList);
   					res.render('../views/pagination.ejs',{
   						images: imagesList,
	   					pageSize: pageSize,
				        totalImages: totalImages,
				        pageCount: pageCount,
				        currentPage: currentPage
				    });

   				}

   			})

   		}
   	})

}
