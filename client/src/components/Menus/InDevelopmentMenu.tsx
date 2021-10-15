import React, { useState, ReactNode } from 'react'
import Box from '@material-ui/core/Box'
import Menu from '@material-ui/core/Menu'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
	menuStyle: {
		overflow: 'visible',
		filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
		marginTop: 1.5,
		padding: '1rem',
		'&:before': {
			content: '""',
			display: 'block',
			position: 'absolute',
			top: 0,
			right: 14,
			width: 10,
			height: 10,
			background: theme.palette.background.paper,
			transform: 'translateY(-50%) rotate(45deg)',
			zIndex: 0,
		},
	},
}))

interface Props {
	ClickComponent: ReactNode
}

const InDevelopment = ({ ClickComponent }: Props) => {
	const { menuStyle } = useStyles()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<div>
			<Box onClick={handleClick}>{ClickComponent}</Box>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{ className: menuStyle, elevation: 0 }}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				This feature is in development.
			</Menu>
		</div>
	)
}

export default InDevelopment
