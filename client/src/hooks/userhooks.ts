import { useContext } from 'react'
import { UserContext } from 'context/UserContext'

export const useOwnUserId = () => useContext(UserContext).userID

export const useSetUser = () => {
	const { setUserID } = useContext(UserContext)

	return setUserID
}

export const useHaveSeenFeedOnce = () => {
	const { haveSeenFeedOnce, setHaveSeenFeedOnce } = useContext(UserContext)

	return { haveSeenFeedOnce, setHaveSeenFeedOnce }
}
