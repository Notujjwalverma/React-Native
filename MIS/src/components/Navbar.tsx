import { View, Text, StyleSheet, Pressable, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDrawer } from './DrawerContext'

export default function Navbar({ onMenuPress }: { onMenuPress?: () => void }) {
  const navigation = useNavigation<any>()
  const drawer = useDrawer()

  const handleProfilePress = () => {
    navigation.navigate('Profile')
  }

  return (
    <View style={styles.navbar}>
      {/* Left: Menu Icon */}
      <Pressable
        style={styles.menuButton}
        onPress={() => {
          if (onMenuPress) {
            onMenuPress()
          } else {
            drawer?.openDrawer?.()
          }
        }}
      >
        <View style={styles.menuIcon}>
          <Text style={styles.menuIconText}>☰</Text>
        </View>
      </Pressable>

      {/* Center: MIS Logo */}
      <View style={styles.leftSection}>
        <Text style={styles.logoText}>MIS</Text>
      </View>

      {/* Right Side - Profile Icon */}
      <Pressable style={styles.profileButton} onPress={handleProfilePress}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileIconText}>👤</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height: Platform.OS === 'web' ? 64 : 56,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  leftSection: {
    flex: 1,
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0EA5E9',
    letterSpacing: 1,
  },
  profileButton: {
    padding: 8,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  profileIconText: {
    fontSize: 20,
  },
  menuButton: {
    marginRight: 12,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  menuIconText: {
    fontSize: 20,
    color: '#0F172A',
  },
})
