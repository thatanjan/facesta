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

import loginUser from 'mutations/loginUser'
import registerUser from 'mutations/registerUser'

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
        loginUser,
        registerUser,
    },
})

export default new GraphQLSchema({ query: RootQuery, mutation: Mutation })
