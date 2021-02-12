import React, { createContext, ReactNode, useEffect, useState } from 'react'

interface Props {
	children: ReactNode
	isSelf: boolean
	profileUserId: string
}

export interface State {
	profileUserId: string
	isSelf: boolean
}

interface ContextData {
	state: State
	setState: Function
}

const initialState: State = { profileUserId: '', isSelf: false }

export const ProfileContext = createContext({} as ContextData)

const ProfileContextProvider = ({ children, isSelf, profileUserId }: Props) => {
	const [state, setState] = useState<State>(initialState)

	useEffect(() => {
		setState({ ...state, isSelf, profileUserId })
	}, [isSelf, profileUserId])

	return (
		<ProfileContext.Provider value={{ state, setState }}>
			{children}
		</ProfileContext.Provider>
	)
}

export default ProfileContextProvider
