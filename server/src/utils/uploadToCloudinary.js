import cloudinary from 'cloudinary'

const uploadImage = async (image, options) => {
	try {
		const { public_id } = await cloudinary.v2.uploader.upload(image, options)

		return public_id
	} catch (err) {
		return err
	}
}

export default uploadImage
