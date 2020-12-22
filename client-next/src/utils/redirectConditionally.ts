import { RedirectLogin } from 'interfaces/authentication'

const redirectConditionally = ({
	successful,
	redirect,
	path,
}: RedirectLogin): boolean => {
	if (successful) {
		redirect(path || '/')
		return true
	}

	return false
}

export default redirectConditionally
