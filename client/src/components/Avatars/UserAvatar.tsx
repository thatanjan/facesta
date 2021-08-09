import React from 'react'
import Avatar from '@material-ui/core/Avatar'

import MuiLink from 'components/Links/MuiLink'

interface Props {
	imageID: string
	href: string
	alt?: string
}

const UserAvatar = ({ href, imageID, alt }: Props) => {
	const url = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/q_40,ar_1.0,c_fill,w_50,g_face/r_max/${imageID}.webp`

	return <MuiLink MuiComponent={Avatar} src={url} href={href} alt={alt || ''} />
}

export default UserAvatar
