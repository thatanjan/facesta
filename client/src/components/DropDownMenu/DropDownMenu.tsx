import React, { useState } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import { nanoid } from 'nanoid'

import { AnyObject } from 'interfaces/global'

import { DropDownMenuOption } from 'components/AppBars/AppHeaderMenus'
import MuiLink from 'components/Links/MuiLink'

interface Props extends AnyObject {
	options: DropDownMenuOption[]
}

const DropDownMenu = ({ options, IconComponent, ...props }: Props) => {
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
				{options.map(({ name, path }: DropDownMenuOption) => (
					<MuiLink
						MuiComponent={MenuItem}
						key={nanoid()}
						component='li'
						href={path}
						onClick={handleClose}
						style={{ textTransform: 'capitalize' }}
					>
						{name}
					</MuiLink>
				))}
			</Menu>
		</>
	)
}

export default DropDownMenu
