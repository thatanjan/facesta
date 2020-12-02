import React, { Suspense, lazy, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

import SectionDetails from 'components/AboutSection/SectionDetails'

const NewDetailForm = lazy(() => import('./NewDetailForm'))

class Section {
	constructor(name, Component) {
		this.name = name
		this.Component = Component
	}

	addProps(props) {
		this.props = props
		this.props.buttonText = this.name
		return this
	}

	addFormField(fields) {
		this.formFields = fields
		return this
	}
}

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

const SubSection = ({ buttonText, formFields }) => {
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
						Add a new {buttonText}
					</Button>
				</Grid>
			</Grid>

			{isAddingNewDetail && (
				<Suspense fallback={<CircularProgress />}>
					<NewDetailForm formFields={formFields} doneAdding={setIsAddingNewDetail} />
				</Suspense>
			)}
		</>
	)
}

const addButtonText = text => ({ buttonText: `Add a new ${text}` })

const education = new Section('Education', SubSection)
	.addProps(addButtonText('School'))
	.addFormField(['School'])

const experience = new Section('Experience', SubSection)
	.addProps(addButtonText('Experience'))
	.addFormField(['Company'])

const placesLived = new Section('Places Lived', SubSection)
	.addProps(addButtonText('Place'))
	.addFormField(['city', 'town', 'country'])

const options = [education, experience, placesLived]

export default options
