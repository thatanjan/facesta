import { useAppSelector } from './hooks'

export const useUserID = useAppSelector(state => state.user.id)

export const useProfileUserID = useAppSelector(
	state => state.profile.profileUserID
)
