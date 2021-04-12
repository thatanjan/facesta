import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import Typography from '@material-ui/core/Typography'
import { Theme, makeStyles } from '@material-ui/core/styles'

import PageWrapper from 'components/Layout/PageWrapper'
import PageLayoutComponent from 'components/Layout/PageLayoutComponent'
import CircularLoader from 'components/Loaders/CircularLoader'

import Requset from 'interfaces/requsetResponse'
import shouldRedirectToAuth from 'utils/shouldRedirectToAuth'
import decodeToken from 'utils/decodeToken'
import getToken from 'utils/getToken'
import createRedirectObject from 'utils/createRedirectObject'
import { LOGIN_URL } from 'variables/global'
import { PageProps } from 'interfaces/global'

const SearchForm = dynamic(() => import('components/Forms/SearchForm'), {
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

const PageContent = () => {
	const { headerStyle } = useStyles()

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
		</>
	)
}

const SearchPage = ({ id }: PageProps) => {
	return (
		<PageWrapper id={id}>
			<PageLayoutComponent Content={PageContent} />
		</PageWrapper>
	)
}

export default SearchPage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const token = getToken(req as Requset)

	const shouldRedirect = await shouldRedirectToAuth(token)

	if (shouldRedirect) return createRedirectObject(LOGIN_URL)

	const { id } = decodeToken(token)

	return { props: { id } }
}
