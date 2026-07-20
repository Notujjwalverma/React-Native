import { Text, View, StyleSheet, ScrollView, Image, Pressable, ImageStyle } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Navbar from '../components/Navbar'
import LeftDrawer from '../components/LeftDrawer'
import Calendar from '../components/Calendar'
import Button from '../components/Buttons/Button'
import Dropdown from '../components/Inputs/customDropdown'
import Table from '../components/Table/Table'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store/store'
import LeaveRequestStatus from './Leave Management/LeaveRequestStatus'
import GridMenu from '../components/Menu/GridMenu'
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons'
import Ionicons from '@expo/vector-icons/build/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function Dashboard() {
  const navigation = useNavigation<any>()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const employeeData = useSelector((state: RootState) => state.employee.employee)

  const availableLeaves = useSelector((state: RootState) => state.employee.employee.leaveDetails.availableLeaves)

  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening'
  const greetingSubtitle = currentHour < 12
    ? 'A fresh start and a productive day ahead.'
    : currentHour < 17
      ? 'Hope your day is going smoothly.'
      : 'Winding down with a calm evening.'
  const employeeName = employeeData?.profileDetails?.basicDetails?.name?.split(' ')[0] || 'there'

  const dashboardOptions = [
    { label: 'Attendance', icon: '' },
    { label: 'Leave Balance', icon: '' },
    { label: 'Holidays', icon: '' },
    { label: 'My Skills', icon: '' },
    { label: 'Birthdays', icon: '' },
    { label: 'Simulation and Phising data', icon: '' },
    { label: 'Work Anniversary', icon: '' },
    { label: 'Team Leaves', icon: '' },
    { label: 'Referrals', icon: '' },
    { label: 'My Referrals', icon: '' },
    { label: 'My Assets', icon: '' },
  ]

  return (
    <View style={styles.screenContainer}>
      <Navbar onMenuPress={() => setDrawerOpen(true)} />
      <LeftDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <ScrollView style={styles.container}>
        {/* Profile Card Section */}
        <View style={styles.profileCardWrapper}>
          <View style={styles.profileCard}>
            {/* Header Background */}
            <View style={styles.cardHeader}></View>

            {/* Profile Content */}
            <View style={styles.cardContent}>
              <View style={styles.imageContainer}>
                <View style={styles.salutationContent}>
                  <Text style={styles.salutationText}>
                    {greeting}, {employeeName}
                  </Text>
                  <Text style={styles.salutationSubtitle}>{greetingSubtitle}</Text>
                </View>
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: employeeData.profileDetails.profilePicture }}
                    style={styles.profileImage}
                  />
                </View>
              </View>

              <View style={styles.infoSection}>
                <View style={styles.detailRow}>
                  <MaterialCommunityIcons
                    name="badge-account-outline"
                    size={16}
                    color="#349fa2"
                    style={styles.detailIcon}
                  />
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>Employee Code</Text>
                    <Text style={styles.detailValue}>{employeeData.profileDetails.basicDetails.employeeId}</Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <MaterialCommunityIcons
                    name="briefcase-outline"
                    size={16}
                    color="#349fa2"
                    style={styles.detailIcon}
                  />
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailLabel}>Designation</Text>
                    <Text style={styles.detailValue}>{employeeData.profileDetails.basicDetails.designation}</Text>
                  </View>
                </View>

              </View>
            </View>
          </View>
          {/* Quick Stats Section */}
          <Text style={styles.activityHeader}>My activity</Text>
          <View style={styles.statsSection}>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <MaterialCommunityIcons
                  name="login"
                  size={24}
                  color="#349fa2"
                />
              </View>
              <Text style={styles.statNumber}>9:00</Text>
              <Text style={styles.statLabel}>In-Time</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <MaterialCommunityIcons
                  name="logout"
                  size={24}
                  color="#349fa2"
                />
              </View>
              <Text style={styles.statNumber}>5:00</Text>
              <Text style={styles.statLabel}>Out-Time</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={24}
                  color="#349fa2"
                />
              </View>
              <Text style={styles.statNumber}>08:00</Text>
              <Text style={styles.statLabel}>Today's Working Hours</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={24}
                  color="#349fa2"
                />
              </View>
              <Text style={styles.statNumber}>08:20</Text>
              <Text style={styles.statLabel}>Yesterday working hours</Text>
            </View>
          </View>

        </View>

        <View style={styles.BottomSection}>

          <View style={styles.GridMenu}>
            <GridMenu
              title="About Me"
              columns={4}
              items={[
                {
                  id: '1',
                  title: 'My Profile',
                  icon: (
                    <MaterialCommunityIcons
                      name="account-circle-outline"
                      size={28}
                      color="#349fa2"
                    />
                  ),
                  onPress: () =>
                    navigation.navigate('Profile'),
                },
                {
                  id: '2',
                  title: 'Skills',
                  icon: (
                    <MaterialCommunityIcons
                      name="school-outline"
                      size={28}
                      color="#349fa2"
                    />
                  ),
                  onPress: () =>
                    navigation.navigate('Employee_skills'),
                },
                {
                  id: '3',
                  title: 'My Assets',
                  icon: (
                    <MaterialCommunityIcons
                      name="laptop-account"
                      size={28}
                      color="#349fa2"
                    />
                  ),
                  onPress: () => { navigation.navigate('MyAssets') },
                },
                {
                  id: '4',
                  title: 'My Referrals',
                  icon: (
                    <MaterialCommunityIcons
                      name="laptop-account"
                      size={28}
                      color="#349fa2"
                    />
                  ),
                  onPress: () => { navigation.navigate('Employee_myReferrals') },
                },

              ]}
            />
          </View>
          <View style={styles.GridMenu}>
            <GridMenu
              title="Attendance"
              columns={4}
              items={[
                {
                  id: '1',
                  title: 'Attendance',
                  icon: (
                    <MaterialIcons
                      name="event-note"
                      size={28}
                      color="#349fa2"
                    />
                  ),
                  onPress: () =>
                    navigation.navigate('Employee_myAttendance'),
                },
                {
                  id: '2',
                  title: 'Holidays',
                  icon: (
                    <MaterialIcons
                      name="assignment"
                      size={28}
                      color="#349fa2"
                    />
                  ),
                  onPress: () =>
                    navigation.navigate('Holidays'),
                },
                {
                  id: '3',
                  title: 'Calendar',
                  icon: (
                    <Ionicons
                      name="calendar-outline"
                      size={28}
                      color="#349fa2"
                    />
                  ),
                  onPress: () => { navigation.navigate('Employee_myAttendance') },
                },
                {
                  id: '4',
                  title: 'Leave Balance',
                  icon: (
                    <MaterialCommunityIcons
                      name="calendar-clock"
                      size={28}
                      color="#349fa2"
                    />
                  ),
                  onPress: () => { navigation.navigate('LeaveBalance') },
                },
              ]}
            />
          </View>
          <View style={styles.GridMenu}>
            <GridMenu
              title="Organization"
              columns={4}
              items={[
                {
                  id: '1',
                  title: 'Birthdays',
                  icon: (
                    <MaterialCommunityIcons
                      name="cake-variant-outline"
                      size={28}
                      color="#349fa2"
                    />
                  ),
                  onPress: () =>
                    navigation.navigate('Employee_birthdays'),
                },
                {
                  id: '2',
                  title: 'Team Leaves',
                  icon: (
                    <MaterialCommunityIcons
                      name="account-group-outline"
                      size={28}
                      color="#349fa2"
                    />
                  ),
                  onPress: () =>
                    navigation.navigate('Manager_teamLeaves'),
                },
                {
                  id: '3',
                  title: 'Work Anniversary',
                  icon: (
                    <MaterialCommunityIcons
                      name="trophy-outline"
                      size={28}
                      color="#349fa2"
                    />
                  ),
                  onPress: () => { navigation.navigate('WorkAnniversary') },
                },
                {
                  id: '4',
                  title: 'Referrals',
                  icon: (
                    <MaterialCommunityIcons
                      name="account-arrow-right-outline"
                      size={28}
                      color="#349fa2"
                    />
                  ),
                  onPress: () => { navigation.navigate('Organization_referrals') },
                },
              ]}
            />
          </View>
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
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: '#F9FEFF',
  },
  profileCard: {
    backgroundColor: '#F9FEFF',
    overflow: 'hidden',
    borderWidth: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHeader: {
    height: 60,
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 0,
  },
  imageContainer: {
    marginTop: -54,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  salutationContent: {
    flex: 1,
    paddingRight: 8,
  },
  greetingLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#349fa2',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  salutationText: {
    fontSize: 25,
    fontWeight: '800',
    color: 'purple',
    fontFamily: 'Roboto',
    marginBottom: 4,
  },
  salutationSubtitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  imageWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    backgroundColor: '#E2E8F0',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  } as ImageStyle,
  infoSection: {
    justifyContent: 'flex-start',
    paddingTop: 4,
  },
  activityHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginHorizontal: 12,
    marginTop: 8,
    letterSpacing: 0.3,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
  },
  detailIcon: {
    marginRight: 12,
    width: 20,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: '#0F172A',
    letterSpacing: 0.2,
  },
  statsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 10,
    marginTop: 14,
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(52, 159, 162, 0.1)',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: 'rgba(52, 159, 162, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#349fa2',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
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
  BottomSection: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopWidth: 1,
    borderTopColor: 'rgba(203, 213, 225, 0.7)',
    paddingTop: 16,
  },
  GridMenu: {
    paddingHorizontal: 10,
  }
})