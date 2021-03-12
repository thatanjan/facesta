import cloudinary from 'cloudinary'

const deleteImage = async imageID => {
	if (!imageID) return false

	try {
		await cloudinary.v2.uploader.destroy(imageID)
	} catch (err) {
		return err
	}

	return false
}

export default deleteImage
