import { createSlice } from '@reduxjs/toolkit'
import { mockOrganization } from '../../../data/mockOrganization'

const organizationSlice = createSlice({
  name: 'organization',
  initialState: {
    organization: mockOrganization,
  },
  reducers: {
    setOrganization(state, action) {
      state.organization = action.payload
    },
  },
})

export const { setOrganization } = organizationSlice.actions
export default organizationSlice.reducer
