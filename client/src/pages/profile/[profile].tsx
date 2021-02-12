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
import PageWrapper from 'components/PageWrapper/PageWrapper'
import PageLayoutComponent from 'components/Layout/PageLayoutComponent'
import ProfileCover from 'components/ImageComponent/ProfileCover'

const FollowButton = dynamic(() => import('components/Buttons/FollowButton'))

interface Props extends PropsWithUserData {}

const useStyles = makeStyles(({ spacing }) => ({
	buttonGridContainer: {
		margin: spacing(2, '0'),
	},
}))

const Content = () => {
	const { buttonGridContainer } = useStyles()
	const isSelf = true
	return (
		<>
			<ProfileCover name='Taylor swift' bio='singer' />

			<Grid container className={buttonGridContainer} justify='flex-end'>
				{/* <Grid item>{!isSelf && <FollowButton />}</Grid> */}
			</Grid>
		</>
	)
}

const Profile = ({ userData }: Props) => {
	return (
		<PageWrapper userData={userData}>
			<PageLayoutComponent Content={Content} />
		</PageWrapper>
	)
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query: { profile },
}) => {
	const token = getToken(req as Requset)

	const shouldRedirect = await shouldRedirectToAuth(token)

	if (shouldRedirect) return createRedirectObject(LOGIN_URL)

	const userData = decodeToken(req as Requset)

	const { id: ownUserId } = userData

	let isSelf: boolean = false

	if (profile === ownUserId) {
		isSelf = true
	}
	return { props: { isSelf, userData } }
}

export default Profile
