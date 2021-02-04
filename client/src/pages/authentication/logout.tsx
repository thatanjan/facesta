import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { LOGIN_URL } from 'variables/global'

const Logout = () => {
	const { push } = useRouter()

	Cookies.remove('jwt')

	useEffect(() => {
		setTimeout(() => {
			push(LOGIN_URL)
		}, 3000)
	})

	return <div>You are logging out.</div>
}

export default Logout
