import mongoose from 'mongoose'
import express, { Request, Response } from 'express'

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

app.get('/', (req: Request, res: Response) => {
  res.send('hello world')
})

// starting express server
app.listen(port, () => {
  console.log(`server is running at ${port}`)
})
