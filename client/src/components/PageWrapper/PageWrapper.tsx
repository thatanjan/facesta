import React, { ReactNode } from 'react'
import UserContextProvider from 'context/UserContext'
import { PropsWithUserData } from 'interfaces/user'

interface Props extends PropsWithUserData {
	children: ReactNode
}

const PageWrapper = ({ children, userData }: Props) => {
	return (
		<UserContextProvider userData={userData}>{children}</UserContextProvider>
	)
}

export default PageWrapper
