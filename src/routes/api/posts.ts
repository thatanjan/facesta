import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import passport from 'passport'

import Post from '../../models/Posts'

// validation
import validate_post_input from '../../validation/post'

const router = express.Router()

// @route GET api/profile/test
// @description tests posts route
// @access private

// router.get('/', (req: Request, res: Response) => {
//     res.json({ msg: 'posts works' })
// })

// @route GET api/posts
// @description  get post
// @access public

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req: any, res: Response) => {
        const errors = {
            msg: 'no post found',
        }

        Post.find()
            .sort({ date: -1 })
            .then((posts) => res.json(posts))
            .catch(() => res.status(404).json(errors))
    }
)

// @route GET api/posts/:id
// @description  get post by id
// @access public

router.get(
    '/:post_id',
    passport.authenticate('jwt', { session: false }),

    (req: Request, res: Response) => {
        const errors = {
            msg: 'no post found',
        }

        Post.findById(req.params.post_id)
            .then((post) => res.json(post))
            .catch(() => res.status(404).json(errors))
    }
)

// @route POST api/posts
// @description  create post
// @access private

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req: any, res: Response) => {
        const { errors, isValid } = validate_post_input(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        const new_post = new Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id,
        })

        new_post.save().then((post: object) => res.json(post))
    }
)

export default router
