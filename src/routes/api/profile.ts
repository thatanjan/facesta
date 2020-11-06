import express, { Request, Response } from 'express'

import mongoose, { SchemaDefinition } from 'mongoose'
import passport from 'passport'

const router = express.Router()

import Profile from 'models/Profile'
import User from 'models/User'

import validate_profile_input from 'validation/profile'
import validate_experience_input from 'validation/experience'
import validate_education_input from 'validation/education'

export const socials: string[] = [
    'youtube',
    'twitter',
    'facebook',
    'linkedin',
    'instagram',
]

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
            .populate('user', ['name', 'avatar'])
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

// @route GET api/profile/all
//  @description get all profile
// @access public

router.get('/all', (req: Request, res: Response) => {
    const errors = { no_profile: '' }
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then((profiles) => {
            if (!profiles) {
                errors.no_profile = 'There are no profile'
                return res.status(404).json(errors)
            }
            res.json(profiles)
        })
        .catch(() =>
            res
                .status(404)
                .json({ profile: 'There is no profile for this user' })
        )
})

// @route GET api/profile/handle/:handle
//  @description get profile by handle
// @access public

router.get('/handle/:handle', (req: Request, res: Response) => {
    const errors = {
        no_profile: '',
    }
    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then((profile) => {
            if (!profile) {
                errors.no_profile = 'There is no profile'
                res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch((error) => res.status(404).json(error))
})

// @route POST api/profile
//  @description create or update user profile
// @access private
//
// @route GET api/profile/user/:user_id
//  @description get profile by user ID
// @access public

router.get('/user/:user_id', (req: Request, res: Response) => {
    const errors = {
        no_profile: '',
    }
    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then((profile) => {
            if (!profile) {
                errors.no_profile = 'There is no profile'
                res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch((error) =>
            res
                .status(404)
                .json({ profile: 'There is no profile for this user' })
        )
})

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

// @route POST api/profile
//  @description create or update user profile
// @access private

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req: any, res: Response) => {
        const { errors, isValid } = validate_profile_input(req.body)

        if (!isValid) {
            res.status(400).json(errors)
        }

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

// @route POST  api/profile/experience
// @description  Add experience to profile
// @access private

router.post(
    '/experience',
    passport.authenticate('jwt', { session: false }),
    (req: any, res: Response) => {
        const { errors, isValid } = validate_experience_input(req.body)

        // check validation
        if (!isValid) {
            return res.status(400).json(errors)
        }

        Profile.findOne({ user: req.user.id }).then((profile: any) => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.req,
                current: req.body.current,
                description: req.body.description,
            }

            // add to experience array
            profile.experience.unshift(newExp)
            profile.save().then((profile: object) => res.json(profile))
        })
    }
)

// @route POST  api/profile/education
// @description  Add education to profile
// @access private

router.post(
    '/education',
    passport.authenticate('jwt', { session: false }),
    (req: any, res: Response) => {
        const { errors, isValid } = validate_education_input(req.body)

        // check validation
        if (!isValid) {
            return res.status(400).json(errors)
        }

        Profile.findOne({ user: req.user.id }).then((profile: any) => {
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldOfStudy: req.body.fieldOfStudy,
                from: req.body.from,
                to: req.body.req,
                current: req.body.current,
                description: req.body.description,
            }

            // add to experience array
            profile.education.unshift(newEdu)
            profile.save().then((profile: object) => res.json(profile))
        })
    }
)

// @route DELETE api/profile/experience/:exp_id
// @description  delete experience to profile
// @access private

router.delete(
    '/experience/:exp_id',
    passport.authenticate('jwt', { session: false }),
    (req: any, res: Response) => {
        Profile.findOne({ user: req.user.id }).then((profile: any) => {
            // get remove index
            const remove_index = profile.experience
                .map((item: any) => item.id)
                .indexOf(req.params.exp_id)

            // profile.experience.splice (remov)
            profile.experience.splice(remove_index, 1)

            //save
            profile.save().then((profile: object) => res.json(profile))
        })
    }
)

// @route DELETE api/profile/education/:edu_id
// @description  delete education to profile
// @access private

router.delete(
    '/education/:edu_id',
    passport.authenticate('jwt', { session: false }),
    (req: any, res: Response) => {
        Profile.findOne({ user: req.user.id }).then((profile: any) => {
            // get remove index
            const remove_index = profile.education
                .map((item: any) => item.id)
                .indexOf(req.params.exp_id)

            profile.education.splice(remove_index, 1)

            //save
            profile.save().then((profile: object) => res.json(profile))
        })
    }
)

// @route DELETE api/profile/
// @description  delete profile
// @access private

router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req: any, res: Response) => {
        Profile.findOneAndRemove({ user: req.user.id }).then(() => {
            User.findOneAndRemove({ _id: req.user.id }).then(() => {
                res.json({ msg: 'successfully deleted' })
            })
        })
    }
)
export default router
