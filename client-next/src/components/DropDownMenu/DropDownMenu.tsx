import React, { useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import { nanoid } from 'nanoid'

import { AnyObject } from 'interfaces/global'

const DropDownMenu = ({ options, IconComponent, ...props }: AnyObject) => {
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
			<IconButton onClick={handleClick} {...props}>
				<IconComponent />
			</IconButton>

			<Menu
				id='fade-menu'
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}
			>
				{options.map(item => (
					<MenuItem
						key={nanoid()}
						component='li'
						onClick={handleClose}
						style={{ textTransform: 'capitalize' }}
					>
						{item}
					</MenuItem>
				))}
			</Menu>
		</>
	)
}

export default DropDownMenu
