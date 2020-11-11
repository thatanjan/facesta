import SvgIcon from '@material-ui/core/SvgIcon'

const SvgSupport = component => {
	return props => (
		<SvgIcon viewBox='0 0 600 476.6' component={component} {...props} />
	)
}

export default SvgSupport
