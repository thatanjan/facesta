import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import PersonalAccordion from 'components/About/Personal/personal'

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
	},
}))

export interface Props {
	name: string
	props: any
	Component: Function
	formFields: string[]
	hook: Function
}

const SimpleAccordion = () => {
	const { root } = useStyles()
	return (
		<div className={root}>
			<PersonalAccordion />
		</div>
	)
}

export default SimpleAccordion
