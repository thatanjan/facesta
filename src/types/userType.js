import {
    GraphQLID,
    GraphQLInt,
    GraphQLSchema,
    GraphQLString,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
} from 'graphql'

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        name: { type: GraphQLString },
        id: { type: GraphQLID },
    }),
})

export default UserType
