import Head from 'next/head'
import Typography from '@material-ui/core/Typography'

const Home = () => {
	return (
		<div className='home'>
			<Head>
				<title>DevBook</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Typography variant='h1'>Dev Book</Typography>
			<Typography variant='h4'>
				A social media application for Developers
			</Typography>
		</div>
	)
}

export default Home
