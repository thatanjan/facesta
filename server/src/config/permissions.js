import { rule, shield } from 'graphql-shield'

const isAuthenticated = rule()((_, __, { user, error }) => {
    if (user) {
        return true
    }

    if (error) {
        return new Error(error)
    }
})

export default shield(
    {
        Mutation: {
            createPost: isAuthenticated,
            deletePost: isAuthenticated,
            updatePersonal: isAuthenticated,
            addExperience: isAuthenticated,
            addEducation: isAuthenticated,
            updateSocial: isAuthenticated,
            updatePrivacy: isAuthenticated,
            followUser: isAuthenticated,
            unfollowUser: isAuthenticated,
            likePost: isAuthenticated,
            removeLikePost: isAuthenticated,
            commentPost: isAuthenticated,
            removeCommentPost: isAuthenticated,
        },
        Query: {
            getSinglePost: isAuthenticated,
            getAllPost: isAuthenticated,
            getPersonal: isAuthenticated,
            getExperience: isAuthenticated,
            getEducation: isAuthenticated,
            getSocial: isAuthenticated,
            getPrivacy: isAuthenticated,
            getFollowers: isAuthenticated,
            getFollowing: isAuthenticated,
            getIsFollowing: isAuthenticated,
            getIsFollower: isAuthenticated,
        },
    },
    {
        allowExternalErrors: true,
    }
)
