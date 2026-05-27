import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet, ActivityIndicator, Platform, GestureResponderEvent } from 'react-native'

type ButtonProps = {
  label?: string
  onPress?: (e?: GestureResponderEvent) => void
  loading?: boolean
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  style?: any
  textStyle?: any
  accessibilityLabel?: string
}

export default function Button({
  label = 'Button',
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  style,
  textStyle,
  accessibilityLabel,
}: ButtonProps) {
  const [hovered, setHovered] = useState(false)

  const isDisabled = disabled || loading

  const handlePress = (e?: GestureResponderEvent) => {
    if (isDisabled) return
    onPress && onPress(e)
  }

  const containerStyles = ({ pressed }: { pressed?: boolean }) => [
    styles.button,
    variant === 'secondary' && styles.secondary,
    variant === 'ghost' && styles.ghost,
    pressed && !isDisabled && styles.pressed,
    hovered && !isDisabled && styles.hover,
    isDisabled && styles.disabled,
    style,
    Platform.OS === 'web' && { cursor: isDisabled ? 'not-allowed' : 'pointer' },
  ]

  return (
    <View>
      <Pressable
        onPress={handlePress}
        disabled={isDisabled}
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        style={containerStyles}
        accessibilityLabel={accessibilityLabel || label}
        accessibilityState={{ disabled: isDisabled, busy: loading }}
      >
        {loading ? (
          <ActivityIndicator color={variant === 'secondary' ? '#0F172A' : '#fff'} />
        ) : (
          <Text style={[styles.text, variant === 'secondary' && styles.textSecondary, textStyle]}>{label}</Text>
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.01)',
    borderColor: '#CBD5E1',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    color: '#0F172A',
    fontWeight: '600',
    fontSize: 14,
  },
  secondary: {
    backgroundColor: '#E0F2FE',
    borderColor: '#7DD3FC',
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  textSecondary: {
    color: '#0369A1',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  hover: {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  disabled: {
    opacity: 0.6,
  },
})