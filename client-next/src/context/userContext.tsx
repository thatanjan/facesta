import React, { createContext, useState } from 'react'

interface UserInterface {
	userName: string
	id: string
}

const initialState: UserInterface = {
	userName: '',
	id: '',
}

const UserContext = createContext({})

const UserContextProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState(initialState)

	return (
		<UserContext.Provider value={[user, setUser]}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContextProvider
