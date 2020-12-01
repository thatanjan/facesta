import {
    GraphQLID,
    GraphQLInt,
    GraphQLSchema,
    GraphQLString,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
} from 'graphql'

const LoginType = new GraphQLObjectType({
    name: 'LoginType',
    fields: () => ({
        token: { type: GraphQLID },
        success: { type: GraphQLBoolean },
    }),
})

export default LoginType
