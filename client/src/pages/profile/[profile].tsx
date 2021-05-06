import { NextSeo } from 'next-seo'
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import { LOGIN_URL } from 'variables/global'

import PageLayoutComponent from 'components/Layout/PageLayoutComponent'
import ProfileCover from 'components/Profile/ProfileCover'
import ProfileTabMenu from 'components/TabMenus/ProfileTabMenu'
import CircularLoader from 'components/Loaders/CircularLoader'
import PreLoader from 'components/Loaders/PreLoader'

import { useGetPersonalData } from 'hooks/useGetProfileData'

import useStoreID from 'redux/hooks/useStoreID'
import { useAppDispatch, useAppSelector } from 'redux/hooks/hooks'
import { addProfileUser, removeProfileUser } from 'redux/slices/profileSlice'

import getToken from 'utils/getToken'
import decodeToken from 'utils/decodeToken'
import shouldRedirectToAuth from 'utils/shouldRedirectToAuth'
import createRedirectObject from 'utils/createRedirectObject'

import Requset from 'interfaces/requsetResponse'

const FollowButton = dynamic(() => import('components/Buttons/FollowButton'), {
	loading: () => <CircularLoader />,
})

const useStyles = makeStyles(({ spacing }) => ({
	buttonGridContainer: {
		margin: spacing(2, '0'),
	},
}))

const SwrErrorAlert = dynamic(() => import('components/Alerts/SwrErrorAlert'))

const Content = () => {
	const { buttonGridContainer } = useStyles()
	const { isSelf } = useAppSelector(state => state.profile)
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

interface Props {
	id: string
	profileUserID: string
	isSelf: boolean
}

const Profile = ({ id, profileUserID, isSelf }: Props) => {
	useStoreID(id)
	const { data, error } = useGetPersonalData(profileUserID)
	const dispatch = useAppDispatch()

	dispatch(addProfileUser({ profileUserID, isSelf }))

	useEffect(() => {
		return () => {
			dispatch(removeProfileUser())
		}
	}, [])

	if (!data) return <PreLoader />

	if (error) return <SwrErrorAlert />

	const {
		getPersonalData: { name },
	} = data

	return (
		<>
			<NextSeo title={name} />

			<PageLayoutComponent Content={Content} />
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
