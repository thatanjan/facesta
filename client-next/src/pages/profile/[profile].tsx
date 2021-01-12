import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import PageLayoutComponent from 'HOC/PageLayoutComponent'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import jwtDecode from 'jwt-decode'

import FollowButton from 'components/Buttons/FollowButton'

import createRequest from 'utils/createRequest'

import { AnyObject } from 'interfaces/global'

import { getPersonalData } from 'graphql/queries/profileQueries'

const useStyles = makeStyles(({ spacing }) => ({
	buttonGridContainer: {
		margin: spacing(2, '0'),
	},
}))

const ProfileCover = dynamic(
	() => import('components/ImageComponent/ProfileCover')
)

const ProfileTabMenu = dynamic(
	() => import('components/ProfileTabMenu/ProfileTabMenu')
)

const EditButton = dynamic(() => import('components/Buttons/EditButton'))

interface ContentProps {
	name: string
	bio: string
}

const Content = (props: ContentProps) => {
	const [owner, setOwner] = useState(true)
	const { buttonGridContainer } = useStyles()

	return (
		<>
			<ProfileCover {...props} />

			<Grid container className={buttonGridContainer} justify='flex-end'>
				<Grid item>{owner ? <EditButton /> : <FollowButton />}</Grid>
			</Grid>

			<ProfileTabMenu />
		</>
	)
}

const UserProfilePage = ({ data }: AnyObject) => {
	return (
		<>
			<PageLayoutComponent Content={() => <Content {...data} />} />
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({
	req: {
		cookies: { jwt },
	},
}: any) => {
	const { id: userId }: any = jwtDecode(jwt)

	const mutation: string = getPersonalData('name bio')

	const personalData = await createRequest({ mutation, values: { userId } }, jwt)

	return {
		props: { jwt, data: personalData?.getPersonal },
	}
}

export default UserProfilePage
