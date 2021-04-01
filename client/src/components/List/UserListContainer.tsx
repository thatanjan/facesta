import React, { ReactNode } from 'react'
import List from '@material-ui/core/List'
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
	},
}))

interface Props {
	children: ReactNode
}

const UserListContainer = ({ children }: Props) => {
	const { root } = useStyles()
	return <List className={root}>{children}</List>
}

export default UserListContainer
