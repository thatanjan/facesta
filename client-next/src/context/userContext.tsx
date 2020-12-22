import React, { createContext, useState, useEffect } from 'react'
import jwtDecode, { JwtPayload } from 'jwt-decode'

interface UserInterface {
	name: string
	id: string
}

const initialState: UserInterface = {
	name: '',
	id: '',
}

export const UserContext = createContext({})

const UserContextProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState(initialState)

	const [shouldUpdate, setShouldUpdate] = useState(false)

	useEffect(() => {}, [shouldUpdate])

	const LSChecker = () => {
		try {
			localStorage.setItem('test', 'test')
			localStorage.removeItem('test')
			return true
		} catch (e) {
			return false
		}
	}

	const [LocalStorage, setLocalStorage] = useState('')

	setTimeout(() => {
		if (LSChecker()) {
			setLocalStorage(localStorage.jwt)
		}
	}, 1)

	useEffect(() => {
		if (LocalStorage) {
			const { name, id } = jwtDecode<UserInterface>(LocalStorage)

			setUser({ name, id })
		}
	}, [LocalStorage])

	return (
		<UserContext.Provider value={[user, setUser, shouldUpdate, setShouldUpdate]}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContextProvider
