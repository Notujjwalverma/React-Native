import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react';
import { RootState } from '../../redux/store/store';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import { useNavigation } from '@react-navigation/native';

export default function LeaveBalance() {
    const navigation = useNavigation();
    const leaveDetails = useSelector((state: RootState) => state.employee.employee.leaveDetails);

    const renderFromArray = (arr: any[]) => (
        arr.map((item, idx) => (
            <View key={idx} style={styles.leaveSection}>
                <Text style={styles.leaveTitle}>{item.type || item.leaveType || `Leave ${idx + 1}`}</Text>
                <View style={styles.leaveValue}>
                    <Text style={styles.leaveType}>Total</Text>
                    <Text style={styles.leaveValueText}>{item.total ?? item.entitled ?? '-'}</Text>
                </View>
                <View style={styles.leaveValue}>
                    <Text style={styles.leaveType}>Used</Text>
                    <Text style={styles.leaveValueText}>{item.used ?? item.taken ?? '-'}</Text>
                </View>
                <View style={styles.leaveValue}>
                    <Text style={styles.leaveType}>Balance</Text>
                    <Text style={styles.leaveValueText}>{item.balance ?? item.remaining ?? '-'}</Text>
                </View>
            </View>
        ))
    );

    const renderFromObject = (obj: Record<string, any>) => (
        Object.entries(obj).map(([key, value]) => (
            <View key={key} style={styles.leaveSection}>
                <Text style={styles.leaveTitle}>{key == 'availableLeaves' ? 'Available Leaves' : key == 'leaveRequests' ? 'Leave Requests' : key}</Text>
                {typeof value === 'object' ? (
                    Object.entries(value).map(([k, v]) => (
                        <View style={styles.leaveValue} key={k}>
                            <Text style={styles.leaveType}>{k}</Text>
                            <Text style={styles.leaveValueText}>{String(v)}</Text>
                        </View>
                    ))
                ) : (
                    <View style={styles.leaveValue}>
                        <Text style={styles.leaveType}>Value</Text>
                        <Text style={styles.leaveValueText}>{String(value)}</Text>
                    </View>
                )}
            </View>
        ))
    );

    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <Navbar />

            <View style={styles.wrapper}>
                <Text style={styles.heading}>Leave Balance</Text>

                {leaveDetails ? (
                    Array.isArray(leaveDetails) ? renderFromArray(leaveDetails) : renderFromObject(leaveDetails)
                ) : (
                    <View style={styles.leaveSection}>
                        <Text style={styles.leaveTitle}>No leave data available</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        margin: 20,
        color: '#0F172A',
        marginBottom: 20
    },
    actionButton: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginBottom: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'rgba(203, 213, 225, 0.7)',
    },
    actionButtonText: {
        fontSize: 14,
        color: '#334155',
    },
    leaveSection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 20,
        marginHorizontal: 16,

        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    leaveItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    leaveTitle: {
        fontSize: 16,
        marginBottom: 14,
    },
    leaveType: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '600',
    },
    leaveValue: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
})