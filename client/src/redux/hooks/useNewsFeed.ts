import { useAppSelector, useAppDispatch } from './hooks'
import { mutateNewsFeed, mutateAllPost } from '../slices/newsFeedSlice'

export const useMutateNewsFeed = () => {
	const dispatch = useAppDispatch()
	return () => dispatch(mutateNewsFeed())
}

export const useShouldMutateNewsFeed = () => {
	// eslint-disable-next-line no-shadow
	const { mutateNewsFeed } = useAppSelector(state => state.newsfeed)
	return mutateNewsFeed
}

export const useShouldMutateAllPost = () => {
	// eslint-disable-next-line no-shadow
	const { mutateAllPost } = useAppSelector(state => state.newsfeed)
	return mutateAllPost
}

export const useMutateAllPost = () => {
	const dispatch = useAppDispatch()
	return () => dispatch(mutateAllPost())
}
