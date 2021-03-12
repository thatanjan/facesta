import cloudinary from 'cloudinary'

const deleteImage = async imageID => {
	if (!imageID) return false

	try {
		return await cloudinary.v2.uploader.destroy(imageID)
	} catch (err) {
		return err
	}
}

export default deleteImage
