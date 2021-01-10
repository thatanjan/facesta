import { getPersonal } from 'graphql/queries/profileQueries'
import useSWRgql from 'hooks/useSWRgql'

const useGetPersonal = (userId: string) => {
	const mutation = getPersonal('name bio')
	const options = { userId }
	const dependencies = [userId]

	return useSWRgql({ mutation, options, dependencies })
}

export default useGetPersonal
