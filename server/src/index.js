import mongoose from 'mongoose'
import express from 'express'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import { applyMiddleware } from 'graphql-middleware'
import jwt from 'express-jwt'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

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

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

app.use(
    jwt({
        secret: process.env.SECRET_KEY,
        algorithms: ['HS256'],
        credentialsRequired: false,
    })
)

const server = new ApolloServer({
    schema,
    context: ({ req }) => {
        const user = req.user || 'hel'

        return { user }
    },
})

server.applyMiddleware({ app })

const port = process.env.PORT || 8000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen({ port }, () => {
    console.log(`server is running at ${port}`)
})
