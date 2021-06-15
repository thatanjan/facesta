import { Theme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useSmallerThanXS = () =>
	useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'))

export default useSmallerThanXS
