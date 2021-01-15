import React, { createContext, ReactNode, useEffect, useState } from 'react'

interface Props {
	children: ReactNode
	isSelf: boolean
	userId: string
}

interface State {
	userId: string
	isSelf: boolean
}

interface ContextData {
	state: State
	setState: Function
}

const initialState: State = { userId: '', isSelf: false }

export const ProfileContext = createContext({} as ContextData)

const ProfileContextProvider = ({ children, isSelf, userId }: Props) => {
	const [state, setState] = useState<State>(initialState)

	useEffect(() => {
		setState({ ...state, isSelf })
	}, [isSelf])

	useEffect(() => {
		setState({ ...state, userId })
	}, [userId])

	return (
		<ProfileContext.Provider value={{ state, setState }}>
			{children}
		</ProfileContext.Provider>
	)
}

export default ProfileContextProvider
