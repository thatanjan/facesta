import React from 'react'
import dynamic from 'next/dynamic'

import CircularLoader from 'components/Loaders/CircularLoader'

const PersonalDetails = dynamic(() => import('./PersonalDetails'), {
	loading: () => <CircularLoader />,
})

const Personal = () => {
	return (
		<>
			<PersonalDetails />
		</>
	)
}

export default Personal
