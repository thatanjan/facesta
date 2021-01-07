import { gql } from 'apollo-server-express'

const ProfileMutationTypeDefs = gql`
    extend type Mutation {
        updatePersonal(Input: PersonalInput): Personal!
        updateSocial(Input: SocialInput): Social!
        updateEducation(Input: EducationInput): Education!
        addExperience(Input: ExperienceInput): Experience!
        addEducation(Input: EducationInput): Education!
        updateExperience(Input: ExperienceInput): Experience!
        updatePrivacy(Input: PrivacyInput): Privacy!
    }
`

const InputTypedefs = gql`
    input ProfileIdInput {
        userId: ID!
    }

    input PersonalInput {
        dateOfBirth: Date
        website: String
        status: String
        location: String
        skills: [String!]
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
        from: Date
        to: Date
    }

    input SocialInput {
        youtube: String
        twitter: String
        facebook: String
        linkedin: String
        instagram: String
    }

    input PrivacyInput {
        public: Boolean!
    }
`

const ProfileTypedefs = gql`
    extend type Query {
        getPersonal(Input: ProfileIdInput): Personal!
        getExperience(Input: ProfileIdInput): [Experience!]!
        getEducation(Input: ProfileIdInput): [Education!]!
        getSocial(Input: ProfileIdInput): [Social!]!
        getPrivacy(Input: ProfileIdInput): Privacy!
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
        youtube: String!
        twitter: String!
        facebook: String!
        linkedin: String!
        instagram: String!
    }

    type Privacy {
        public: Boolean!
    }

    type Personal {
        dateOfBirth: Date!
        website: String!
        status: String!
        location: String!
        skills: [String!]!
        bio: String!
    }
`

export default ProfileTypedefs
