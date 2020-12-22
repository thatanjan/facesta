import React, { createContext, useState } from 'react'

interface UserInterface {
	name: string
	id: string
}

const initialState: UserInterface = {
	name: '',
	id: '',
}

export const UserContext = createContext({})

const UserContextProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState(initialState)

	return (
		<UserContext.Provider value={[user, setUser]}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContextProvider
