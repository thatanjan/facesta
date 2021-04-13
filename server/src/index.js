import 'core-js/stable'
import 'regenerator-runtime/runtime'
import mongoose from 'mongoose'
import express from 'express'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import { applyMiddleware } from 'graphql-middleware'
import jwt from 'express-jwt'
import dotenv from 'dotenv'
import cors from 'cors'
import jwtToken from 'jsonwebtoken'

import permissions from 'config/permissions'

import typeDefs from 'graphql/typedefs'
import resolvers from 'graphql/resolvers'

const cloudinary = require('cloudinary').v2

dotenv.config()

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})
const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

mongoose
	.connect(process.env.USERS_DB_URI, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {})
	.catch(error => {
		// eslint-disable-next-line
		console.log(error)
	})

app.use(cors())

app.use(
	jwt({
		secret: process.env.SECRET_KEY,
		algorithms: ['HS256'],
		credentialsRequired: false,
	})
)

app.use((err, req, _, next) => {
	if (err.name === 'UnauthorizedError') {
		req.UnauthorizedError = err.message
	}

	next()
})

const removeBearer = token => {
	const parts = token.split(' ')
	if (parts.length === 2) {
		const scheme = parts[0]
		const credentials = parts[1]

		if (/^Bearer$/i.test(scheme)) {
			const newToken = credentials

			return newToken
		}
	}

	return token
}

app.post('/validate', ({ body }, res) => {
	const {
		data: { jwt: token },
	} = body

	const newToken = removeBearer(token)

	jwtToken.verify(newToken, process.env.SECRET_KEY, err => {
		if (err) {
			res.status(401).send(err)
		} else {
			res.status(200).send('calm down')
		}
	})
})

const server = new ApolloServer({
	schema: applyMiddleware(
		makeExecutableSchema({ typeDefs, resolvers }),
		permissions
	),
	context: ctx => {
		const {
			req: { user, UnauthorizedError },
		} = ctx

		if (user) {
			return { ...ctx, user }
		}

		if (UnauthorizedError) {
			return { error: UnauthorizedError }
		}

		return ctx
	},
})

server.applyMiddleware({ app })

const port = process.env.PORT || 9000

app.listen({ port })
