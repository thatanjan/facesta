interface ReturnObject {
	redirect: {
		permanent: boolean
		destination: string
	}
}

export default (destination: string): ReturnObject => ({
	redirect: {
		permanent: false,
		destination,
	},
})
