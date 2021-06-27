import { login, UserIDState } from 'redux/slices/userSlice'

import { useAppDispatch } from './hooks'

const useStoreID = (id: UserIDState) => useAppDispatch()(login(id))

export default useStoreID
