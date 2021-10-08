import cloudinary from 'cloudinary'

const deleteResources = ({ publicIDs, prefix }) => {
	const cloudinaryV2 = cloudinary.v2

	if (prefix) return cloudinaryV2.api.delete_resources_by_prefix(prefix)

	if (publicIDs.length === 0) return false

	return cloudinaryV2.api.delete_resources(publicIDs)
}

export default deleteResources
