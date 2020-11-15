import React from 'react'

// import BackgroundPaper from 'HOC/BackgroundPaper'
import PageLayoutComponent from 'HOC/PageLayoutComponent'

const content = () => <div children='content' />
const drawer = () => <div children='content' />
const right = () => <div children='content' />

const HomePage = () => {
	return (
		<PageLayoutComponent Drawer={drawer} Content={content} RightSection={right} />
	)
}

export default HomePage
