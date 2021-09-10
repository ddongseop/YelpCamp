const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	//useCreateIndex: true, -> 이거 이젠 필요 없음
	//sudo service mongod start로 MongoDB 시작 시켜주기
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
	console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async()=>{
	await Campground.deleteMany({});
	for(let i=0; i<50; i++){
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			//YOUR USER ID, if delete user info -> problem occurs
			author: '613872495c22911c99dc07c0',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			price, //price: price
			geometry: {type: "Point", coordinates: [-113.1331, 47.0202]},
			images: [
				{
					url: 'https://res.cloudinary.com/dgd1vqykn/image/upload/v1631246975/YelpCamp/cstq60fhdgbdjyvpdp5h.jpg',
					filename: 'YelpCamp/cstq60fhdgbdjyvpdp5h'
				},
				{
					url: 'https://res.cloudinary.com/dgd1vqykn/image/upload/v1631246975/YelpCamp/ntns32asydhaut1c4ilq.jpg',
					filename: 'YelpCamp/ntns32asydhaut1c4ilq'
				}
			]
		})
		await camp.save();
	}
}

seedDB().then(() => {
	mongoose.connection.close();
});