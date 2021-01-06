import { useContext } from 'react'
import { UserContext } from 'context/userContext'

const useGetUser = () => {
	const [user]: any = useContext(UserContext)

	return user
}

export const useUserID = () => useGetUser().id

export const useSetUser = () => {
	const [, setUser]: any = useContext(UserContext)

	return setUser
}

export default useGetUser
