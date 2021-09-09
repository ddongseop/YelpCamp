const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
	cloud_name: process.env.CLOUDYNARY_CLOUD_NAME,
	api_key: process.env.CLOUDYNARY_KEY,
	api_secret: process.env.CLOUDYNARY_SECRET
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: 'YelpCamp', //Cloudinary Storage 안에 어떤 폴더명으로 저장할건지 
		allowedFormats: ['jpeg', 'png', 'jpg']
	}
});

module.exports = {
	cloudinary,
	storage
}