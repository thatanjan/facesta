import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'
import { graphqlHTTP } from 'express-graphql'

import schema from 'schema/schema'
import { JWT_strategy } from 'config/passport.js'

import mongoURI from 'config/keys'

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('mongoose connected')
    })
    .catch((error) => {
        console.log(error)
    })

const app = express()

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    })
)

const port = process.env.PORT || 8000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize())

JWT_strategy(passport)

app.listen(port, () => {
    console.log(`server is running at ${port}`)
})
