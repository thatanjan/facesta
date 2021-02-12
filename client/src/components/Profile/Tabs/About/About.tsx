import React from 'react'
import dynamic from 'next/dynamic'

const Personal = dynamic(import('./personal/Personal'))

interface Props {}

const About = (props: Props) => {
	return <Personal />
}

export default About
