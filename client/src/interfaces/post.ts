export default interface Post {
	_id: string
	text: string
	headline: string
	image: string
	markdown: boolean
	totalLikes: number
	totalComments: number
	user: PostUser
}

interface PostUser {
	name: string
	_id: string
	profile?: {
		profilePicture: string
	}
}
