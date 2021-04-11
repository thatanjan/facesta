import { NextSeo } from 'next-seo'
import React from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import { LOGIN_URL } from 'variables/global'

import PageWrapper from 'components/Layout/PageWrapper'
import PageLayoutComponent from 'components/Layout/PageLayoutComponent'
import ProfileCover from 'components/Profile/ProfileCover'
import ProfileTabMenu from 'components/TabMenus/ProfileTabMenu'
import CircularLoader from 'components/Loaders/CircularLoader'

import ProfileContextProvider, {
	State as ProfileContextInterface,
} from 'context/profileContext'

import { useIsSelf } from 'hooks/profileContextHooks'
import { useGetPersonalData } from 'hooks/useGetProfileData'

import getToken from 'utils/getToken'
import decodeToken from 'utils/decodeToken'
import shouldRedirectToAuth from 'utils/shouldRedirectToAuth'
import createRedirectObject from 'utils/createRedirectObject'

import Requset from 'interfaces/requsetResponse'
import { PageProps } from 'interfaces/global'

const FollowButton = dynamic(() => import('components/Buttons/FollowButton'), {
	loading: () => <CircularLoader />,
})

interface Props extends ProfileContextInterface, PageProps {}

const useStyles = makeStyles(({ spacing }) => ({
	buttonGridContainer: {
		margin: spacing(2, '0'),
	},
}))

const SwrErrorAlert = dynamic(() => import('components/Alerts/SwrErrorAlert'))

const Content = () => {
	const { buttonGridContainer } = useStyles()
	const isSelf = useIsSelf()
	return (
		<>
			<ProfileCover />

			{!isSelf && (
				<Grid container className={buttonGridContainer} justify='flex-end'>
					<Grid item>
						{' '}
						<FollowButton />
					</Grid>
				</Grid>
			)}

			<ProfileTabMenu />
		</>
	)
}

const Profile = ({ id, ...profileContextProps }: Props) => {
	const { data, error } = useGetPersonalData(profileContextProps.profileUserID)

	if (!data) return <CircularLoader />

	if (error) return <SwrErrorAlert />

	const {
		getPersonalData: { name },
	} = data

	return (
		<>
			<NextSeo title={name} />

			<PageWrapper id={id}>
				<ProfileContextProvider {...profileContextProps}>
					<PageLayoutComponent Content={Content} />
				</ProfileContextProvider>
			</PageWrapper>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query: { profile: profileUserID },
}) => {
	const token = getToken(req as Requset)

	const shouldRedirect = await shouldRedirectToAuth(token)

	if (shouldRedirect) return createRedirectObject(LOGIN_URL)

	const { id: ownUserID } = decodeToken(req as Requset)

	let isSelf: boolean = false

	if (profileUserID === ownUserID) {
		isSelf = true
	}

	return { props: { profileUserID, isSelf, id: ownUserID } }
}

export default Profile
