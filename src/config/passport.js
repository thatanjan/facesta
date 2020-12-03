import passportJwt from 'passport-jwt'
import mongoose from 'mongoose'

import { secretKey } from 'config/keys'
import { throwError } from 'utils/error'

const Strategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt
const User = mongoose.model('user')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
}

const createNewStrategy = () => {
    const strategy = new Strategy(options, async (jwt_payload, done) => {
        try {
            const user = User.findById(jwt_payload.id)

            if (user) {
                return done(null, user)
            }

            return done(null, false)
        } catch (error) {
            return throwError(error)
        }
    })

    return strategy
}

export const JWT_strategy = (passport) => {
    passport.use(createNewStrategy())
}
