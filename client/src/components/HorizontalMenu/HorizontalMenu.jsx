import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CircularProgress from '@material-ui/core/CircularProgress'
import { nanoid } from 'nanoid'

const AboutSection = lazy(() => import('components/AboutSection/AboutSection'))

const PostsSection = lazy(() => import('components/PostsSection/PostsSection'))

const FollowSection = lazy(() =>
	import('components/FollowComponent/FollowComponent')
)

const arr = [
	{
		name: 'Ed Sheeran',
		details: 'Artist of Perfect',
		avatar: 'https://a.wattpad.com/cover/5678567-256-k470580.jpg',
	},
	{
		name: 'Ed Sheeran',
		details: 'Artist of Perfect',
		avatar: 'https://a.wattpad.com/cover/5678567-256-k470580.jpg',
	},
	{
		name: 'Ed Sheeran',
		details: 'Artist of Perfect',
		avatar: 'https://a.wattpad.com/cover/5678567-256-k470580.jpg',
	},
]

class OptionBuilder {
	constructor(name, Component, data) {
		this.name = name
		this.Component = Component
		this.data = data
	}
}

const About = new OptionBuilder('About', AboutSection)

const Posts = new OptionBuilder('Posts', PostsSection)

const Followers = new OptionBuilder('Follwers', FollowSection, arr)

const Following = new OptionBuilder('Following', FollowSection, arr)

const tabOptions = [About, Posts, Followers, Following]

const TabPanel = ({ value, ...other }) => {
	const { Component } = tabOptions[value]
	const { data } = tabOptions[value]
	return (
		<div
			role='tabpanel'
			id={`scrollable-auto-tabpanel-${value}`}
			aria-labelledby={`scrollable-auto-tab-${value}`}
			{...other}
		>
			<Suspense fallback={<CircularProgress />}>
				<Component data={data} />
			</Suspense>
		</div>
	)
}

TabPanel.propTypes = {
	value: PropTypes.number.isRequired,
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
const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalMenu)
