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
        addSkill(state, action) {
            state.employee.profileDetails.skills.push(
                action.payload
            );
        },
        updateOptionalHolidays(state, action) { 
            state.employee.optionalUserHolidays = action.payload;
        },

        // UPDATE SKILL
        updateSkill(state, action) {
            const { id, updatedSkill } = action.payload;
            const skillIndex =
                state.employee.profileDetails.skills.findIndex(
                    skill => skill.id === id
                );

            if (skillIndex !== -1) {
                state.employee.profileDetails.skills[
                    skillIndex
                ] = {
                    ...state.employee.profileDetails.skills[
                    skillIndex
                    ],
                    ...updatedSkill,
                    updatedOn: new Date()
                        .toISOString()
                        .split('T')[0],
                };
            }
        },
    },
})

export const {
    setEmployee,
    updateLeaveBalance,
    addLeaveRequest,
    addSkill,
    updateOptionalHolidays,
    updateSkill
} = employeeSlice.actions

export default employeeSlice.reducer