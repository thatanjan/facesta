import mongoose from 'mongoose'
import express, { Request, Response } from 'express'

// importing routes
import user from './routes/api/user_auth'
import posts from './routes/api/posts'
import profiles from './routes/api/profile'

// mongoose key
import mongoURI from './config/keys'

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

app.use('/api/user', user)
app.use('/api/posts', posts)
app.use('/api/profiles', profiles)

app.get('/', (req: Request, res: Response) => {
  res.send('hello world')
})

// starting express server
app.listen(port, () => {
  console.log(`server is running at ${port}`)
})
