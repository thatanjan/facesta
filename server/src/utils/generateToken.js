import jwt from 'jsonwebtoken'

export default async user => {
	const { _id, name, avatar } = user

	const payload = {
		id: _id,
		name,
		avatar,
	}

	const promise = new Promise((response, reject) => {
		jwt.sign(
			payload,
			process.env.SECRET_KEY,
			{ expiresIn: '24h' },
			(err, token) => {
				if (err) return reject(err)

				response(token)
				return true
			}
		)
	})

	const token = await promise

	return `Bearer ${token}`
}
