import React from 'react'
import {
	createMuiTheme,
	responsiveFontSizes,
	ThemeProvider,
} from '@material-ui/core/styles'

let darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
	},
})

darkTheme = responsiveFontSizes(darkTheme)

export const DarkModeThemeProvider = ({ children }) => {
	return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
}

export default DarkModeThemeProvider
