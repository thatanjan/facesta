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

// @route POST api/posts/unlike/:post_id
// @description remove like a post by id
// @access private

router.delete(
    '/unlike/:post_id',
    passport.authenticate('jwt', { session: false }),
    (req: any, res) => {
        const errors = {
            not_liked: 'user has not liked this post',
        }

        Profile.findOne({ user: req.user.id }).then((profile: any) => {
            Post.findById(req.params.post_id)
                .then((post: any) => {
                    if (
                        post.likes.filter(
                            (like: any) => like.user.toString() === req.user.id
                        ).length === 0
                    ) {
                        return res.status(400).json({ msg: errors.not_liked })
                    }

                    // get remove index
                    const remove_index = post.likes
                        .map((item: any) => item.user.toString())
                        .indexOf(req.user.id)

                    // splice out of array
                    post.likes.splice(remove_index, 1)

                    // save
                    post.save().then((post: any) => res.json(post))
                })
                .catch((err) => console.log(err))
        })
    }
)

// @route POST api/posts/comment/:post_id
// @description  comment a post by id
// @access private

router.post(
    '/comment/:post_id',
    passport.authenticate('jwt', { session: false }),
    (req: any, res) => {
        // comment validation
        const { errors, isValid } = validate_post_input(req.body)

        if (!isValid) {
            return res.status(400).json(errors)
        }

        const error = {
            no_post: 'no post found',
        }

        Post.findById(req.params.post_id)
            .then((post: any) => {
                const new_comment = {
                    text: req.body.text,
                    name: req.body.name,
                    avatar: req.body.avatar,
                    user: req.user.id,
                }

                // add to comments
                post.comments.push(new_comment)

                //save
                post.save().then((post: any) => res.json(post))
            })
            .catch(() => res.status(404).json({ msg: error.no_post }))
    }
)

// @route POST api/posts/comment/:post_id/:comment_id
// @description  delte a comment from a post by id
// @access private

router.delete(
    '/delete_comment/:post_id/:comment_id',
    passport.authenticate('jwt', { session: false }),
    (req: any, res) => {
        Post.findById(req.params.post_id).then((post: any) => {
            const error = {
                no_comment: 'no comment found',
            }

            // check if comment exist
            if (
                post.comments.filter(
                    (comment: any) =>
                        comment._id.toString() === req.params.comment_id
                ).length === 0
            ) {
                return res.status(404).json({ msg: error.no_comment })
            }

            // getting the remove index
            const remove_index = post.comments
                .map((item: any) => item._id.toString())
                .indexOf(req.params.comment_id)

            // splice out of array
            post.comments.splice(remove_index, 1)

            // save
            post.save().then((post: any) => res.json(post))
        })
    }
)

export default router
