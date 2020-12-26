import React, { ReactNode, createContext, useState, useEffect } from 'react'

interface UserInterface {
	name: string
	id: string
}

interface AnyObject {
	[key: string]: any
}

interface Props {
	children: ReactNode
	userData: AnyObject
}

const initialState: UserInterface = {
	name: '',
	id: '',
}

export const UserContext = createContext({})

const UserContextProvider: React.FC = ({ children, userData }: Props) => {
	const [user, setUser] = useState<AnyObject>(initialState)

	useEffect(() => {
		setUser(userData)
	}, [userData])

	return (
		<UserContext.Provider value={[user, setUser]}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContextProvider
