import React, { createContext, ReactNode, useEffect, useState } from 'react'

interface Props {
	children: ReactNode
	isSelf: boolean
	profileUserID: string
	name: string
	profilePicture: string
}

export interface State {
	profileUserID: string
	isSelf: boolean
	name: string
	profilePicture: string
}

interface ContextData {
	state: State
	setState: Function
}

const initialState: State = {
	profileUserID: '',
	isSelf: false,
	name: '',
	profilePicture: '',
}

export const ProfileContext = createContext({} as ContextData)

const ProfileContextProvider = ({
	children,
	isSelf,
	profileUserID,
	...others
}: Props) => {
	const [state, setState] = useState<State>(initialState)

	useEffect(() => {
		setState({ ...state, isSelf, profileUserID, ...others })
	}, [isSelf, profileUserID])

	return (
		<ProfileContext.Provider value={{ state, setState }}>
			{children}
		</ProfileContext.Provider>
	)
}

export default ProfileContextProvider
