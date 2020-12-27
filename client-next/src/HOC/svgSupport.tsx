import React, { ReactNode } from 'react'

import SvgIcon from '@material-ui/core/SvgIcon'

const SvgSupport = (component: ReactNode) => {
	const Svg = (props: any) => {
		return <SvgIcon viewBox='0 0 600 476.6' component={component} {...props} />
	}
	Svg.displayName = 'SVG'
	return Svg
}

export default SvgSupport
