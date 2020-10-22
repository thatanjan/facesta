import passportJwt from 'passport-jwt'
import mongoose from 'mongoose'

import { Payload } from '../routes/api/user_auth'

import { secretKey } from './keys'

const Strategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt
const User = mongoose.model('user')

const options: any = {}

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = secretKey

export const JWT_strategy = (passport: any) => {
  console.log('ran')
  passport.use(
    new Strategy(options, (jwt_payload, done) => {
      // console.log(jwt_payload)
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        })
        .catch((err) => console.log(err))
    })
  )
}
