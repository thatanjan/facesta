import 'core-js/stable'
import 'regenerator-runtime/runtime'
import mongoose from 'mongoose'
import express from 'express'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import { applyMiddleware } from 'graphql-middleware'
import jwt from 'express-jwt'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import jwtoken from 'jsonwebtoken'

import permissions from 'config/permissions'

import typeDefs from 'graphql/typedefs'
import resolvers from 'graphql/resolvers'

const cloudinary = require('cloudinary').v2

dotenv.config()

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
})
const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extend: true }))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose
	.connect(process.env.USERS_DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('mongoose connected')
	})
	.catch(error => {
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

app.use(function (err, req, _, next) {
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
}

app.post('/validate', ({ body }, res) => {
	const {
		data: { jwt },
	} = body

	const newToken = removeBearer(jwt)

	jwtoken.verify(newToken, process.env.SECRET_KEY, err => {
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
	context: ({ req: { user, UnauthorizedError } }) => {
		if (user) {
			return { user }
		}

		if (UnauthorizedError) {
			return { error: UnauthorizedError }
		}
	},
})

server.applyMiddleware({ app })

const port = process.env.PORT || 8000

app.listen({ port }, () => {
	console.log(`server is running at ${port}`)
})
