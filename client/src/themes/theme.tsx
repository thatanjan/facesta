import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

const darkTheme = responsiveFontSizes(
	createMuiTheme({
		palette: {
			type: 'dark',
		},
	})
)
export const lightTheme = createMuiTheme({
	palette: {
		type: 'light',
	},
})

export default darkTheme
