import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from './slices/employeeSlice'
import organizationReducer from './slices/organizationSlice'

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    organization: organizationReducer,
  },
})

export type RootState = ReturnType<
  typeof store.getState
>

export type AppDispatch =
  typeof store.dispatch