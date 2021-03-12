import cloudinary from 'cloudinary'

const deleteImage = async ({ path, imageID }) => {
	if (!imageID) return false

	try {
		await cloudinary.v2.uploader.destroy(`${path}${imageID}`)
	} catch (err) {
		return err
	}

	return false
}

export default deleteImage
