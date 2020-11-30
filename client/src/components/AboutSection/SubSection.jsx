import React from 'react'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

import SectionDetails from 'components/AboutSection/SectionDetails'

class Section {
	constructor(name, Component) {
		this.name = name
		this.Component = Component
	}

	addProps(props) {
		// this.props = props
		console.log(this)
		return this
	}
}

const SubSection = ({ buttonText }) => {
	return (
		<>
			<SectionDetails />
			<Divider light />
			<Button variant='contained' color='secondary'>
				Add a new {buttonText}
			</Button>
		</>
	)
}

const education = new Section('Education', SubSection).addProps({
	buttonText: this.name,
})
const experience = new Section('Experience', SubSection).addProps({
	buttonText: this.name,
})
const placesLived = new Section('Places Lived', SubSection).addProps({
	buttonText: this.name,
})

const options = [education, experience, placesLived]

export default options
