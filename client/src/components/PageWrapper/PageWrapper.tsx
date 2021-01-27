import React, { ReactNode } from 'react'
import UserContextProvider from 'context/UserContext'
import UserPayload from 'interfaces/user'

interface Props {
	children: ReactNode
	userData: UserPayload
}

const PageWrapper = ({ children, userData }: Props) => {
	return (
		<UserContextProvider userData={userData}>{children}</UserContextProvider>
	)
}

export default PageWrapper
