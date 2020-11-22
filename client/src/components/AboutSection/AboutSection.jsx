// import React from 'react'
// import { connect } from 'react-redux'
// import Card from '@material-ui/core/Card'
// import Grid from '@material-ui/core/Grid'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemText from '@material-ui/core/ListItemText'
// import List from '@material-ui/core/List'
// import { nanoid } from 'nanoid'

// export const AboutSection = () => {
// 	return (
// 		<>
// 			<Card>
// 				<Grid container>
// 					<Grid xs={4} item>
// 						<List component='nav' aria-label='main mailbox folders'>
// 							{options.map(item => (
// 								<ListItem button key={nanoid()}>
// 									<ListItemText primary={item} />
// 								</ListItem>
// 							))}
// 						</List>
// 					</Grid>
// 					<Grid xs={8} item>
// 						2{' '}
// 					</Grid>
// 				</Grid>
// 			</Card>
// 		</>
// 	)
// }

// const mapStateToProps = state => ({})

// const mapDispatchToProps = {}

// export default connect(mapStateToProps, mapDispatchToProps)(AboutSection)

import React from 'react'
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

export default function SimpleAccordion() {
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
