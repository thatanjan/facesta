import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { nanoid } from 'nanoid'

import AboutSection from 'components/AboutSection/AboutSection'
import PostsSection from 'components/PostsSection/PostsSection'

// const tabOption = [
// 	'About',
// 	'Follwers',
// 	'Follwing',
// 	'Posts',
// 	'Videos',
// 	'Shared',
// 	'Page',
// 	'Group',
// 	'Favorite',
// ]

class OptionBuilder {
	constructor(name, Component) {
		this.name = name
		this.Component = Component
	}
}

const About = new OptionBuilder('About', AboutSection)

const PostsSectionr = () => <div children='hello ' />
const Posts = new OptionBuilder('Posts', PostsSection)

const tabOptions = [About, Posts]

const TabPanel = ({ children, value, ...other }) => {
	const Component = tabOptions[value].Component
	return (
		<div
			role='tabpanel'
			id={`scrollable-auto-tabpanel-${value}`}
			aria-labelledby={`scrollable-auto-tab-${value}`}
			{...other}
		>
			<Component />
		</div>
	)
}

const a11yProps = index => {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	}
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
}))

const HorizontalMenu = () => {
	const classes = useStyles()
	const [value, setValue] = React.useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	return (
		<div className={classes.root}>
			<AppBar position='static' color='default'>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor='secondary'
					textColor='secondary'
					variant='scrollable'
					scrollButtons='auto'
					aria-label='scrollable auto tabs example'
				>
					{tabOptions.map((item, index) => (
						<Tab key={nanoid()} label={item.name} {...a11yProps(index)} />
					))}
				</Tabs>
			</AppBar>

			<TabPanel value={value} />
		</div>
	)
}
const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalMenu)
