import React, {
	ReactNode,
	createContext,
	useState,
	useEffect,
	useMemo,
} from 'react'

import { AnyObject } from 'interfaces/global'

interface UserInterface {
	name: string
	id: string
}

interface Props {
	children: ReactNode
	userData: AnyObject
}

const initialState: UserInterface = {
	name: '',
	id: '',
}

export const UserContext = createContext({})

const UserContextProvider: React.FC = ({ children, userData }: Props) => {
	const [user, setUser] = useState<AnyObject>(initialState)

	const userMemoData = useMemo(() => userData, [userData])

	useEffect(() => {
		if (!user.name) {
			setUser(userMemoData)
		}
	}, [userMemoData])

	return (
		<UserContext.Provider value={[user, setUser]}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContextProvider
