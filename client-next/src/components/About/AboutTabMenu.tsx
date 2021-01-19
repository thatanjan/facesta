import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { nanoid } from 'nanoid'

import aboutTabOptions from './AboutTabOptions'

interface TabPanelProps {
	value: any
}

function TabPanel({ value }: TabPanelProps) {
	const { Component, ...props } = aboutTabOptions[value]

	return (
		<div
			role='tabpanel'
			id={`scrollable-auto-tabpanel-${value}`}
			aria-labelledby={`scrollable-auto-tab-${value}`}
		>
			<Component {...props} />
		</div>
	)
}

function a11yProps(index: any) {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	}
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
		marginTop: '20px',
	},
}))

export default function ScrollableTabsButtonAuto() {
	const classes = useStyles()
	const [value, setValue] = React.useState(0)

	const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue)
	}

	return (
		<div className={classes.root}>
			<AppBar position='static' color='default'>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor='primary'
					textColor='primary'
					variant='scrollable'
					scrollButtons='auto'
					aria-label='scrollable auto tabs example'
				>
					{aboutTabOptions.map((item, index) => (
						<Tab key={nanoid()} label={item.name} {...a11yProps(index)} />
					))}
				</Tabs>
			</AppBar>
			<TabPanel value={value} />
		</div>
	)
}
