import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'

import PageLayoutComponent from 'components/Layout/PageLayoutComponent'
import InDevelopmentMenu from 'components/Menus/InDevelopmentMenu'
import Requset from 'interfaces/requsetResponse'
import shouldRedirectToAuth from 'utils/shouldRedirectToAuth'
import decodeToken from 'utils/decodeToken'
import getToken from 'utils/getToken'
import createRedirectObject from 'utils/createRedirectObject'
import { LOGIN_URL, APP_NAME } from 'variables/global'
import { PageProps } from 'interfaces/global'

import useStoreID from 'redux/hooks/useStoreID'

const useStyles = makeStyles((theme: Theme) => ({
	buttonStyle: {
		background: theme.palette.error.main,
		color: 'white',
	},
	listItemStyle: {
		color: 'white',
		padding: '1rem',
	},
	listTextStyle: {
		maxWidth: '70%',
	},
	listIconStyle: {
		maxWidth: '30%',
	},
	titleStyle: { margin: '1rem 0' },
}))

const Content = () => {
	const {
		buttonStyle,
		listItemStyle,
		listIconStyle,
		listTextStyle,
		titleStyle,
	} = useStyles()
	return (
		<>
			<Typography align='center' variant='h3' className={titleStyle}>
				Settings
			</Typography>
			<List dense>
				<ListItem ContainerProps={{ className: listItemStyle }}>
					<ListItemText
						primary='Delete Account'
						secondary='If you delete your account, you will never be able to recover your account.'
						className={listTextStyle}
						primaryTypographyProps={{
							variant: 'body1',
						}}
					/>
					<ListItemSecondaryAction className={listIconStyle}>
						<InDevelopmentMenu
							ClickComponent={
								<Button
									variant='contained'
									startIcon={<DeleteIcon />}
									className={buttonStyle}
									size='small'
								>
									Delete
								</Button>
							}
						/>
					</ListItemSecondaryAction>
				</ListItem>
			</List>
		</>
	)
}

const SettingsPage = ({ id }: PageProps) => {
	useStoreID(id)
	const description = 'Settings for user Account'
	const url = 'http://con-fession.vercel.app/settings'
	return (
		<>
			<NextSeo
				title={`Settings | ${APP_NAME}`}
				description={description}
				canonical={url}
				openGraph={{
					type: 'website',
					title: APP_NAME,
					description,
					url,
					site_name: APP_NAME,
					images: [
						{
							url: '/banner.png',
							alt: description,
							height: 1080,
							width: 1920,
						},
					],
				}}
			/>
			<PageLayoutComponent Content={Content} />
		</>
	)
}

export default SettingsPage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const token = getToken(req as Requset)

	const shouldRedirect = await shouldRedirectToAuth(token)

	if (shouldRedirect) return createRedirectObject(LOGIN_URL)

	const { id } = decodeToken(token)

	return { props: { id } }
}
