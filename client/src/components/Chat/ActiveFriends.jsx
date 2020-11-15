import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { nanoid } from 'nanoid'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const ActiveFriends = () => {
	return (
		<>
			<List component='nav'>
				<ListItem>
					<ListItemIcon>
						<FiberManualRecordIcon style={{ color: 'teal' }} />
					</ListItemIcon>
					<ListItemText id='switch-list-label-bluetooth' primary='Active' />
					<ListItemSecondaryAction>
						<Switch
							edge='end'
							inputProps={{ 'aria-labelledby': 'switch-list-label-bluetooth' }}
						/>
					</ListItemSecondaryAction>
				</ListItem>

				<ListItem button key={nanoid()} component={RouterLink}>
					<ListItemIcon>
						<AccountCircleIcon />
					</ListItemIcon>
					<ListItemText primary='Taylor Swift' />
				</ListItem>

				<ListItem button key={nanoid()} component={RouterLink}>
					<ListItemIcon>
						<AccountCircleIcon />
					</ListItemIcon>
					<ListItemText primary='One Direction' />
				</ListItem>
			</List>
		</>
	)
}

export default ActiveFriends
