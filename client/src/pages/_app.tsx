import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { SWRConfig } from 'swr'
import { enableAllPlugins } from 'immer'

import theme from 'themes/theme'
import { APP_NAME } from 'variables/global'

export default function MyApp(props: AppProps) {
	const { Component, pageProps } = props

	enableAllPlugins()

	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles: any = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])

	return (
		<>
			<Head>
				<title>{APP_NAME}</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>

			<ThemeProvider theme={theme}>
				<CssBaseline />
				<SWRConfig
					value={{
						revalidateOnFocus: false,
					}}
				>
					<Component {...pageProps} />
				</SWRConfig>
			</ThemeProvider>
		</>
	)
}
