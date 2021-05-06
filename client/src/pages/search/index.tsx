import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Typography from '@material-ui/core/Typography'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { responseInterface } from 'swr'

import PageLayoutComponent from 'components/Layout/PageLayoutComponent'
import CircularLoader from 'components/Loaders/CircularLoader'
import SwrErrorAlert from 'components/Alerts/SwrErrorAlert'
import Alert from 'components/Alerts/Alert'

import Requset from 'interfaces/requsetResponse'
import shouldRedirectToAuth from 'utils/shouldRedirectToAuth'
import decodeToken from 'utils/decodeToken'
import getToken from 'utils/getToken'
import createRedirectObject from 'utils/createRedirectObject'
import { LOGIN_URL } from 'variables/global'
import { PageProps } from 'interfaces/global'
import { SearchedUser } from 'interfaces/user'

import useSearchUser from 'hooks/useSearchUser'
import useStoreID from 'redux/hooks/useStoreID'

const SearchForm = dynamic(() => import('components/Forms/SearchForm'), {
	loading: () => <CircularLoader />,
})

const ListContainer = dynamic(
	() => import('components/List/UserListContainer'),
	{ loading: () => <CircularLoader /> }
)

const UserList = dynamic(() => import('components/List/UserList'), {
	loading: () => <CircularLoader />,
})

const useStyles = makeStyles((theme: Theme) => ({
	headerStyle: {
		marginTop: theme.spacing(2),
		[theme.breakpoints.up('lg')]: {
			fontSize: '4rem',
		},
	},
}))

interface Props {
	query: string
}

const SearchResult = ({ query }: Props) => {
	const {
		data,
		error,
		isValidating,
	}: responseInterface<
		{ searchUser: { users: SearchedUser[] } },
		any
	> = useSearchUser(query)

	if (!data || isValidating) return <CircularLoader />
	if (error) return <SwrErrorAlert />

	const {
		searchUser: { users },
	} = data

	if (Array.isArray(users) && users.length === 0)
		return <Alert checked severity='info' message='No users found' />

	return (
		<ListContainer>
			<UserList {...{ users, searching: true }} />
		</ListContainer>
	)
}

const PageContent = () => {
	const { headerStyle } = useStyles()

	const {
		query: { query },
	} = useRouter()
	return (
		<>
			<Typography
				className={headerStyle}
				color='primary'
				variant='h1'
				align='center'
			>
				Search Users
			</Typography>
			<SearchForm />
			{query && <SearchResult query={query as string} />}
		</>
	)
}

const SearchPage = ({ id }: PageProps) => {
	useStoreID(id)
	return <PageLayoutComponent Content={PageContent} />
}

export default SearchPage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const token = getToken(req as Requset)

	const shouldRedirect = await shouldRedirectToAuth(token)

	if (shouldRedirect) return createRedirectObject(LOGIN_URL)

	const { id } = decodeToken(token)

	return { props: { id } }
}
