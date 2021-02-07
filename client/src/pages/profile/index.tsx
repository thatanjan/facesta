import getToken from 'utils/getToken'
import decodeToken from 'utils/decodeToken'
import shouldRedirectToAuth from 'utils/shouldRedirectToAuth'
import createRedirectObject from 'utils/createRedirectObject'
import Requset from 'interfaces/requsetResponse'
import { LOGIN_URL } from 'variables/global'

export const getServerSideProps = async ({ req, res }: any) => {
	const token = getToken(req as Requset)

	const shouldRedirect = await shouldRedirectToAuth(token)

	if (shouldRedirect) return createRedirectObject(LOGIN_URL)

	const { id } = decodeToken(req as Requset)

	console.log(id)
	return { props: {} }
}

const Index = () => null

export default Index
