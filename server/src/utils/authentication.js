import User from 'models/User'

export const findUser = email => User.findOne({ email })

export const findUserById = id => User.findById(id)
