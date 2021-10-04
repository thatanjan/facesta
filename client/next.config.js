module.exports = {
	images: {
		loader: 'cloudinary',
		path: process.env.NEXT_PUBLIC_CLOUDINARY_URL,
	},
	async redirects() {
		return [
			{
				source: `/`,
				destination: '/under-construction',
				permanent: true,
			},
		]
	},
}
