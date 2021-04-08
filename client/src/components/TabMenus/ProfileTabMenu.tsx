import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'

import { FOLLOWEES, FOLLOWERS } from 'variables/global'
import { useGetFollowers, useGetFollowees } from 'hooks/followHooks'

import CircularLoader from 'components/Loaders/CircularLoader'

const PostsSection = dynamic(
	() => import('components/Profile/Tabs/Posts/Posts'),
	{ loading: () => <CircularLoader /> }
)
const AboutTab = dynamic(() => import('components/Profile/Tabs/About/About'), {
	loading: () => <CircularLoader />,
})

const FollowersSection = dynamic(
	() => import('components/Profile/Tabs/Follow/Followers'),
	{ loading: () => <CircularLoader /> }
)

const FolloweesSection = dynamic(
	() => import('components/Profile/Tabs/Follow/Followees'),
	{ loading: () => <CircularLoader /> }
)

type SetStateBool = (val: boolean) => void

class TabBuilder {
	Component: Function

	name: string

	hook?: Function

	hasSeenBefore?: boolean

	setHasSeenBefore?: SetStateBool

	constructor(name: string, Component: Function) {
		this.name = name
		this.Component = Component
	}

	addHook(hook: Function) {
		this.hook = hook
		return this
	}

	addState(state: boolean, setState: SetStateBool) {
		this.hasSeenBefore = state
		this.setHasSeenBefore = setState
	}
}

const About = new TabBuilder('About', AboutTab)

const Followers: TabBuilder = new TabBuilder(
	FOLLOWERS,
	FollowersSection
).addHook(useGetFollowers)

const Followees: TabBuilder = new TabBuilder(
	FOLLOWEES,
	FolloweesSection
).addHook(useGetFollowees)

const Posts: TabBuilder = new TabBuilder('Posts', PostsSection)

const tabs: TabBuilder[] = [Posts, Followers, Followees, About]

const TabPanel = ({ value, ...other }: any) => {
	const [hasSeenFollowers, setHasSeenFollowers] = useState(false)
	const [hasSeenFollowees, setHasSeenFollowees] = useState(false)
	const [hasSeenAllpost, setHasSeenAllPost] = useState(false)

	tabs[0].addState(hasSeenAllpost, setHasSeenAllPost)
	tabs[1].addState(hasSeenFollowers, setHasSeenFollowers)
	tabs[2].addState(hasSeenFollowees, setHasSeenFollowees)

	const { Component, ...others } = tabs[value]

	return (
		<div
			role='tabpanel'
			id={`scrollable-auto-tabpanel-${value}`}
			aria-labelledby={`scrollable-auto-tab-${value}`}
			{...other}
		>
			<Component {...others} />
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
	tabsContainer: {
		'& > .MuiTabs-scroller': {
			'& > .MuiTabs-flexContainer': {
				justifyContent: 'space-evenly',
			},
		},
	},
}))

const HorizontalMenu = () => {
	const {
		query: { show },
	} = useRouter()

	const { root, tabsContainer } = useStyles()
	const [value, setValue] = React.useState(0)

	useEffect(() => {
		if (!show) {
			setValue(0)
		} else {
			setValue(parseInt(show as string, 10))
		}
	}, [show])

	const handleClick = (index: number) => {
		const currentURL = `${window.location.protocol}//${window.location.host}${window.location.pathname}`

		const newURL = new URL(currentURL)
		newURL.searchParams.set('show', index.toString())
		window.history.pushState({}, '', (newURL as unknown) as string)
		setValue(index)
	}

	return (
		<div className={root}>
			<AppBar position='static' color='default'>
				<Tabs
					className={tabsContainer}
					value={value}
					indicatorColor='secondary'
					textColor='secondary'
					variant='scrollable'
					scrollButtons='auto'
					aria-label='scrollable auto tabs example'
				>
					{tabs.map((item, index) => (
						<Tab
							key={nanoid()}
							label={item.name}
							{...a11yProps(index)}
							onClick={() => handleClick(index)}
						/>
					))}
				</Tabs>
			</AppBar>

			<TabPanel value={value} />
		</div>
	)
}

export default HorizontalMenu
