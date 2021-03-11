import React, { createContext, ReactNode, useEffect, useState } from 'react'

interface Props {
	children: ReactNode
	isSelf: boolean
	profileUserID: string
}

export interface State {
	profileUserID: string
	isSelf: boolean
}

interface ContextData {
	state: State
	setState: Function
}

const initialState: State = { profileUserID: '', isSelf: false }

export const ProfileContext = createContext({} as ContextData)

const ProfileContextProvider = ({ children, isSelf, profileUserID }: Props) => {
	const [state, setState] = useState<State>(initialState)

	useEffect(() => {
		setState({ ...state, isSelf, profileUserID })
	}, [isSelf, profileUserID])

	return (
		<ProfileContext.Provider value={{ state, setState }}>
			{children}
		</ProfileContext.Provider>
	)
}

export default ProfileContextProvider
