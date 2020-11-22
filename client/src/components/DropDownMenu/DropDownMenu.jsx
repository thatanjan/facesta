import React, { useState, Suspense, lazy } from 'react'
import { NavLink as Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import { nanoid } from 'nanoid'

const DropDownMenu = ({ options, IconComponent, ...props }) => {
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleClick = event => {
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

			<Suspense fallback={<div children='hello' />}>
				<Menu
					id='fade-menu'
					anchorEl={anchorEl}
					keepMounted
					open={open}
					onClose={handleClose}
					TransitionComponent={Fade}
				>
					{options.map((item, index) => (
						<MenuItem
							key={nanoid()}
							component={Link}
							to='/shit'
							onClick={handleClose}
							style={{ textTransform: 'capitalize' }}
						>
							{item}
						</MenuItem>
					))}
				</Menu>
			</Suspense>
		</>
	)
}

export default DropDownMenu
