import cloudinary from 'cloudinary'

const cloudinaryV2 = cloudinary.v2

cloudinaryV2.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
})

export default cloudinaryV2
