import React from 'react'
import dynamic from 'next/dynamic'

const Personal = dynamic(import('./personal/Personal'))

const About = () => {
	return <Personal />
}

export default About
