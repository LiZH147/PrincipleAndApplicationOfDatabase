import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, shallowEqual, useDispatch, useSelector } from 'react-redux'

import userinfoSlice from "./modules/userinfo";

const store = configureStore({
  reducer: {
    userinfo: userinfoSlice
  }
})

type GetStateFnType = typeof store.getState
export type IRootState = ReturnType<GetStateFnType>
type DispatchType = typeof store.dispatch

// useAppSelector的hook
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector

export const useAppDispatch: () => DispatchType = useDispatch

export const shallowEqualApp = shallowEqual;

export default store
