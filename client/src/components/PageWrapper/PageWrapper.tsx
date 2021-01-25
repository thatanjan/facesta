import React, { ReactNode } from 'react'
import UserContextProvider from 'context/UserContext'

interface Props {
	children: ReactNode
}

const PageWrapper = ({ children }: Props) => {
	return <UserContextProvider userData={{}}>{children}</UserContextProvider>
}

export default PageWrapper
