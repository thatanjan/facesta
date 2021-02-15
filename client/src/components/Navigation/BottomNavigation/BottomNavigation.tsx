import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { nanoid } from 'nanoid'

import navigationItems, { NavigationItem } from './BottomNavigationData'

const useStyles = makeStyles({
	root: {
		width: '100%',
		position: 'fixed',
		bottom: 0,
	},
})

export default function LabelBottomNavigation() {
	const { root } = useStyles()
	const [value, setValue] = React.useState('recents')

	const handleChange = (_: React.ChangeEvent<{}>, newValue: string) => {
		setValue(newValue)
	}

	return (
		<BottomNavigation value={value} onChange={handleChange} className={root}>
			{navigationItems.map(({ icon: Icon, ...props }: NavigationItem) => (
				<BottomNavigationAction key={nanoid()} {...props} icon={<Icon />} />
			))}
		</BottomNavigation>
	)
}
