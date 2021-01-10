import React from 'react'
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import useGetPersonal from 'hooks/useGetPersonal'

import { personal } from './SubSection'

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

interface PullData {
	name: string
	props: any
	Component: Function
	formFields: string[]
}

export interface Props extends PullData {
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
				<Details {...detailProps} />
			</Accordion>
		</>
	)
}

const pullData = (obj: PullData) => {
	const { name, props, Component, formFields } = obj

	return { name, props, Component, formFields }
}

const PersonalAccordion = () => {
	return <EachAccordion hook={useGetPersonal} {...pullData(personal)} />
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
