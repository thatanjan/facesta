import React, { createContext, ReactNode, useState } from 'react'

interface Props {
	children: ReactNode
}

const initialState = {}

const ProfileContext = createContext(initialState)

const ProfileContextProvider = ({ children }: Props) => {
	const [state, setState] = useState(initialState)

	return (
		<ProfileContext.Provider value={[state, setState]}>
			{children}
		</ProfileContext.Provider>
	)
}

export default ProfileContextProvider
