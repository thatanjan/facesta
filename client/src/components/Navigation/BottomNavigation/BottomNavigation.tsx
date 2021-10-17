import React from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { nanoid } from 'nanoid'

import CreatePostModal from 'components/Post/CreatePost/CreatePostModal'

import { useGetNewsFeedPost } from 'hooks/useGetPost'

import { useAppDispatch, useAppSelector } from 'redux/hooks/hooks'
import { openPostModal } from 'redux/slices/createPost'
import { useUserID } from 'redux/hooks/stateHooks'

import navigationItems, {
	NavigationItem,
	HOME,
	SEARCH,
	ADD,
} from './BottomNavigationData'

const useStyles = makeStyles({
	root: {
		width: '100%',
		position: 'fixed',
		bottom: 0,
	},
})

export default function LabelBottomNavigation() {
	const { mutate } = useGetNewsFeedPost()
	const { push, asPath } = useRouter()
	const userID = useUserID()

	const dispatch = useAppDispatch()
	const isPostModalOpen = useAppSelector(state => state.createPost.postModal)

	const { root } = useStyles()
	const [value, setValue] = React.useState(asPath.substring(1) || HOME)

	const handleChange = (_: React.ChangeEvent<{}>, newValue: string) => {
		setValue(newValue)
	}

	// eslint-disable-next-line
	const handleClick = (routeName: string) => {
		switch (routeName) {
			case HOME:
				mutate()
				return push('/')

			case SEARCH:
				return push(`/${SEARCH}`)

			case ADD:
				dispatch(openPostModal())

				break

			default:
				return push(`/profile/${userID}`)
		}
	}

	return (
		<BottomNavigation value={value} onChange={handleChange} className={root}>
			{navigationItems.map(({ icon: Icon, ...props }: NavigationItem) => (
				<BottomNavigationAction
					key={nanoid()}
					{...props}
					icon={<Icon fontSize='small' />}
					onClick={() => handleClick(props.value)}
				/>
			))}
			{isPostModalOpen && <CreatePostModal />}
		</BottomNavigation>
	)
}
