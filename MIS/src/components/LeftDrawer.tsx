import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function LeftDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigation = useNavigation<any>()
  const screenWidth = Dimensions.get('window').width
  const drawerWidth = Math.min(320, Math.round(screenWidth * 0.78))
  const anim = useRef(new Animated.Value(open ? 1 : 0)).current

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
  const [otherOpen, setOtherOpen] = useState(false)

  const navigate = (route: string, params?: any) => {
    onClose()
    navigation.navigate(route as any, params)
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
          <Text style={styles.headerTitle}>MIS</Text>
        </View>

        <View style={styles.content}>
          <Pressable style={styles.item} onPress={() => navigate('Profile')}>
            <Text style={styles.itemText}>Profile</Text>
          </Pressable>

          <Pressable
            style={styles.item}
            onPress={() => setLeaveOpen((v) => !v)}
          >
            <Text style={styles.itemText}>Leave Management</Text>
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
            </View>
          )}

          <Pressable
            style={styles.item}
            onPress={() => setOtherOpen((v) => !v)}
          >
            <Text style={styles.itemText}>Other Portals</Text>
            <Text style={styles.chev}>{otherOpen ? '▾' : '▸'}</Text>
          </Pressable>
          {otherOpen && (
            <View style={styles.subList}>
              {['Athena', 'Helpdesk', 'Github', 'ATS', 'Contripoints', 'Gembook'].map((p) => (
                <Pressable key={p} style={styles.subItem} onPress={() => navigate('OtherPortals', { portal: p })}>
                  <Text style={styles.subItemText}>{p}</Text>
                </Pressable>
              ))}
            </View>
          )}

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
    zIndex: 50,
    paddingTop: 48,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0EA5E9',
  },
  content: {
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
  backdropPressable: {
    flex: 1,
  },
})
