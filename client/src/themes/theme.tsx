import { createMuiTheme } from '@material-ui/core/styles'

const darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
	},
})

export const lightTheme = createMuiTheme({
	palette: {
		type: 'light',
	},
})

export default darkTheme
