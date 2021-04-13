import cloudinary from 'cloudinary'

const uploadImage = async (image, options) => {
	try {
		// eslint-disable-next-line
		const { public_id } = await cloudinary.v2.uploader.upload(image, options)

		// eslint-disable-next-line
		return public_id
	} catch (err) {
		return err
	}
}

export default uploadImage
