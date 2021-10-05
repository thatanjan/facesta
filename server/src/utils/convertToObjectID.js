import mongoose from 'mongoose'

const convert = string => mongoose.Types.ObjectId(string)

export default convert
