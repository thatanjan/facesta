import React, { useState } from 'react'

import { Props } from './AboutSection'

const Details = ({ Component, props, hook, ...others }: Props) => {
	const userId = '5ff9939e53c3e8c7a2c4a833'
	const { data, error } = hook({ userId })

	const newProps = {
		...props,
		...others,
	}

	if (error) return <div>failed to load</div>
	if (!data) return <div>loading...</div>

	const { getPersonal } = data

	return <Component data={getPersonal} {...newProps} />
}

export default Details
