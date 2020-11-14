import React from 'react'

import PrivateRoutes from 'routes/PrivateRoutes'
import PrivateAuthRoutes from 'routes/PrivateAuthRoutes'

const App = () => {
	return (
		<>
			<PrivateRoutes />
			<PrivateAuthRoutes />
		</>
	)
}

export default App
