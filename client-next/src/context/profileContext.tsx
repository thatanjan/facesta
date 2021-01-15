import React, { createContext, ReactNode, useEffect, useState } from 'react'

interface Props {
	children: ReactNode
	isSelf: boolean
	userId: string
}

const initialState = {}

const ProfileContext = createContext(initialState)

const ProfileContextProvider = ({ children, isSelf, userId }: Props) => {
	const [state, setState] = useState(initialState)

	useEffect(() => {
		setState({ ...state, isSelf })
	}, [isSelf])

	useEffect(() => {
		setState({ ...state, userId })
	}, [userId])

	return (
		<ProfileContext.Provider value={[state, setState]}>
			{children}
		</ProfileContext.Provider>
	)
}

export default ProfileContextProvider
