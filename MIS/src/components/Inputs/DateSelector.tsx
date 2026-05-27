import React, { useRef, useState } from 'react'
import { View, Text, Pressable, StyleSheet, Animated, ActivityIndicator } from 'react-native'
import { Calendar } from 'react-native-calendars'

type DateSelectorProps = {
  value?: string | null // YYYY-MM-DD
  onChange?: (dateString: string) => void
  placeholder?: string
  loading?: boolean
  disabled?: boolean
  minDate?: string
  maxDate?: string
  style?: any
}

export default function DateSelector({
  value = null,
  onChange,
  placeholder = 'Select date',
  loading = false,
  disabled = false,
  minDate,
  maxDate,
  style,
}: DateSelectorProps) {
  const [open, setOpen] = useState(false)
  const anim = useRef(new Animated.Value(0)).current

  const toggle = () => {
    if (disabled || loading) return
    const toValue = open ? 0 : 1
    Animated.timing(anim, { toValue, duration: 180, useNativeDriver: false }).start()
    setOpen(!open)
  }

  const handleDayPress = (day: any) => {
    onChange && onChange(day.dateString)
    Animated.timing(anim, { toValue: 0, duration: 120, useNativeDriver: false }).start()
    setOpen(false)
  }

  const height = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 320] })
  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] })

  const formatted = value ? formatDateDisplay(value) : placeholder

  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={toggle}
        disabled={disabled || loading}
        style={({ pressed }) => [styles.button, pressed && styles.pressed, disabled && styles.disabled]}
        accessibilityLabel={placeholder}
        accessibilityState={{ disabled: disabled || loading }}
      >
        {loading ? (
          <ActivityIndicator color="#0F172A" />
        ) : (
          <Text style={[styles.buttonText, value && styles.valueText]}>{formatted}</Text>
        )}
      </Pressable>

      <Animated.View style={[styles.panel, { height, opacity }]}>
        <Calendar
          onDayPress={handleDayPress}
          current={value ?? undefined}
          minDate={minDate}
          maxDate={maxDate}
          markedDates={value ? { [value]: { selected: true, selectedColor: '#0EA5E9' } } : {}}
        />
      </Animated.View>
    </View>
  )
}

function formatDateDisplay(iso: string) {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
  } catch (e) {
    return iso
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CBD5E1',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    minWidth: 140,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#64748B',
    fontSize: 14,
  },
  valueText: {
    color: '#0F172A',
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.995 }],
  },
  disabled: {
    opacity: 0.6,
  },
  panel: {
    overflow: 'hidden',
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },
})
