import React, { createContext, ReactNode, useEffect, useState } from 'react'

interface Props {
	children: ReactNode
	isSelf: boolean
}

const initialState = {}

const ProfileContext = createContext(initialState)

const ProfileContextProvider = ({ children, isSelf }: Props) => {
	const [state, setState] = useState(initialState)

	useEffect(() => {
		setState({ ...state, isSelf })
	}, [isSelf])

	return (
		<ProfileContext.Provider value={[state, setState]}>
			{children}
		</ProfileContext.Provider>
	)
}

export default ProfileContextProvider
