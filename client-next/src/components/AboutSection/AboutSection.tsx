import React from 'react'
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AccordionDetails from '@material-ui/core/AccordionDetails'

import { personal } from './AccordionOption'

const Details = dynamic(() => import('./AccordionDetails'))

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	heading: {
		// fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
		textTransform: 'capitalize',
	},
	accordionDetails: {
		flexWrap: 'wrap',
	},
}))

export interface Props {
	name: string
	props: any
	Component: Function
	formFields: string[]
	hook: Function
}

const EachAccordion = ({ hook, name, props, Component, formFields }: Props) => {
	const { heading, accordionDetails } = useStyles()

	const detailProps = {
		name,
		props,
		Component,
		formFields,
		accordionDetails,
		hook,
	}

	return (
		<>
			<Accordion TransitionProps={{ unmountOnExit: true }}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
				>
					<Typography variant='h6' className={heading}>
						{name}
					</Typography>
				</AccordionSummary>
				<AccordionDetails className={accordionDetails}>
					<Details {...detailProps} />
				</AccordionDetails>
			</Accordion>
		</>
	)
}

const pullData = (obj: Props) => {
	const { name, props, Component, formFields, hook } = obj

	return { name, props, Component, formFields, hook }
}

const PersonalAccordion = () => {
	return <EachAccordion {...pullData(personal)} />
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
