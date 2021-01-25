import Head from 'next/head'
import PageWrapper from 'components/PageWrapper/PageWrapper'

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
