import React from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { nanoid } from 'nanoid'

import navigationItems, {
	NavigationItem,
	HOME,
	SEARCH,
} from './BottomNavigationData'

const useStyles = makeStyles({
	root: {
		width: '100%',
		position: 'fixed',
		bottom: 0,
	},
})

export default function LabelBottomNavigation() {
	const { push, asPath } = useRouter()

	const { root } = useStyles()
	const [value, setValue] = React.useState(asPath.substring(1) || HOME)

	const handleChange = (_: React.ChangeEvent<{}>, newValue: string) => {
		setValue(newValue)
	}

	// eslint-disable-next-line
	const handleClick = (routeName: string) => {
		switch (routeName) {
			case HOME:
				return push('/')

			case SEARCH:
				return push(`/${SEARCH}`)

			default:
				return push('/development')
		}
	}

	return (
		<BottomNavigation value={value} onChange={handleChange} className={root}>
			{navigationItems.map(({ icon: Icon, ...props }: NavigationItem) => (
				<BottomNavigationAction
					key={nanoid()}
					{...props}
					icon={<Icon />}
					onClick={() => handleClick(props.value)}
				/>
			))}
		</BottomNavigation>
	)
}
