import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { nanoid } from 'nanoid'

const options = ['school', 'experience', 'Places lived', 'relationship status']

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
		textTransform: 'capitalize',
	},
}))

const SimpleAccordion = () => {
	const { root, heading } = useStyles()

	return (
		<div className={root}>
			{options.map(item => (
				<Accordion TransitionProps={{ unmountOnExit: true }} key={nanoid()}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel1a-content'
						id='panel1a-header'
					>
						<Typography variant='h6' className={heading}>
							{item}
						</Typography>
					</AccordionSummary>
					<AccordionDetails>this is {item}</AccordionDetails>
				</Accordion>
			))}
		</div>
	)
}

export default SimpleAccordion
