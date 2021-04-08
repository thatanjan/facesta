import React, { ReactNode, createContext, useState, useEffect } from 'react'

interface Props {
	children: ReactNode
	id: string
}

interface ContextInterface {
	userID: string
	setUserID: (val: string) => void
	haveSeenFeedOnce: boolean
	setHaveSeenFeedOnce: (val: boolean) => void
}

export const UserContext = createContext<ContextInterface>(
	{} as ContextInterface
)

const UserContextProvider = ({ children, id }: Props) => {
	const [userID, setUserID] = useState('')
	const [haveSeenFeedOnce, setHaveSeenFeedOnce] = useState(false)

	useEffect(() => {
		if (id) {
			setUserID(id)
		}
	}, [id])

	return (
		<UserContext.Provider
			value={{ userID, setUserID, haveSeenFeedOnce, setHaveSeenFeedOnce }}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserContextProvider
