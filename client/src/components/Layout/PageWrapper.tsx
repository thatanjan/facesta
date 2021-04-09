import React, { ReactNode } from 'react'

import UserContextProvider from 'context/UserContext'

interface Props {
	children: ReactNode
	id: string
}

const PageWrapper = ({ children, id }: Props) => {
	return <UserContextProvider id={id}>{children}</UserContextProvider>
}

export default PageWrapper
