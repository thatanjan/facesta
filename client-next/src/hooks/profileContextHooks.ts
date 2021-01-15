import { useContext } from 'react'
import { ProfileContext } from 'context/profileContext'

const useProfileContext = () => useContext(ProfileContext)

// eslint-disable-next-line
export const useIsSelf = () => useProfileContext().state.isSelf
