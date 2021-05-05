import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

const darkTheme = responsiveFontSizes(
	createMuiTheme({
		palette: {
			type: 'dark',
			primary: {
				light: '#df6843',
				main: '#d84315',
				dark: '#972e0e',
			},
			secondary: {
				light: '#015f92',
				main: '#0288d1',
				dark: '#349fda',
			},
			background: {
				paper: '#171717',
			},
		},
	})
)

export default darkTheme
