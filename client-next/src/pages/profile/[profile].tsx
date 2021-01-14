import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import PageLayoutComponent from 'HOC/PageLayoutComponent'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import jwtDecode from 'jwt-decode'

import ProfileContextProvider from 'context/profileContext'
import FollowButton from 'components/Buttons/FollowButton'
import createRequest from 'utils/createRequest'
import { AnyObject } from 'interfaces/global'
import { getPersonalData } from 'graphql/queries/profileQueries'
import useGetPersonal from 'hooks/useGetPersonal'

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

	// console.log(props)

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

interface Props {
	userId: string
	data: AnyObject
	isSelf: boolean
}

const UserProfilePage = ({ userId, data, isSelf }: Props) => {
	console.log(isSelf)
	const swrOptions = { initialData: data }

	let { data: Data } = useGetPersonal({ userId, swrOptions })
	console.log(Data)

	const { getPersonal } = Data

	if (getPersonal) {
		Data = getPersonal
	}

	return (
		<>
			<ProfileContextProvider>
				<PageLayoutComponent Content={() => <Content {...Data} />} />
			</ProfileContextProvider>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({
	req: {
		cookies: { jwt },
	},
	query: { profile },
}: any) => {
	const { id: userId }: any = jwtDecode(jwt)

	let isSelf: boolean = false

	if (profile === userId) {
		isSelf = true
	}

	const mutation: string = getPersonalData('name bio')

	const personalData = await createRequest({ mutation, values: { userId } }, jwt)

	console.log(profile)
	return {
		props: { userId, data: personalData?.getPersonal, isSelf },
	}
}

export default UserProfilePage
