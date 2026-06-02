import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native'

type MessageType = 'success' | 'error' | 'warning' | 'info'

type MessageProps = {
  type: MessageType
  title?: string
  message: string
  duration?: number
  onClose?: () => void
  isVisible?: boolean
}

const typeConfig = {
  success: {
    backgroundColor: '#D1FAE5',
    borderColor: '#10B981',
    textColor: '#047857',
    icon: '✓',
  },
  error: {
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444',
    textColor: '#DC2626',
    icon: '✕',
  },
  warning: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
    textColor: '#D97706',
    icon: '!',
  },
  info: {
    backgroundColor: '#DBEAFE',
    borderColor: '#3B82F6',
    textColor: '#1D4ED8',
    icon: 'i',
  },
}

export default function Message({
  type = 'info',
  title,
  message,
  duration = 3000,
  onClose,
  isVisible = true,
}: MessageProps) {
  const [visible, setVisible] = useState(isVisible)
  const slideAnim = React.useRef(new Animated.Value(-100)).current

  useEffect(() => {
    setVisible(isVisible)
  }, [isVisible])

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()

      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose()
        }, duration)

        return () => clearTimeout(timer)
      }
    }
  }, [visible])

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false)
      onClose && onClose()
    })
  }

  if (!visible) return null

  const config = typeConfig[type]

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View
        style={[
          styles.message,
          {
            backgroundColor: config.backgroundColor,
            borderLeftColor: config.borderColor,
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <Text style={[styles.icon, { color: config.textColor }]}>{config.icon}</Text>
        </View>

        <View style={styles.contentContainer}>
          {title && (
            <Text style={[styles.title, { color: config.textColor }]}>{title}</Text>
          )}
          <Text style={[styles.text, { color: config.textColor }]}>{message}</Text>
        </View>

        <Pressable onPress={handleClose} style={styles.closeButton}>
          <Text style={[styles.closeText, { color: config.textColor }]}>✕</Text>
        </Pressable>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  message: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainer: {
    marginRight: 12,
    width: 24,
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    fontWeight: '700',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  text: {
    fontSize: 13,
    fontWeight: '500',
  },
  closeButton: {
    marginLeft: 12,
    padding: 4,
  },
  closeText: {
    fontSize: 16,
    fontWeight: '600',
  },
})