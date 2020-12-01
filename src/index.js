import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'

// importing routes
import user from 'routes/api/user_auth'
import posts from 'routes/api/posts'
import profiles from 'routes/api/profile'

// importing passport strategy
import { JWT_strategy } from 'config/passport'

// mongoose key
import mongoURI from 'config/keys'

// connect to mongoose
mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('mongoose connected')
    })
    .catch((error) => {
        console.log(error)
    })

// intialize express app
const app = express()

const port = process.env.PORT || 8000

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// passport config
app.use(passport.initialize())

JWT_strategy(passport)

// app routes
// app.use('/api/user', user)
// app.use('/api/posts', posts)
// app.use('/api/profile', profiles)

// starting express server
app.listen(port, () => {
    console.log(`server is running at ${port}`)
})
