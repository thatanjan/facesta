import { User as PostUser } from './user'

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
	hasLiked: boolean
}

export interface Comment {
	text: string
	date: Date
	user: PostUser
}
