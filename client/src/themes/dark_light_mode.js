import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
	},
})

// const lightTheme = create

export const DarkModeThemeProvider = ({ children }) => {
	return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
}

export default DarkModeThemeProvider
