import dynamic from 'next/dynamic'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CircularProgress from '@material-ui/core/CircularProgress'
import { nanoid } from 'nanoid'

// import Personal from 'components/About/personal/Personal'
import { AnyObject } from 'interfaces/global'
import { useFollowers, useFollowing } from 'hooks/useFollow'

const AboutTab = dynamic(() => import('components/Profile/Tabs/About/About'))

class TabBuilder {
	Component: Function

	name: string

	constructor(name: string, Component: Function) {
		this.name = name
		this.Component = Component
	}
}

const About = new TabBuilder('About', AboutTab)

// import OptionBuilder, { Data as OptionData } from 'utils/optionBuilder'

// const AboutSection = dynamic(() => import('components/About/AboutTabMenu'))

// const PostsSection = dynamic(
// 	() => import('components/PostsSection/PostsSection')
// )

// const FollowSection = dynamic(
// 	() => import('components/FollowComponent/FollowComponent')
// )

// const Posts = new OptionBuilder('Posts', PostsSection)

export const FOLLOWERS = 'followers'
export const FOLLOWING = 'following'

// const Followers = new OptionBuilder(FOLLOWERS, FollowSection).addHook(
// 	useFollowers
// )

// const Following = new OptionBuilder(FOLLOWING, FollowSection).addHook(
// 	useFollowing
// )

const tabs: TabBuilder[] = [About]

const TabPanel = ({ value, ...other }: any) => {
	const { Component, name } = tabs[value]
	// const props = { hook, name }

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

const a11yProps = (index: number) => {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	}
}

const useStyles = makeStyles((theme: any) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
		marginBottom: '10vh',
	},
}))

const HorizontalMenu = () => {
	const classes = useStyles()
	const [value, setValue] = React.useState(0)

	const handleChange = (event: AnyObject, newValue: number) => {
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
					{tabs.map((item, index) => (
						<Tab key={nanoid()} label={item.name} {...a11yProps(index)} />
					))}
				</Tabs>
			</AppBar>

			<TabPanel value={value} />
		</div>
	)
}

export default HorizontalMenu
