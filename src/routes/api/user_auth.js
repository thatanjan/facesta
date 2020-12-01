import express, { Request, Response } from 'express'
import gravatar from 'gravatar'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import passport from 'passport'

import User from 'models/User'
import { secretKey } from 'config/keys'

// load input validation
import validate_register_input from 'validation/register'
import validate_login_input from 'validation/login'

const router = express.Router()

const logInUser = (user: any, res: Response) => {
    const payload: Payload = {
        id: user._id,
        name: user.name,
        avatar: user.avatar,
    }

    jwt.sign(payload, secretKey, { expiresIn: 3600 }, (err, token) => {
        if (err) {
            console.log(err)
        }
        console.log(token)
        res.json({
            success: true,
            token: 'Bearer ' + token,
        })
    })
}

// @route GET api/posts/test
// @description tests post route
// @access Public

router.get('/', (req: Request, res: Response) => {
    res.json({ msg: 'user_auth works' })
})

// @route GET api/posts/test
// @description register user
// @access Public

const create_new_user = (
    request: Request,
    response: Response,
    logInUser: Function
) => {
    const avatar = gravatar.url(request.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm',
    })

    const user_model_data = {
        name: request.body.name,
        email: request.body.email,
        avatar,
        password: request.body.password,
    }

    const new_user: any = new User(user_model_data)
    let new_user_password = new_user.password

    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(new_user_password, salt, (err, hash) => {
            if (err) throw err
            new_user_password = hash

            // making the new user password to the hashed password

            new_user.password = new_user_password
            console.log(new_user_password)
            new_user
                .save()
                .then((user: {}) => logInUser(user, response))
                .catch((error: any) => console.log(error, 12))
        })
    })
}

router.post('/register', (req: Request, res: Response) => {
    const { errors, isValid } = validate_register_input(req.body)

    // check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.status(400).json({ email: 'email already exist' })
        } else {
            // create a new user
            create_new_user(req, res, logInUser)

            // logInUser(user, res)

            // log in the new created user
        }
    })
})

// @route GET api/posts/test
// @description register user
// @access Public

// @route GET api/posts/test
// @description Login User / Returning JWT Token
// @access Public

router.post('/login', ({ body }: Request, res: Response) => {
    const { errors, isValid } = validate_login_input(body)

    // check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = body.email
    const password = body.password

    // console.log(email, password)
    // // find user by <email  />

    User.findOne({ email }).then((user: any) => {
        // if the user not found
        if (!user) {
            errors.email = 'user not found'
            return res.status(404).json(errors)
        }
        // check password is same or not

        bcryptjs
            .compare(password, user.password)
            .then((isMatch) => {
                console.log(isMatch)
                if (isMatch) {
                    // user matched
                    logInUser(user, res)
                } else {
                    errors.password = 'Password incorrect'
                    errors.password[0].toUpperCase()
                    return res.status(404).json(errors)
                }
            })
            .catch((err) => console.log(err))
    })
})

// @route GET api/users/current
// @description  return current user
// @access  Private

router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req: any, res: Response) => {
        res.json({
            id: req.user._id,
            name: req.user.name,
        })
    }
)

export default router
