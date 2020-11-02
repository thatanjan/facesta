import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

export const modeTheme = (darkMode) => {
	const theme = createMuiTheme({
		palette: {
			type: darkMode ? 'dark' : 'light',
		},
	})

	return theme
}

export const DarkLightModeThemeProvider = ({ theme, children }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default DarkLightModeThemeProvider
