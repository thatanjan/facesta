import mongoose from 'mongoose'

import mongoURI from './config/keys'

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('connected')
  })
  .catch((error) => {
    console.log(error)
  })
