import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

import SectionDetails from 'components/AboutSection/SectionDetails'

const NewDetailForm = dynamic(() => import('./NewDetailForm'))

const PERSONAL = 'personal'

class Section {
	name: string

	Component: Function

	// eslint-disable-next-line
	props: any

	formFields: any

	constructor(name: string, Component: Function) {
		this.name = name
		this.Component = Component
	}

	addProps(props: any) {
		this.props = props
		this.props.buttonText = this.name
		return this
	}

	addFormField(fields: any) {
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

const addButtonText = (text: string) => ({ buttonText: `Add a new ${text}` })

const personal = new Section(PERSONAL, SubSection).addProps(
	addButtonText('Change details')
)

const education = new Section('Education', SubSection)
	.addProps(addButtonText('School'))
	.addFormField(['School'])

const experience = new Section('Experience', SubSection)
	.addProps(addButtonText('Experience'))
	.addFormField(['Company'])

const placesLived = new Section('Places Lived', SubSection)
	.addProps(addButtonText('Place'))
	.addFormField(['city', 'town', 'country'])

const options: Section[] = [personal, education, experience, placesLived]

export default options
