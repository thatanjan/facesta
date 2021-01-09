import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import jwtDecode from 'jwt-decode'
import phin, { IJSONResponseOptions } from 'phin'
import axios from 'axios'

import theme from 'themes/theme'
import UserContextProvider from 'context/userContext'
import parseCookies from 'utils/parseCookies'
import redirectToAuth, {
	redirectToHome,
	didURLMatch as isAuthRoute,
} from 'utils/authRedirect'

import AppHeaderContainer from 'components/AppHeader/AppHeaderContainer'

import { AnyObject } from 'interfaces/global'

interface NewAppProps extends AppProps {
	userData: AnyObject
}

export default function MyApp(props: NewAppProps) {
	const { Component, pageProps, userData } = props

	const { asPath } = useRouter()

	React.useEffect(() => {
		const jssStyles: any = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])

	return (
		<>
			<Head>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<UserContextProvider userData={userData}>
					{!isAuthRoute(asPath) && <AppHeaderContainer />}
					<Component {...pageProps} /> )
				</UserContextProvider>
			</ThemeProvider>
		</>
	)
}

MyApp.getInitialProps = async ({
	ctx: { req, res },
	router: { asPath },
}: AnyObject) => {
	const { jwt }: AnyObject = parseCookies(req)

	if (!jwt) {
		redirectToAuth({ res, asPath })
		return {}
	}

	if (jwt) {
		const url = 'http://localhost:8000/validate'

		try {
			await axios.post(url, { data: { jwt } })
		} catch (error) {
			const statusCode = error.response.status

			if (statusCode === 401) {
				redirectToAuth({ res, asPath })
				return {}
			}
		}
	}

	const decodedToken: string = jwtDecode(jwt)

	redirectToHome({ res, asPath })

	return { userData: decodedToken }
}
