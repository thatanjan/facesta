import React, { useState } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { nanoid } from 'nanoid'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

import { AnyObject } from 'interfaces/global'

interface Props {
	postID: string
}

const DropDownMenu = ({ postID }: Props) => {
	const [anchorEl, setAnchorEl] = useState(null)
	const open: boolean = Boolean(anchorEl)

	const handleClick = (event: AnyObject) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<>
			<IconButton onClick={handleClick}>
				<MoreHorizIcon />
			</IconButton>

			<Menu
				id='fade-menu'
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}
			>
				<MenuItem onClick={() => console.log(postID)}>
					<ListItemIcon>
						<DeleteForeverIcon />
					</ListItemIcon>
					<ListItemText primary='Delete Post' />
				</MenuItem>
			</Menu>
		</>
	)
}

export default DropDownMenu
