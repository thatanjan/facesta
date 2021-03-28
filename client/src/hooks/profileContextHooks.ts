import { useContext } from 'react'
import { ProfileContext } from 'context/profileContext'
import { PostUser } from 'interfaces/post'

const useProfileContext = () => useContext(ProfileContext)

export const useIsSelf = () => useProfileContext().state.isSelf

export const useProfileUserID = () => useProfileContext().state.profileUserID

export const useNameImageID = (): PostUser => {
	const { name, profilePicture, profileUserID } = useProfileContext().state

	return {
		name,
		_id: profileUserID,
		profile: { profilePicture },
	}
}
