import React from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import logout from 'utils/logout'
import { redirectToAuth } from 'utils/authRedirect'

const Logout = () => {
	const router = useRouter()

	console.log(Cookies.remove('jwt'))

	setTimeout(() => {
		router.push('/authentication/login')
	}, 3000)

	return <div>You are logging out.</div>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { req, res } = ctx

	return { props: {} }
}
export default Logout
