import Head from 'next/head'
import { GetServerSideProps } from 'next'

import PageWrapper from 'components/PageWrapper/PageWrapper'
import { TOKEN_NAME } from 'variables/global'

export default function Home() {
	return (
		<>
			<Head>
				<title>Dev Book</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div>
				<PageWrapper>
					<div>hello world</div>
				</PageWrapper>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const {
		req: { cookies },
	} = ctx

	if (!cookies?.[TOKEN_NAME]) {
		console.log('no cookies')
	}

	return { props: {} }
}
