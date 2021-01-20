import React from 'react'
import EachField from 'components/AboutSection/SectionDetails'

interface Props {
	hook: Function
}

const Details = (props: Props) => {
	return (
		<div>
			<EachField property='hellow' value='world' />
		</div>
	)
}

export default Details
