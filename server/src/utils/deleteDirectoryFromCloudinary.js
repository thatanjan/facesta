import cloudinary from 'cloudinary'

const deleteDirectory = prefix => {
	const cloudinaryV2 = cloudinary.v2

	if (!prefix) return false

	return cloudinaryV2.api.delete_folder(prefix)
}

export default deleteDirectory
