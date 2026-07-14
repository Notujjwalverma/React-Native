import React, { useMemo, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native'
import Navbar from '../../components/Navbar'
import Table from '../../components/Table/Table'
import Dropdown from '../../components/Inputs/customDropdown'
import Message from '../../components/Popups/Message'
import LeaveDetails from '../../components/LeaveDetails'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'

type RequestType = 'leave' | 'wfh' | 'compoff' | 'halfday'

const options: { id: RequestType | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'leave', label: 'Leave' },
  { id: 'wfh', label: 'WFH' },
  { id: 'compoff', label: 'CompOff' },
]

export default function LeaveRequestStatus() {
  const [filter, setFilter] = useState<RequestType | 'all'>('all')
  const [message, setMessage] = useState<null | { type: string; title?: string; text: string }>(null)
  const employee = useSelector((state: RootState) => state.employee.employee)
  const mockRequests = employee.leaveDetails.leaveRequests
  

  const data = useMemo(() => {
    return mockRequests
      .filter((r) => (filter === 'all' ? true : r.type === filter))
      .map((r) => ({
        ...r,
        typeLabel: r.type === 'wfh' ? 'WFH' : r.type === 'compoff' ? 'CompOff' : r.type === 'halfday' ? 'Half Day' : 'Leave',
        dates: r.endDate ? `${r.startDate} - ${r.endDate}` : r.startDate,
      }))
  }, [filter])

  const columns = [
    { key: 'id', title: 'ID', width: 70, sortable: true },
    { key: 'typeLabel', title: 'Type', width: 120, sortable: true },
    { key: 'dates', title: 'Dates', width: 200 },
    { key: 'status', title: 'Status', width: 120, sortable: true },
    { key: 'approver', title: 'Approver', width: 140, sortable: true },
    { key: 'contact', title: 'Contact', width: 140 },
    {
      key: 'action',
      title: 'Action',
      width: 120,
      render: (row: any) => (
        <Pressable
          onPress={() => setMessage({ type: 'info', title: 'Request Selected', text: `Selected request #${row.id}` })}
          style={({ pressed }) => [{ paddingVertical: 6, paddingHorizontal: 10, backgroundColor: '#E0F2FE', borderRadius: 6, opacity: pressed ? 0.85 : 1 }]}
        >
          <Text style={{ color: '#0369A1', fontWeight: '700' }}>View</Text>
        </Pressable>
      ),
    },
  ]

  return (
    <View style={styles.screenContainer}>
      <Navbar />
      <Message type={message?.type as any ?? 'info'} title={message?.title} message={message?.text ?? ''} isVisible={!!message} onClose={() => setMessage(null)} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Leave Requests</Text>
        <Text style={styles.subHeading}>View and filter leave requests by type.</Text>

        <View style={{ marginBottom: 12 }}>
          <Dropdown
            options={options.map((o) => ({ label: o.label, value: String(o.id) }))}
            value={String(filter)}
            onChange={(val) => setFilter(val as any)}
            placeholder="Filter requests"
            style={{ minWidth: 180 }}
          />
        </View>
        {data.map((r) => (
          <LeaveDetails key={r.id} request={r} />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: '#F9FEFF' },
  content: { paddingHorizontal: 16, paddingVertical: 16 },
  heading: { fontSize: 24, fontWeight: '700', color: 'rgba(0, 0, 0, 0.7)', marginBottom: 4 },
  subHeading: { fontSize: 14, color: '#64748B', marginBottom: 16 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 12 },
  filterCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, padding: 12, width: '30%', marginBottom: 12, alignItems: 'center' },
  filterCardActive: { backgroundColor: '#0EA5E9', borderColor: '#0EA5E9' },
  filterCardPressed: { opacity: 0.85 },
  filterLabel: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  filterLabelActive: { color: '#FFFFFF' },
  tableWrapper: { marginTop: 8 },
  leaveCard: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  cardSubtitle: { fontSize: 12, color: '#64748B', marginBottom: 2 },
  expandedSection: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
})
