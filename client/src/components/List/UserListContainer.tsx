import React, { ReactNode } from 'react'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		maxWidth: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		backgroundColor: theme.palette.background.paper,

		'& > a': {
			flexBasis: '100%',
		},

		'& > .infinite-scroll-component__outerdiv': {
			width: '100%',
		},
	},
}))

interface Props {
	children: ReactNode
	listSubheader?: string
}

const UserListContainer = ({ children, listSubheader }: Props) => {
	const { root } = useStyles()
	return (
		<List
			subheader={
				<ListSubheader component='div' id='nested-list-subheader'>
					{listSubheader || ''}
				</ListSubheader>
			}
			className={root}
		>
			{children}
		</List>
	)
}

export default UserListContainer
