import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  Image
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDrawer } from './DrawerContext'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store/store'
import fallbackAvatar from '../assets/icon.png'

export default function LeftDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const navigation = useNavigation<any>()
  const drawer = useDrawer()
  const currentRouteName = drawer?.currentRouteName ?? ''
  const screenWidth = Dimensions.get('window').width
  const drawerWidth = Math.min(320, Math.round(screenWidth * 0.78))
  const anim = useRef(new Animated.Value(open ? 1 : 0)).current
  const employee = useSelector((state: RootState) => state.employee.employee)

  const designation = employee.profileDetails.basicDetails.designation
  const profileImageSource = employee?.profileDetails?.profilePicture
    ? { uri: employee.profileDetails.profilePicture }
    : fallbackAvatar

  useEffect(() => {
    Animated.timing(anim, {
      toValue: open ? 1 : 0,
      duration: 220,
      useNativeDriver: false,
    }).start()
  }, [open, anim])

  const translateX = anim.interpolate({ inputRange: [0, 1], outputRange: [-drawerWidth, 0] })
  const backdropOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.4] })

  // local dropdown states
  const [leaveOpen, setLeaveOpen] = useState(false)
  const [appraisalOpen, setAppraisalOpen] = useState(false)
  const [otherOpen, setOtherOpen] = useState(false)

  const navigate = (route: string, params?: any) => {
    navigation.navigate(route, params)
    onClose()
  }

  const isActiveRoute = (routeNames: string | string[]) => {
    const routes = Array.isArray(routeNames) ? routeNames : [routeNames]
    return routes.includes(currentRouteName)
  }

  return (
    <>
      <Animated.View
        style={[styles.backdrop, { opacity: backdropOpacity }]}
        pointerEvents={open ? 'auto' : 'none'}
      >
        <Pressable style={styles.backdropPressable} onPress={onClose} />
      </Animated.View>

      <Animated.View style={[styles.drawer, { width: drawerWidth, transform: [{ translateX }] }]}>

        <View style={styles.header}>
          <View style={styles.bottomSection}>
          <Image style={styles.bottomImage} source={require('../assets/GeminiLogo-Small-Black.png')} resizeMode="contain" />
        </View>
        </View>

        

        <View style={styles.content}>
          <Pressable
            style={[styles.item, isActiveRoute('Dashboard') && styles.activeItem]}
            onPress={() => navigate('Dashboard')}
          >
            <Text style={[styles.itemText, isActiveRoute('Dashboard') && styles.activeItemText]}>Dashboard</Text>
          </Pressable>

          <Pressable
            style={[styles.item, isActiveRoute('Profile') && styles.activeItem]}
            onPress={() => navigate('Profile')}
          >
            <Text style={[styles.itemText, isActiveRoute('Profile') && styles.activeItemText]}>Profile</Text>
          </Pressable>

          <Pressable
            style={[styles.item, isActiveRoute(['ApplyLeave', 'LeaveRequestStatus']) && styles.activeItem]}
            onPress={() => setLeaveOpen((v) => !v)}
          >
            <Text style={[styles.itemText, isActiveRoute(['ApplyLeave', 'LeaveRequestStatus']) && styles.activeItemText]}>Leave Management</Text>
            <Text style={styles.chev}>{leaveOpen ? '▾' : '▸'}</Text>
          </Pressable>
          {leaveOpen && (
            <View style={styles.subList}>
              <Pressable style={styles.subItem} onPress={() => navigate('ApplyLeave')}>
                <Text style={styles.subItemText}>Apply</Text>
              </Pressable>
              <Pressable style={styles.subItem} onPress={() => navigate('LeaveRequestStatus')}>
                <Text style={styles.subItemText}>View Request Status</Text>
              </Pressable>
              {designation === 'Manager' && (
                <Pressable style={styles.subItem} onPress={() => navigate('LeaveApproval')}>
                  <Text style={styles.subItemText}>Approve Leaves</Text>
                </Pressable>
              )}
              {designation === 'Manager' && (
                <Pressable style={styles.subItem} onPress={() => navigate('TeamLeaveStatus')}>
                  <Text style={styles.subItemText}>Team Leave Status</Text>
                </Pressable>
              )}

            </View>
          )}

          <Pressable
            style={[styles.item, isActiveRoute(['AddGoals', 'MyAchievements']) && styles.activeItem]}
            onPress={() => setAppraisalOpen((v) => !v)}
          >
            <Text style={[styles.itemText, isActiveRoute(['AddGoals', 'MyAchievements']) && styles.activeItemText]}>Appraisal Management</Text>
            <Text style={styles.chev}>{appraisalOpen ? '▾' : '▸'}</Text>
          </Pressable>
          {appraisalOpen && (
            <View style={styles.subList}>
              <Pressable style={styles.subItem} onPress={() => navigate('Appraisal_addGoals')}>
                <Text style={styles.subItemText}>Add Goals</Text>
              </Pressable>
              <Pressable style={styles.subItem} onPress={() => navigate('Appraisal_myAchievements')}>
                <Text style={styles.subItemText}>My Achievements</Text>
              </Pressable>
            </View>
          )}

          <Pressable
            style={[styles.item, isActiveRoute('OtherPortals') && styles.activeItem]}
            onPress={() => setOtherOpen((v) => !v)}
          >
            <Text style={[styles.itemText, isActiveRoute('OtherPortals') && styles.activeItemText]}>Other Portals</Text>
            <Text style={styles.chev}>{otherOpen ? '▾' : '▸'}</Text>
          </Pressable>
          {otherOpen && (
            <View style={styles.subList}>
              {['Athena', 'Helpdesk', 'Github', 'ATS', 'Contripoints', 'Gembook'].map((p) => (
                <Pressable
                  key={p}
                  style={[styles.subItem, isActiveRoute('OtherPortals') && styles.activeSubItem]}
                  onPress={() => navigate('OtherPortals', { portal: p })}
                >
                  <Text style={[styles.subItemText, isActiveRoute('OtherPortals') && styles.activeItemText]}>{p}</Text>
                </Pressable>
              ))}
            </View>
          )}

        </View>

        <View style={styles.profileSection} >
          <Image
            source={profileImageSource}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>{employee.profileDetails.basicDetails.name}</Text>
            <Text style={styles.profileDesignation}>{employee.profileDetails.basicDetails.designation}</Text>
          </View>
        </View>

        
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    zIndex: 100,
    elevation: 9,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 101,
    paddingTop: 48,
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: '#349fa2',
  },
  content: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  itemText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  chev: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 12,
  },
  subList: {
    paddingLeft: 18,
    paddingBottom: 8,
  },
  subItem: {
    paddingVertical: 8,
  },
  subItemText: {
    fontSize: 14,
    color: '#0F172A',
  },
  activeItem: {
    backgroundColor: '#E0F2FE',
    borderRadius: 8,
  },
  activeSubItem: {
    backgroundColor: '#DBEAFE',
    borderRadius: 8,
  },
  activeItemText: {
    color: '#0369A1',
    fontWeight: '700',
  },
  backdropPressable: {
    ...StyleSheet.absoluteFill,
  },

  profileSection: {
    marginVertical: 16,
    marginHorizontal: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 54,
    height: 54,
    borderRadius: 32,
    marginRight: 12,
  },
  profileName: {
    fontSize: 18,
    color: '#0F172A',
  },
  bottomImage: {
    width: 188,
    height: 48,
    borderRadius: 24,
  },

  profileDesignation: {
    fontSize: 14,
    color: '#64748B',
  },

})
