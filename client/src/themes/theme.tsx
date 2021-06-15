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

darkTheme.typography.h6 = {
	...darkTheme.typography.h6,
	[darkTheme.breakpoints.down('xs')]: {
		fontSize: '1rem',
	},
}

darkTheme.typography.h4 = {
	...darkTheme.typography.h4,
	[darkTheme.breakpoints.down('xs')]: {
		fontSize: '1.3rem',
	},
}

darkTheme.typography.body1 = {
	...darkTheme.typography.body1,
	[darkTheme.breakpoints.down('xs')]: {
		fontSize: darkTheme.typography.body2.fontSize,
	},
}

darkTheme.typography.body2 = {
	...darkTheme.typography.body2,
	[darkTheme.breakpoints.down('xs')]: {
		fontSize: darkTheme.typography.caption.fontSize,
	},
}

export default darkTheme
