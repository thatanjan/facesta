import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang='en' prefix='og: https://ogp.me/ns#'>
				<Head>
					<meta property='og:type' content='website' />
					<meta property='og:locale' content='en_US' />

					<link
						rel='apple-touch-icon'
						sizes='57x57'
						href='/favicon/apple-icon-57x57.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='60x60'
						href='/favicon/apple-icon-60x60.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='72x72'
						href='/favicon/apple-icon-72x72.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='76x76'
						href='/favicon/apple-icon-76x76.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='114x114'
						href='/favicon/apple-icon-114x114.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='120x120'
						href='/favicon/apple-icon-120x120.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='144x144'
						href='/favicon/apple-icon-144x144.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='152x152'
						href='/favicon/apple-icon-152x152.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='180x180'
						href='/favicon/apple-icon-180x180.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='192x192'
						href='/favicon/android-icon-192x192.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='32x32'
						href='/favicon/favicon-32x32.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='96x96'
						href='/favicon/favicon-96x96.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='16x16'
						href='/favicon/favicon-16x16.png'
					/>
					<link rel='manifest' href='/favicon/manifest.json' />
					<meta name='msapplication-TileColor' content='#ffffff' />
					<meta
						name='msapplication-TileImage'
						content='/favicon/ms-icon-144x144.png'
					/>
					<meta name='theme-color' content='#ffffff' />

					<link
						rel='stylesheet'
						href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async ctx => {
	// Resolution order
	//
	// On the server:
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. document.getInitialProps
	// 4. app.render
	// 5. page.render
	// 6. document.render
	//
	// On the server with error:
	// 1. document.getInitialProps
	// 2. app.render
	// 3. page.render
	// 4. document.render
	//
	// On the client
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. app.render
	// 4. page.render

	// Render app and page and get the context of the page with collected side effects.
	const sheets = new ServerStyleSheets()
	const originalRenderPage = ctx.renderPage

	// eslint-disable-next-line
	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: App => props => sheets.collect(<App {...props} />),
		})

	const initialProps = await Document.getInitialProps(ctx)

	return {
		...initialProps,
		// Styles fragment is rendered after the app and page rendering finish.
		styles: [
			...React.Children.toArray(initialProps.styles),
			sheets.getStyleElement(),
		],
	}
}
