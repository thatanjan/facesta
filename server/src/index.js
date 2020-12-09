import mongoose from 'mongoose'
import express from 'express'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import jwt from 'express-jwt'
import bodyParser from 'body-parser'

import mongoURI, { secretKey } from 'config/keys'

import typeDefs from 'graphql/typedefs'
import resolvers from 'graphql/resolvers'

mongoose
    .connect(mongoURI)
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
        secret: secretKey,
        algorithms: ['HS256'],
        credentialsRequired: false,
    })
)

const server = new ApolloServer({
    schema,
    context: (request) => {
        const user = request.user || 'hel'

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
