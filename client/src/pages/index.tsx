import Head from 'next/head'
import { GetServerSideProps } from 'next'

import PageWrapper from 'components/PageWrapper/PageWrapper'
import validRedirect from 'utils/validRedirect'

const Home = () => {
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

export default Home

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { req, res } = ctx

	await validRedirect(req, res)

	return { props: {} }
}
