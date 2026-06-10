import { createSlice } from '@reduxjs/toolkit'
import { mockEmployee } from '../../../data/mockEmployee'
const employeeSlice = createSlice({
    name: 'employee',

    initialState: {
        employee: mockEmployee,
        loading: false,
        error: null,
    },

    reducers: {
        setEmployee(state, action) {
            state.employee = action.payload
        },

        updateLeaveBalance(state, action) {
            state.employee.leaveDetails.availableLeaves =
                action.payload
        },
        addLeaveRequest(state, action) {
            state.employee.leaveDetails.leaveRequests.push(
                action.payload
            )
        },
    },
})

export const {
    setEmployee,
    updateLeaveBalance,
    addLeaveRequest,
} = employeeSlice.actions

export default employeeSlice.reducer