import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import Entypo from '@expo/vector-icons/Entypo';

type Request = {
  id: number
  type: string
  startDate: string
  endDate?: string
  status?: string
  approver?: string
  contact?: string
}

export default function LeaveDetails({ request }: { request: Request }) {
  const [expanded, setExpanded] = useState(false)

  const title = request.type === 'wfh' ? 'WFH' : request.type === 'compoff' ? 'CompOff' : request.type === 'halfday' ? 'Half Day' : 'Leave'
  const leaveType = request.type === 'wfh' ? 'Work From Home' : request.type === 'compoff' ? 'CompOff' : request.type === 'halfday' ? 'Half Day' : 'Leave'
  const dates = request.endDate ? `${request.startDate} to ${request.endDate}` : request.startDate
  const statusIcon = request.status === 'Approved' ? 'checkmark-circle' : request.status === 'Rejected' ? 'close-circle' : 'time'
  const statusStyle = request.status === 'Approved' ? styles.confirmStatus : request.status === 'Rejected' ? styles.rejectStatus : styles.pendingStatus
  const gradientColors = request.status === 'Approved'
    ? ['rgba(22, 163, 74, 0.16)', 'rgba(22, 163, 74, 0.05)']
    : request.status === 'Rejected'
    ? ['rgba(220, 38, 38, 0.16)', 'rgba(220, 38, 38, 0.05)']
    : ['rgba(217, 119, 6, 0.16)', 'rgba(217, 119, 6, 0.05)']

  return (
    <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.leaveCard}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Pressable onPress={() => setExpanded((p) => !p)}>
          <Entypo style={{opacity: 0.7}} name={expanded ? "chevron-up" : "chevron-down"} size={24} color="black" />
        </Pressable>
      </View>

      <Text style={styles.cardSubtitle}>Leave Type: {leaveType}</Text>
      <Text style={styles.cardSubtitle}>Dates: {dates}</Text>
      <View style={[styles.statusWrapper, statusStyle]}>
        <Ionicons name={statusIcon} size={14} color="#FFFFFF" style={styles.statusIcon} />
        <Text style={styles.statusText}>{request.status}</Text>
      </View>

      {expanded && (
        <View style={styles.expandedSection}>
          <Text style={styles.cardSubtitle}>Approver: {request.approver}</Text>
          <Text style={styles.cardSubtitle}>Contact: {request.contact}</Text>
        </View>
      )}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  leaveCard: { borderRadius: 10, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: 'brown', marginBottom: 4 },
  cardSubtitle: { fontSize: 12, color: '#64748B', marginBottom: 2 },
  statusWrapper: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 10, marginTop: 8, alignSelf: 'flex-start' },
  statusIcon: { marginRight: 6 },
  statusText: { fontSize: 12, color: '#FFFFFF' },
  confirmStatus: { backgroundColor: 'rgba(22, 163, 74, 0.8)' },
  rejectStatus: { backgroundColor: 'rgba(220, 38, 38, 0.8)' },
  pendingStatus: { backgroundColor: 'rgba(217, 119, 6, 0.8)' },
  expandedSection: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#E2E8F0', },
})
