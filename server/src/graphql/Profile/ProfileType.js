import { gql } from 'apollo-server-express'

const ProfileMutationTypeDefs = gql`
    extend type Mutation {
        updatePersonal(Input: PersonalInput): Personal!
        updateEducation(Input: EducationInput): Education!
        addExperience(Input: ExperienceInput): Experience!
        addEducation(Input: EducationInput): Education!
    }
`

const InputTypedefs = gql`
    input ProfileIdInput {
        id: ID!
    }

    input PersonalInput {
        dateOfBirth: Date
        website: String
        status: String
        location: String
        skills: String
        bio: String
    }

    input ExperienceInput {
        title: String!
        company: String!
        from: Date
        to: Date
    }

    input EducationInput {
        school: String!
        degree: String!
        fieldOfStudy: String!
        from: Date!
        to: Date
    }

    input SocialInput {
        youtube: String
        twitter: String
        facebook: String
        linkedin: String
        instagram: String
    }
`

const ProfileTypedefs = gql`
    extend type Query {
        getPersonal(Input: ProfileIdInput): Personal!
        getExperience: [Experience!]
        getEducation: [Education!]
        getSocial: [Social!]
        getPrivacy: Privacy!
    }

    ${ProfileMutationTypeDefs}
    ${InputTypedefs}

    type Experience {
        title: String!
        company: String!
        from: Date
        to: Date
    }

    type Education {
        school: String!
        degree: String!
        fieldOfStudy: String!
        from: Date!
        to: Date
    }

    type Social {
        youtube: String
        twitter: String
        facebook: String
        linkedin: String
        instagram: String
    }

    type Privacy {
        Public: Boolean!
    }

    type Personal {
        dateOfBirth: Date
        website: String
        status: String
        location: String
        skills: String
        bio: String
    }
`

export default ProfileTypedefs
