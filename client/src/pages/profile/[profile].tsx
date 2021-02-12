import React from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import getToken from 'utils/getToken'
import decodeToken from 'utils/decodeToken'
import shouldRedirectToAuth from 'utils/shouldRedirectToAuth'
import createRedirectObject from 'utils/createRedirectObject'
import Requset from 'interfaces/requsetResponse'
import { LOGIN_URL } from 'variables/global'
import { PropsWithUserData } from 'interfaces/user'
import PageWrapper from 'components/Layout/PageWrapper'
import PageLayoutComponent from 'components/Layout/PageLayoutComponent'
import ProfileCover from 'components/ImageComponent/ProfileCover'
import ProfileContextProvider, {
	State as ProfileContextInterface,
} from 'context/profileContext'
import { useIsSelf } from 'hooks/profileContextHooks'

const FollowButton = dynamic(() => import('components/Buttons/FollowButton'))

interface Props extends PropsWithUserData, ProfileContextInterface {}

const useStyles = makeStyles(({ spacing }) => ({
	buttonGridContainer: {
		margin: spacing(2, '0'),
	},
}))

const Content = () => {
	const { buttonGridContainer } = useStyles()
	const isSelf = useIsSelf()
	return (
		<>
			<ProfileCover name='Taylor swift' bio='singer' />

			<Grid container className={buttonGridContainer} justify='flex-end'>
				<Grid item>{!isSelf && <FollowButton />}</Grid>
			</Grid>
		</>
	)
}

const Profile = ({ userData, ...profileContextProps }: Props) => {
	return (
		<PageWrapper userData={userData}>
			<ProfileContextProvider {...profileContextProps}>
				<PageLayoutComponent Content={Content} />
			</ProfileContextProvider>
		</PageWrapper>
	)
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query: { profile: profileUserId },
}) => {
	const token = getToken(req as Requset)

	const shouldRedirect = await shouldRedirectToAuth(token)

	if (shouldRedirect) return createRedirectObject(LOGIN_URL)

	const userData = decodeToken(req as Requset)

	const { id: ownUserId } = userData

	let isSelf: boolean = false

	if (profileUserId === ownUserId) {
		isSelf = true
	}

	return { props: { profileUserId, isSelf, userData } }
}

export default Profile
