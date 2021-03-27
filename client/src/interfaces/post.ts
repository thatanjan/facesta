export default interface Post {
	_id: string
	text: string
	headline: string
	image: string
	markdown: boolean
	totalLikes: number
	totalComments: number
	user: PostUser
	date: Date
}

export interface Comment {
	text: string
	date: Date
	user: PostUser
}

interface PostUser {
	name: string
	_id: string
	profile: {
		profilePicture: string
	}
}
