import React, { useState } from 'react'
import AccordionDetails from '@material-ui/core/AccordionDetails'

import { Props as AccordionProps } from './AboutSection'

interface Props extends AccordionProps {
	accordionDetails: string
}

const Details = ({
	Component,
	props,
	accordionDetails,
	hook,
	...others
}: Props) => {
	const userId = '5ff9939e53c3e8c7a2c4a833'
	const { data, error } = hook({ userId })

	const newProps = {
		...props,
		...others,
	}

	console.log(error)

	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	const { getPersonal } = data

	return (
		<AccordionDetails className={accordionDetails}>
			<Component data={getPersonal} {...newProps} />
		</AccordionDetails>
	)
}

export default Details
