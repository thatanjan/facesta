import React, { ReactNode } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

interface Props {
	children: ReactNode
	name: string
}

const useStyles = makeStyles((theme: Theme) => ({
	heading: {
		fontWeight: theme.typography.fontWeightRegular,
		textTransform: 'capitalize',
	},
}))

const CustomAccordion = ({ children, name }: Props) => {
	const { heading } = useStyles()

	return (
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
			{children}
		</Accordion>
	)
}

export default CustomAccordion
