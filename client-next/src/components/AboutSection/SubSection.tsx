import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

import SectionDetails from 'components/AboutSection/SectionDetails'

import { PERSONAL } from './AccordionOption'

const NewDetailForm = dynamic(() => import('./NewDetailForm'))

const useStyles = makeStyles(({ spacing }) => ({
	buttonStyle: {
		marginTop: spacing(4),
	},
	dividerStyle: {
		marginTop: spacing(2),
		height: spacing(0.3),
		width: '100%',
	},
}))

const SubSection = ({ buttonText, formFields, name }: any) => {
	const { buttonStyle, dividerStyle } = useStyles()

	const [isAddingNewDetail, setIsAddingNewDetail] = useState(false)

	return (
		<>
			<SectionDetails />
			<Divider className={dividerStyle} />

			<Grid container justify='flex-end'>
				<Grid item>
					<Button
						variant='contained'
						color='secondary'
						className={buttonStyle}
						onClick={() => setIsAddingNewDetail(true)}
						disabled={isAddingNewDetail}
					>
						{name === PERSONAL ? 'Change Details' : `Add a new ${buttonText}`}
					</Button>
				</Grid>
			</Grid>

			{isAddingNewDetail && (
				<NewDetailForm formFields={formFields} doneAdding={setIsAddingNewDetail} />
			)}
		</>
	)
}

export default SubSection
