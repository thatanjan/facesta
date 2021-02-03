import Head from 'next/head'
import { GetServerSideProps } from 'next'

import PageWrapper from 'components/PageWrapper/PageWrapper'
import PageLayoutComponent from 'components/Layout/PageLayoutComponent'
import validRedirect from 'utils/validRedirect'
import decodeToken from 'utils/decodeToken'
import { PropsWithUserData } from 'interfaces/user'
import Requset from 'interfaces/requsetResponse'

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

	const isValid = await validRedirect(req as Requset, res)

	// console.log(isValid)
	if (!isValid) {
		return { props: {} }
	}

	const userData = decodeToken(req as Requset)

	return { props: { userData } }
}
