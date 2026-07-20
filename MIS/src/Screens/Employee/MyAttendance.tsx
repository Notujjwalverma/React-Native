import React, { useMemo, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native'
import { useSelector } from 'react-redux'

import Navbar from '../../components/Navbar'
import Dropdown from '../../components/Inputs/customDropdown'
import { RootState } from '../../redux/store/store'

export default function MyAttendance() {
    const employee = useSelector(
        (state: RootState) => state.employee.employee
    )

    const attendanceLogs =
        employee.attendanceDetails?.attendanceLogs || []

    const joiningDate = new Date(
        employee.profileDetails.basicDetails.joiningDate
    )

    const today = new Date()

    const attendanceMonthOptions = useMemo(() => {
        const options = []

        const currentDate = new Date(joiningDate)

        while (currentDate <= today) {
            options.push({
                label: currentDate.toLocaleString('default', {
                    month: 'long',
                    year: 'numeric',
                }),
                value: `${currentDate.getFullYear()}-${currentDate.getMonth()}`,
            })

            currentDate.setMonth(
                currentDate.getMonth() + 1
            )
        }

        return options.reverse()
    }, [])

    const [selectedMonth, setSelectedMonth] =
        useState(
            `${today.getFullYear()}-${today.getMonth()}`
        )

    const filteredAttendance = useMemo(() => {
        const [year, month] =
            selectedMonth.split('-')

        return attendanceLogs.filter((log: any) => {
            const date = new Date(log.date)

            return (
                date.getFullYear() === Number(year) &&
                date.getMonth() === Number(month)
            )
        })
    }, [attendanceLogs, selectedMonth])

    return (
        <View style={styles.screenContainer}>
            <Navbar />

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.heading}>
                    My Attendance
                </Text>

                <Text style={styles.subHeading}>
                    View your attendance records.
                </Text>

                <View style={{ marginBottom: 16 }}>
                    <Dropdown
                        options={attendanceMonthOptions}
                        value={selectedMonth}
                        onChange={(value) =>
                            setSelectedMonth(value)
                        }
                        placeholder="Select Month"
                    />
                </View>

                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>
                        Attendance Summary
                    </Text>

                    <Text style={styles.summaryValue}>
                        {filteredAttendance.length} Days Present
                    </Text>
                </View>

                {filteredAttendance.length === 0 ? (
                    <View style={styles.emptyCard}>
                        <Text style={styles.emptyText}>
                            No attendance records found.
                        </Text>
                    </View>
                ) : (
                    filteredAttendance.map(
                        (attendance: any, index: number) => (
                            <View
                                key={attendance.id ?? index}
                                style={styles.attendanceCard}
                            >
                                <View style={styles.row}>
                                    <Text style={styles.label}>
                                        Day
                                    </Text>
                                    <Text style={styles.value}>
                                        {attendance.day}
                                    </Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.label}>
                                        Date
                                    </Text>
                                    <Text style={styles.value}>
                                        {attendance.date}
                                    </Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.label}>
                                        In Time
                                    </Text>
                                    <Text style={styles.value}>
                                        {attendance.inTime}
                                    </Text>
                                </View>

                                <View style={styles.row}>
                                    <Text style={styles.label}>
                                        Out Time
                                    </Text>
                                    <Text style={styles.value}>
                                        {attendance.outTime}
                                    </Text>
                                </View>

                                <View
                                    style={[
                                        styles.row,
                                        styles.hoursRow,
                                    ]}
                                >
                                    <Text style={styles.hoursLabel}>
                                        Working Hours
                                    </Text>

                                    <Text style={styles.hoursValue}>
                                        {attendance.workingHours}
                                    </Text>
                                </View>
                            </View>
                        )
                    )
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#F9FEFF',
    },

    content: {
        padding: 16,
    },

    heading: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 4,
    },

    subHeading: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 16,
    },

    summaryCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,

        elevation: 2,
    },

    summaryTitle: {
        fontSize: 14,
        color: '#64748B',
    },

    summaryValue: {
        marginTop: 4,
        fontSize: 24,
        fontWeight: '700',
        color: '#0EA5E9',
    },

    attendanceCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,

        elevation: 2,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },

    label: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },

    value: {
        fontSize: 14,
        color: '#0F172A',
        fontWeight: '600',
    },

    hoursRow: {
        marginTop: 8,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
    },

    hoursLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0369A1',
    },

    hoursValue: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0EA5E9',
    },

    emptyCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
    },

    emptyText: {
        color: '#64748B',
        fontSize: 14,
    },
})