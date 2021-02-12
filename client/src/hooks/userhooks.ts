import { useContext } from 'react'
import { UserContext } from 'context/UserContext'

const useGetUser = () => {
	const [user]: any = useContext(UserContext)

	return user
}

export const useOwnUserId = () => useGetUser().id

export const useSetUser = () => {
	const [, setUser]: any = useContext(UserContext)

	return setUser
}

export default useGetUser
