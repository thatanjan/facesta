import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

export const darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
	},
})

export const DarkModeThemeProvider = ({ children }) => {
	return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
}

export default DarkModeThemeProvider
