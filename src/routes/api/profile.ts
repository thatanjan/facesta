import express, { Request, Response } from 'express'

import mongoose from 'mongoose'
import passport from 'passport'

const router = express.Router()

import Profile from '../../models/Profile'
import User from '../../models/User'

// @route GET api/profile/test
// @description tests profile route
// @access private

// router.get('/', (req: Request, res: Response) => {
//     res.json({ msg: 'profiles works' })
// })

// @route GET api/profile
//  @description get current user profile
// @access private

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req: any, res: Response) => {
        const errors: any = {}
        Profile.findOne({ user: req.user.id })
            .then((profile) => {
                if (!profile) {
                    errors.no_profile = 'There is no profile for theis user'
                    return res.status(404).json(errors)
                }
                res.json(profile)
            })
            .catch((err) => res.json(err))
    }
)

export default router
