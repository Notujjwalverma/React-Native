import { Text, View, StyleSheet, ScrollView, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Navbar from '../../components/Navbar'
import ScrollingMarquee from '../../components/ScrollingMarquee'
import LeftDrawer from '../../components/LeftDrawer'
import Calendar from '../../components/Calendar'
import button from '../../components/Buttons/Button'
import Button from '../../components/Buttons/Button'

export default function Dashboard() {
  // Mock employee data - replace with actual data from Firebase/API
  const [employeeData] = useState({
    name: 'Ujjwal Anand',
    employeeId: 'GSI GI 0001',
    designation: 'Software Developer trainee',
    officeLocation: 'Canaan Tower, Gurgaon',
    joiningDate: '25 Mar 2026',
    profileImage: 'https://img.freepik.com/premium-photo/indian-bank-employee-smiling-camera-with-welcoming-gesture_1101231-6591.jpg?w=2000',
  })
  const navigation = useNavigation<any>()
  

  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <View style={styles.screenContainer}>
      <Navbar onMenuPress={() => setDrawerOpen(true)} />
      <LeftDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <ScrollingMarquee 
        text="Welcome to MIS Portal! Check your daily updates and manage your tasks efficiently." 
        speed={20}
      />
      <ScrollView style={styles.container}>
      {/* Profile Card Section */}
      <View style={styles.profileCardWrapper}>
        <View style={styles.profileCard}>
          {/* Profile Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: employeeData.profileImage }}
              style={styles.profileImage}
            />
            <Text style={styles.employeeName}>{employeeData.name}</Text>
          </View>

          {/* Employee Info */}
          <View style={styles.infoSection}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Employee Code</Text>
              <Text style={styles.detailValue}>{employeeData.employeeId}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Designation</Text>
              <Text style={styles.detailValue}>{employeeData.designation}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Office Location</Text>
              <Text style={styles.detailValue}>{employeeData.officeLocation}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Joining Date</Text>
              <Text style={styles.detailValue}>{employeeData.joiningDate}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>9:00</Text>
          <Text style={styles.statLabel}>In-Time</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>5:00</Text>
          <Text style={styles.statLabel}>Out-Time</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>08:00</Text>
          <Text style={styles.statLabel}>Working Hours</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>08:20</Text>
          <Text style={styles.statLabel}>Yesterday Working Hours</Text>
        </View>
      </View>

      <View >
        <Calendar />
      </View>

      <View style={styles.activitySection}>
        <Button label="View Activities" />
      </View>

    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F9FEFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FEFF',
    paddingTop: 8,
  },
  profileCardWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(203, 213, 225, 0.7)',
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    marginRight: 20,
    position: 'relative',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#E2E8F0',
  },
  infoSection: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  employeeName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  detailRow: {
    alignItems: 'flex-start',
    paddingVertical: 5,
  },
  detailLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '600',
  },
  statsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(203, 213, 225, 0.7)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0EA5E9',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    textAlign: 'center',
  },
  quickActionsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
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
  actionButtonSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(203, 213, 225, 0.7)',
  },
  actionButtonPressed: {
    opacity: 0.85,
  },
  actionButtonText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    textAlign: 'left',
  },
  actionButtonTextSecondary: {
    color: '#0F172A',
  },
  actionButtonArrow: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 8,
  },
  actionContainer: {
    width: '100%',
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(203, 213, 225, 0.7)',
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  dropdownItemLast: {
    borderBottomWidth: 0,
  },
  dropdownItemText: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '600',
  },
  activitySection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0EA5E9',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '400',
  },
  calendarContainer: {
    paddingHorizontal: 16,
    marginBottom: 24, 
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
      borderWidth: 1,
    borderColor: 'rgba(203, 213, 225, 0.7)',
  },
})