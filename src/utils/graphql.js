import { GraphQLNonNull } from 'graphql'

export const makeGraphQLNonNull = (type) => new GraphQLNonNull(type)
