import React from 'react'
import CardMedia from '@material-ui/core/CardMedia'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles, Theme } from '@material-ui/core/styles'
import useGetPersonalData from 'hooks/useGetPersonalProfile'

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		maxWidth: '100%',
		position: 'relative',
		marginTop: theme.typography.pxToRem(20),
	},
	media: {
		height: 0,
		paddingTop: '56.25%',
		position: 'relative',
		marginBottom: '5%',
		boxShadow: 'none',
	},
	editIconStyle: { marginLeft: '100%', transform: 'translate(-100%, -100%)' },
}))

const imagelink =
	'https://www.1a-webradio.de/sites/default/files/BildNebenText/taylor-swift-press-photo-2016-billboard-1548.jpg'

export const ProfileCover = () => {
	const { container, media, editIconStyle } = useStyles()
	const { data, error } = useGetPersonalData('name bio')

	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	const {
		getPersonalData: { name, bio },
	} = data

	return (
		<>
			<Paper elevation={0}>
				<Card className={container}>
					<CardMedia className={media} image={imagelink}>
						<IconButton className={editIconStyle}>
							{' '}
							<EditIcon />{' '}
						</IconButton>
					</CardMedia>

					<Typography variant='h3' align='center'>
						{name}
					</Typography>
					<Grid container>
						<Grid container item justify='center'>
							{bio ? (
								<Typography variant='h5'>{bio}</Typography>
							) : (
								<Button>Add Bio </Button>
							)}
						</Grid>
					</Grid>
					<Divider />
				</Card>
			</Paper>
		</>
	)
}

export default ProfileCover
