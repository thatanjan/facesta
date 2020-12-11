import { rule, shield } from 'graphql-shield'

const isAuthenticated = rule()((_, __, { user, error }) => {
    if (user) {
        return true
    }

    if (error) {
        return new Error(error)
    }
})

export default shield({
    Mutation: {
        createPost: isAuthenticated,
    },
})
