import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { nanoid } from 'nanoid'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		maxWidth: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		backgroundColor: theme.palette.background.paper,

		'& > a': {
			[theme.breakpoints.down('xs')]: {
				flexBasis: '100%',
			},
			flexBasis: '50%',
		},
	},
}))

export const FollowComponent = ({ data }: any) => {
	const { root } = useStyles()
	return (
		<>
			<List className={root}>
				{data.map(({ name, avatar, details }: any) => (
					<ListItem component='li' button key={nanoid()}>
						<ListItemAvatar>
							<Avatar src={avatar} />
						</ListItemAvatar>

						<ListItemText primary={name} secondary={details} />
					</ListItem>
				))}
			</List>
		</>
	)
}

export default FollowComponent
