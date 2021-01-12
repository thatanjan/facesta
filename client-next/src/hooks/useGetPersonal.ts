import { getPersonalData } from 'graphql/queries/profileQueries'
import useSWRgql from 'hooks/useSWRgql'

const useGetPersonal = (userId: string) => {
	const mutation = getPersonalData('name bio skills')
	const options = { userId }
	const dependencies = [userId]

	return useSWRgql({ mutation, options, dependencies })
}

export default useGetPersonal
