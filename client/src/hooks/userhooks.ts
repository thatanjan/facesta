import { useContext } from 'react'
import { UserContext } from 'context/UserContext'
import { useAppSelector } from 'redux/hooks/hooks'

export const useOwnUserId = () => useAppSelector(state => state.user.id)

export const useHaveSeenFeedOnce = () => {
	const { haveSeenFeedOnce, setHaveSeenFeedOnce } = useContext(UserContext)

	return { haveSeenFeedOnce, setHaveSeenFeedOnce }
}
