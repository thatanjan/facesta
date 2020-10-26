import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import passport from 'passport'

// importing models
import Post from '../../models/Posts'
import Profile from '../../models/Profile'

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

// @route DELETE api/posts/:id
// @description  delete post by id
// @access private

router.delete(
    '/:post_id',
    passport.authenticate('jwt', { session: false }),
    (req: any, res) => {
        const errors = {
            not_authorized: 'User not not authorized',
            post_not_found: 'no post found',
        }

        Profile.findOne({ user: req.user.id }).then((profile: any) => {
            Post.findById(req.params.post_id)
                .then((post: any) => {
                    // check for post owner
                    if (post.user.toString() !== req.user.id) {
                        return res
                            .status(401)
                            .json({ msg: errors.not_authorized })
                    }

                    // delete a post
                    post.remove()
                        .then(() => {
                            res.json({ msg: 'post successfully deleted' })
                        })
                        .catch(() => {
                            res.status(404).json({ msg: errors.post_not_found })
                        })
                })
                .catch((err) => console.log(err))
        })
    }
)

// @route POST api/posts/like/:post_id
// @description  like a post by id
// @access private

router.post(
    '/like/:post_id',
    passport.authenticate('jwt', { session: false }),
    (req: any, res) => {
        const errors = {
            already_liked: 'user is already liked this post',
        }

        Profile.findOne({ user: req.user.id }).then((profile: any) => {
            Post.findById(req.params.post_id)
                .then((post: any) => {
                    if (
                        post.likes.filter(
                            (like: any) => like.user.toString() === req.user.id
                        ).length > 0
                    ) {
                        return res
                            .status(400)
                            .json({ msg: errors.already_liked })
                    }
                    console.log(post)
                    post.likes.push({ user: req.user.id })
                    post.save().then((post: any) => res.json(post))
                })
                .catch((err) => console.log(err))
        })
    }
)

export default router
