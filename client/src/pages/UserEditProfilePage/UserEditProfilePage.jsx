import React, { Suspense, lazy } from 'react'
import PageLayoutComponent from 'HOC/PageLayoutComponent'

import EditProfileAccordion from 'components/EditProfileAccordion/EditProfileAccordion'

const UserEditProfilePage = () => {
	return (
		<>
			{/* <EditProfileAccordion /> */}
			<PageLayoutComponent Content={EditProfileAccordion}></PageLayoutComponent>
		</>
	)
}

export default UserEditProfilePage
