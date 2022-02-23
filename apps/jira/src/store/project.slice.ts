import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '.'

interface State {
    drawerVisible: boolean
}

const initialState: State = {
    drawerVisible: false
}

export const projectListSlice = createSlice({
    name: 'projectListSlice',
    initialState,
    reducers: {
        showDrawer: state => {
            state.drawerVisible = true
        },
        hideDrawer: state => {
            state.drawerVisible = false
        }
    }
})

const {
    actions: { showDrawer, hideDrawer }
} = projectListSlice
export { showDrawer as showProjectDrawer, hideDrawer as hideProjectDrawer }

export const selectProjectDrawerVisible = (state: RootState) =>
    state.projectList.drawerVisible
