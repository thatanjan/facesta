import { useAppSelector, useAppDispatch } from './hooks'
import { mutateNewsFeed } from '../slices/newsFeedSlice'

export const useMutateNewsFeed = () => {
	const dispatch = useAppDispatch()
	return () => dispatch(mutateNewsFeed())
}

export const useShouldMutateNewsFeed = () => {
	const { mutateNewsFeed } = useAppSelector(state => state.newsfeed)
	return mutateNewsFeed
}
