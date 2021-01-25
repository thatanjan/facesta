import serverRedirect from './serverRedirect'

interface Redirect {
	writeHead: Function
	end: Function
}

const homeUrl = '/'
export const LOGIN: string = `/authentication/login`

export const redirectToAuth = (res: Redirect) => serverRedirect(res, LOGIN)

export const redirectToHome = (res: Redirect) => serverRedirect(res, homeUrl)
