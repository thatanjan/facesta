import { gql } from 'apollo-server-express'

import { UserTypeDefs } from 'graphql/User/User'
import { PostTypedefs } from 'graphql/Post/Post'
import { ProfileTypedefs } from 'graphql/Profile/Profile'
import { DateTypeDefs } from 'graphql/customScalars'
import { FollowTypedefs } from 'graphql/Follow/Follow'
import { SearchTypeDefs } from 'graphql/Search/Search'
import commonTypeDefs from 'graphql/commonTypeDefs'

const Query = gql`
	type Query {
		_empty: String
	}
`

const Mutation = gql`
	type Mutation {
		_empty: String
	}
`

const typeDefs = [
	Query,
	Mutation,
	DateTypeDefs,
	commonTypeDefs,
	...UserTypeDefs,
	...PostTypedefs,
	...ProfileTypedefs,
	...FollowTypedefs,
	...SearchTypeDefs,
]

export default typeDefs
