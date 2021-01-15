import React from 'react'

import CustomAccordion from 'components/Accordion/CustomAccordion'
import PersonalDetails from './PersonalDetails'

interface Props {}

const Personal = (props: Props) => {
	return (
		<>
			<CustomAccordion name='Personal'>
				<PersonalDetails />
			</CustomAccordion>
		</>
	)
}

export default Personal
