import mongoose from 'mongoose'
import express from 'express'
import jwt from 'express-jwt'
import bodyParser from 'body-parser'
import passport from 'passport'
import { graphqlHTTP } from 'express-graphql'

import schema from 'schema/schema'
import { JWT_strategy } from 'config/passport.js'

import mongoURI, { secretKey } from 'config/keys'

const { printSchema } = require('graphql')

console.log(printSchema(schema))

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('mongoose connected')
    })
    .catch((error) => {
        console.log(error)
    })

const app = express()

const port = process.env.PORT || 8000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(
    '/graphql',
    jwt({
        secret: secretKey,
        algorithms: ['HS256'],
        credentialsRequired: false,
    }),
    (req, res, next) =>
        graphqlHTTP({
            schema,
            graphiql: true,
            context: { user: req.user || 'con' },
        })(req, res, next)
)

app.listen(port, () => {
    console.log(`server is running at ${port}`)
})
