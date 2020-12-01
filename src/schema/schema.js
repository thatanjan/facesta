import jwt from 'jsonwebtoken'
import {
    GraphQLID,
    GraphQLInt,
    GraphQLSchema,
    GraphQLString,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql'

import UserType from 'types/userType'
import LoginType from 'types/loginType'

const makeGraphQLNonNull = (type) => new GraphQLNonNull(type)

const logInUser = (user, res) => {
    const payload = {
        id: user._id,
        name: user.name,
        avatar: user.avatar,
    }

    jwt.sign(payload, secretKey, { expiresIn: 3600 }, (err, token) => {
        if (err) {
            console.log(err)
        }
        res.json({
            success: true,
            token: 'Bearer ' + token,
        })
    })
}

// const findUser = () =>

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {},
            resolve: (parent, args) => {
                console.log(parent)
            },
        },
    },
})

const Mutation = new GraphQLObjectType({
    name: 'MutationType',
    fields: {
        login: {
            type: LoginType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve: (parent, args, context, info) => {
                // loginUser()
                // console.log([parent, args, context, info])
                // console.log(context.res)
                console.log(info)
            },
        },
    },
})

export default new GraphQLSchema({ query: RootQuery, mutation: Mutation })
