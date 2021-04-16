module.exports = {
	images: {
		loader: 'cloudinary',
		path:
			process.env.NODE_ENV === 'production'
				? 'https://res.cloudinary.com/anjancules/'
				: 'https://res.cloudinary.com/thatanjan/',
	},
}
