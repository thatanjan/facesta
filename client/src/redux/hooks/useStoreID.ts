import { login } from 'redux/slices/userSlice'

import { useAppDispatch } from './hooks'

const useStoreID = (id: string) => useAppDispatch()(login(id))

export default useStoreID
