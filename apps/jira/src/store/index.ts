import { configureStore } from '@reduxjs/toolkit'

import { authSlice } from './auth.slice'
import { projectListSlice } from './project.slice'

export const rootReducer = {
    auth: authSlice.reducer,
    projectList: projectListSlice.reducer
}

export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
