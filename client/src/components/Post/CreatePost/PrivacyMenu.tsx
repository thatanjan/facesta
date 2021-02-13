import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import { makeStyles } from '@material-ui/core/styles'
import FaceIcon from '@material-ui/icons/Face'

import { AnyObject } from 'interfaces/global'

const useStyles = makeStyles((theme: any) => ({
	menuContainerStyle: {
		marginTop: theme.spacing(2),
	},
	privacyName: {
		marginLeft: theme.spacing(1),
	},
}))

const PrivacyMenu = () => {
	const [selectedOption, setSelectedOption] = useState('Privacy')

	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleClick = (event: AnyObject) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = ({ target }: AnyObject) => {
		if (target.firstChild) {
			setSelectedOption(target.firstChild.data)
		}

		setAnchorEl(null)
	}

	const { menuContainerStyle, privacyName } = useStyles()

	return (
		<div className={menuContainerStyle}>
			<Button aria-controls='fade-menu' aria-haspopup='true' onClick={handleClick}>
				<FaceIcon /> <span className={privacyName}> {selectedOption}</span>
			</Button>
			<Menu
				id='fade-menu'
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}
			>
				<MenuItem onClick={handleClose}>Public</MenuItem>
				<MenuItem onClick={handleClose}>Friends</MenuItem>
				<MenuItem onClick={handleClose}>Only Me</MenuItem>
			</Menu>
		</div>
	)
}

export default PrivacyMenu
