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

dotenv.config()

mongoose
    .connect(process.env.USERS_DB_URI)
    .then(() => {
        console.log('mongoose connected')
    })
    .catch((error) => {
        console.log(error)
    })

const app = express()

app.use(cors())

app.use(
    jwt({
        secret: process.env.SECRET_KEY,
        algorithms: ['HS256'],
        credentialsRequired: false,
    })
)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        req.UnauthorizedError = err.message
        console.log(req.UnauthorizedError)
        res.status(401).send('invalid token...')
    }

    next()
})

app.post('/validate', ({ body }, res) => {
    const { jwt } = body

    jwtoken.verify(jwt, process.env.SECRET_KEY, (err) => {
        if (err) {
            res.status(401).send(err)
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
