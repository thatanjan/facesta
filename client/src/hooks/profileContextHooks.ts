import { useContext } from 'react'
import { ProfileContext } from 'context/profileContext'

const useProfileContext = () => useContext(ProfileContext)

export const useIsSelf = () => useProfileContext().state.isSelf

export const useProfileUserID = () => useProfileContext().state.profileUserID
