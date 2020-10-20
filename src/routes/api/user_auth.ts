import express, { Request, Response } from 'express'
import gravatar from 'gravatar'
import bcryptjs from 'bcryptjs'

import User from '../../models/User'

const router = express.Router()

// @route GET api/posts/test
// @description tests post route
// @access Public

router.get('/', (req: Request, res: Response) => {
  res.json({ msg: 'user_auth works' })
})

// @route GET api/posts/test
// @description register user
// @access Public

const create_new_user = (request: Request, response: Response) => {
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
  console.log(new_user_password, typeof new_user_password)

  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(new_user_password, salt, (err, hash) => {
      if (err) throw err
      new_user_password = hash
      new_user
        .save()
        .then((user: {}) => response.json(user))
        .catch((error: any) => console.log(error, 12))
    })
  })
}

router.post('/register', (req: Request, res: Response) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: 'email already exist' })
    } else {
      // create a new user
      create_new_user(req, res)
      // console.log(124)
      // create_new_user
    }
  })
})

export default router
