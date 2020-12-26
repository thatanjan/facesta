import React, {
	ReactNode,
	createContext,
	useState,
	useEffect,
	useMemo,
} from 'react'

interface UserInterface {
	name: string
	id: string
}

interface AnyObject {
	[key: string]: any
}

interface Props {
	children: ReactNode
	userData: any
}

const initialState: UserInterface = {
	name: '',
	id: '',
}

export const UserContext = createContext({})

const UserContextProvider: React.FC = ({ children, userData }: Props) => {
	const [user, setUser] = useState<AnyObject>(initialState)

	const [num, setNum] = useState(0)

	const userMemoData = useMemo(() => userData, [userData])

	useEffect(() => {
		if (!user.name) {
			setUser(userMemoData)
			setNum(num + 1)
		}
	}, [userMemoData])

	return (
		<UserContext.Provider value={[user, setUser]}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContextProvider
