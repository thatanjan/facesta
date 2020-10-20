import mongoose from 'mongoose'

import mongoURI from './config/keys'

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('mongoose connected')
  })
  .catch((error) => {
    console.log(error)
  })
