import React from 'react'
import PropTypes from 'prop-types'
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

DarkModeThemeProvider.propTypes = {
	children: PropTypes.node.isRequired,
}

export default DarkModeThemeProvider
