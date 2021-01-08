import jwtDecode from 'jwt-decode'

import serverRedirect from 'utils/serverRedirect'

export const getServerSideProps = ({ req, res }: any) => {
	const {
		cookies: { jwt },
	} = req

	const { id }: any = jwtDecode(jwt)

	const redirectUrl = `/profile/${id}`

	serverRedirect(res, redirectUrl)

	return { props: {} }
}

export default () => null
