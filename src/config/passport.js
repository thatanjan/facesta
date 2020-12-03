import passportJwt from 'passport-jwt'
import mongoose from 'mongoose'

import { secretKey } from 'config/keys'

const Strategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt
const User = mongoose.model('user')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
}

export const JWT_strategy = (passport) => {
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
