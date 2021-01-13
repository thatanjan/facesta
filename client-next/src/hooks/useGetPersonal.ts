import { ConfigInterface } from 'swr'
import { getPersonalData } from 'graphql/queries/profileQueries'
import useSWRgql from 'hooks/useSWRgql'

interface Props {
	userId: string
	swrOptions?: ConfigInterface | undefined
}

const useGetPersonal = ({ userId, swrOptions }: Props) => {
	const mutation = getPersonalData()
	const options = { userId }

	return useSWRgql({ mutation, options, swrOptions, swrDependencies: userId })
}

export default useGetPersonal
