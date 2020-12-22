import { useContext } from 'react'
import { UserContext } from 'context/userContext'

const useGetUser = () => {
	const [user]: any = useContext(UserContext)

	return user
}

export default useGetUser
