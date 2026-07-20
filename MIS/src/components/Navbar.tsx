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
      
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height: Platform.OS === 'web' ? 64 : 56,
    backgroundColor: '#F9FEFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    elevation: 6,
  },
  leftSection: {
    flex: 1,
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#205072',
    letterSpacing: 1,
  },
  menuButton: {
    marginRight: 12,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIconText: {
    fontSize: 20,
    color: '#0F172A',
  },
})
