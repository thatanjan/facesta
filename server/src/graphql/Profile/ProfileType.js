import { gql } from 'apollo-server-express'

const ProfileMutationTypeDefs = gql`
    extend type Mutation {
        updatePersonal(Input: PersonalInput): Personal!
        updateSocial(Input: SocialInput): Social!
        updateEducation(Input: EducationInput): Education!
        addExperience(Input: ExperienceInput): Experience!
        addEducation(Input: EducationInput): Education!
        updateExperience(Input: ExperienceInput): Experience
    }
`

const InputTypedefs = gql`
    input ProfileIdInput {
        id: ID!
    }

    input PersonalInput {
        id: ID!
        dateOfBirth: Date
        website: String
        status: String
        location: String
        skills: [String!]
        bio: String
    }

    input ExperienceInput {
        id: ID!
        title: String!
        company: String!
        from: Date
        to: Date
    }

    input EducationInput {
        id: ID!
        school: String!
        degree: String!
        fieldOfStudy: String!
        from: Date
        to: Date
    }

    input SocialInput {
        id: ID!
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
        id: ID!
        title: String!
        company: String!
        from: Date
        to: Date
    }

    type Education {
        id: ID!
        school: String!
        degree: String!
        fieldOfStudy: String!
        from: Date
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
        skills: [String!]
        bio: String
    }
`

export default ProfileTypedefs
