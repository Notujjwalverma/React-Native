import { Text, View, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'
import Navbar from '../../components/Navbar'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'

export default function Profile() {
  const employee = useSelector((state: RootState) => state.employee.employee)
  const employeeProfileDetail = employee.profileDetails

  const renderSection = (title: string, details: Record<string, string | null>) => {
    const entries = Object.entries(details)
    if (!entries.length) {
      return null
    }

    return (
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {entries.map(([key, value]) => (
          <View key={key} style={styles.detailRow}>
            <Text style={styles.detailLabel}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase())}:</Text>
            <Text style={styles.detailValue}>{value ?? 'Not available'}</Text>
          </View>
        ))}
      </View>
    )
  }

  return (
    <View style={styles.screenContainer}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.pageTitle}>Employee Profile</Text>
          <Text style={styles.pageSubtitle}>A complete view of your employee details</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: 'https://img.freepik.com/premium-photo/indian-bank-employee-smiling-camera-with-welcoming-gesture_1101231-6591.jpg?w=360' }}
              style={styles.profileImage}
            />
            <View style={styles.profileMeta}>
              <Text style={styles.profileName}>{employeeProfileDetail.basicDetails.name}</Text>
              <Text style={styles.profileSubtitle}>{employeeProfileDetail.basicDetails.designation}</Text>
              <Text style={styles.profileText}>{employeeProfileDetail.basicDetails.email}</Text>
              <Text style={styles.profileText}>{employeeProfileDetail.basicDetails.contactNo}</Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Employee ID</Text>
              <Text style={styles.summaryValue}>{employeeProfileDetail.basicDetails.employeeId}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Joining Date</Text>
              <Text style={styles.summaryValue}>{employeeProfileDetail.professionalDetails.dateOfJoining}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Location</Text>
              <Text style={styles.summaryValue}>{employeeProfileDetail.professionalDetails.location}</Text>
            </View>
          </View>
        </View>

        {renderSection('Basic Details', employeeProfileDetail.basicDetails)}
        {renderSection('Professional Details', employeeProfileDetail.professionalDetails)}
        {renderSection('Engineering Council Details', employeeProfileDetail.engineeringCouncilDetails)}
        {renderSection('Delivery Council Details', employeeProfileDetail.deliveryCouncilDetails)}
        {renderSection('Reportees', employeeProfileDetail.reportees)}
        {renderSection('Career Details', employeeProfileDetail.careerDetail)}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#F8FAFC',
  },
  headerRow: {
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 28,
    color: '#0F172A',
    marginBottom: 6,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 98,
    height: 98,
    borderRadius: 24,
    marginRight: 18,
    backgroundColor: '#E2E8F0',
  },
  profileMeta: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    color: '#0F172A',
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '700',
    marginBottom: 10,
  },
  profileText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 20,
  },
  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
  },
  summaryItem: {
    flex: 1,
    marginRight: 12,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  detailLabel: {
    flex: 1,
    fontSize: 13,
    color: '#64748B',
    marginRight: 12,
  },
  detailValue: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '600',
    textAlign: 'right',
  },
})