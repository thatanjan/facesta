import Head from 'next/head'
import { GetServerSideProps } from 'next'

import PageWrapper from 'components/PageWrapper/PageWrapper'
import { TOKEN_NAME } from 'variables/global'
import { redirectToAuth } from 'utils/authRedirect'
import checkValidJwt from 'utils/checkValidJwt'

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
		res,
	} = ctx

	const token = cookies?.[TOKEN_NAME]

	if (!token || !(await checkValidJwt(token))) {
		redirectToAuth(res)
	}

	return { props: {} }
}
