import useMediaQuery from '@material-ui/core/useMediaQuery'

import { screenSizeDrawer } from 'variables/global'

const useSmallerThanXS = () => useMediaQuery(screenSizeDrawer)

export default useSmallerThanXS
