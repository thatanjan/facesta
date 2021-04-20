import { useAppSelector } from 'redux/hooks/hooks'

export const useOwnUserId = () => useAppSelector(state => state.user.id)
