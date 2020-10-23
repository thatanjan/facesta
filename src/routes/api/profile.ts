import express, { Request, Response } from 'express'

import mongoose, { SchemaDefinition } from 'mongoose'
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

// @route POST api/profile
//  @description create or update user profile
// @access private

const profile_fields_arr: string[] = [
    'user',
    'handle',
    'company',
    'website',
    'location',
    'status',
    'skills',
    'bio',
    'github_user_name',
    'experience',
    'education',
    'social',
    'date',
]

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req: any, res: Response) => {
        const errors: any = {}
        const profile_fields: any = {}

        profile_fields.user = req.user.id

        // if (req.body[property as keyof SchemaDefinition])
        for (const property of profile_fields_arr) {
            // skills -split into array
            if (property === 'skills') {
                if (
                    req.body[property as keyof SchemaDefinition] !== undefined
                ) {
                    profile_fields[
                        property as keyof SchemaDefinition
                    ] = req.body[property as keyof SchemaDefinition].split(',')
                }
            } else if (property === 'social') {
                profile_fields[property as keyof SchemaDefinition] = {}

                const socials: string[] = [
                    'youtube',
                    'twitter',
                    'facebook',
                    'linkedin',
                    'instagram',
                ]

                socials.map((item) => {
                    if (req.body[item]) {
                        profile_fields[property as keyof SchemaDefinition][
                            item
                        ] = req.body[item]
                    }
                })
            } else if (req.body[property as keyof SchemaDefinition]) {
                profile_fields[property as keyof SchemaDefinition] =
                    req.body[property as keyof SchemaDefinition]
            }
        }
        Profile.findOne({ user: req.user.id }).then((profile) => {
            if (profile) {
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profile_fields },
                    { new: true }
                ).then((profile) => res.json(profile))
            } else {
                Profile.findOne({ handle: profile_fields.handle }).then(
                    (profile) => {
                        if (profile) {
                            errors.handle = 'That handle already exist'
                            res.status(400).json(errors)
                        }
                        new Profile(profile_fields)
                            .save()
                            .then((profile) => res.json(profile))
                    }
                )
            }
        })
    }
)

export default router
