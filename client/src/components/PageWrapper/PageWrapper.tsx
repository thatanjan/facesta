import React, { ReactNode } from 'react'

interface Props {
	children: ReactNode
}

const PageWrapper = ({ children }: Props) => {
	return <>{children}</>
}

export default PageWrapper
