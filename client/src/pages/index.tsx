import Head from 'next/head'
import { GetServerSideProps } from 'next'

import PageWrapper from 'components/PageWrapper/PageWrapper'
import validRedirect from 'utils/validRedirect'
import PageLayoutComponent from 'components/Layout/PageLayoutComponent'
import { PropsWithUserData } from 'interfaces/user'

interface Props extends PropsWithUserData {}

const Home = ({ userData }: Props) => {
	return (
		<>
			<Head>
				<title>Dev Book</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div>
				<PageWrapper userData={userData}>
					<PageLayoutComponent Content={() => <div>hello world</div>} />
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
