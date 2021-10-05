const FOLLOWERS = 'followers'
const FOLLOWEE = 'followee'
const FOLLOWEES = 'followees'
const FOLLOWER = 'follower'
const FOLLOWING = 'following'
const ERROR_MESSAGE = 'errorMessage'
const MESSAGE = 'message'
const ERROR = 'error'

const postProjection = {
	text: 1,
	images: 1,
	markdown: 1,
	_id: 1,
	title: 1,
	totalLikes: 1,
	totalComments: 1,
	date: 1,
}

const stringRequired = {
	type: String,
	required: true,
}

const populateObjectOfUser = {
	path: 'user',
	select: 'profile',
	populate: {
		path: 'profile',
		select: 'profilePicture name -_id',
	},
}

export {
	FOLLOWERS,
	FOLLOWEE,
	FOLLOWEES,
	FOLLOWER,
	FOLLOWING,
	MESSAGE,
	ERROR_MESSAGE,
	ERROR,
	postProjection,
	stringRequired,
	populateObjectOfUser,
}
