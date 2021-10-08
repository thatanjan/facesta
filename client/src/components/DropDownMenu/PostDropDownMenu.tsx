import React, { useState } from 'react'
import Menu from '@material-ui/core/Menu'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import { AnyObject } from 'interfaces/global'

import DeletePost from 'components/Post/DeletePost'

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
				<DeletePost postID={postID} />
			</Menu>
		</>
	)
}

export default DropDownMenu
