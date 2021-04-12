import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { Formik, Form, Field } from 'formik'
import Button from '@material-ui/core/Button'
import { TextField } from 'formik-material-ui'

import PageWrapper from 'components/Layout/PageWrapper'
import PageLayoutComponent from 'components/Layout/PageLayoutComponent'
import Requset from 'interfaces/requsetResponse'
import shouldRedirectToAuth from 'utils/shouldRedirectToAuth'
import decodeToken from 'utils/decodeToken'
import getToken from 'utils/getToken'
import createRedirectObject from 'utils/createRedirectObject'
import { LOGIN_URL } from 'variables/global'
import { PageProps } from 'interfaces/global'

interface Values {
	text: string
}

const PageContent = () => {
	const { push } = useRouter()

	return (
		<Formik
			initialValues={{
				text: '',
			}}
			validate={values => {
				const errors: Partial<Values> = {}
				if (!values.text) {
					errors.text = 'Required'
				}
				return errors
			}}
			onSubmit={({ text }) => {
				const queryText = text.replace(/\s+/g, ' ').trim().replace(/\s+/g, '-')

				push(`/search/${queryText}`)
			}}
		>
			{({ submitForm, isSubmitting }) => (
				<Form>
					<Field component={TextField} name='text' type='text' label='Search user' />
					<br />
					<Button
						variant='contained'
						color='primary'
						disabled={isSubmitting}
						onClick={submitForm}
					>
						Search
					</Button>
				</Form>
			)}
		</Formik>
	)
}

const SearchPage = ({ id }: PageProps) => {
	return (
		<PageWrapper id={id}>
			<PageLayoutComponent Content={PageContent} />
		</PageWrapper>
	)
}

export default SearchPage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const token = getToken(req as Requset)

	const shouldRedirect = await shouldRedirectToAuth(token)

	if (shouldRedirect) return createRedirectObject(LOGIN_URL)

	const { id } = decodeToken(token)

	return { props: { id } }
}
