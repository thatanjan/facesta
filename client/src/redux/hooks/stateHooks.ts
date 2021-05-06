import { useAppSelector } from './hooks'

export const useUserID = () => useAppSelector(state => state.user.id)

export const useProfileUserID = () =>
	useAppSelector(state => state.profile.profileUserID)

export const useIsSelf = () => useAppSelector(state => state.profile.isSelf)
