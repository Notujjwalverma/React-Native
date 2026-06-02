import React, { useRef, useState } from 'react'
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  FlatList,
  ActivityIndicator,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

type Option = { label: string; value: string }

type DropdownProps = {
  options: Option[]
  value?: string | null
  onChange?: (value: string) => void
  placeholder?: string
  loading?: boolean
  disabled?: boolean
  style?: any
  itemStyle?: any
}

export default function Dropdown({
  options,
  value = null,
  onChange,
  placeholder = 'Select',
  loading = false,
  disabled = false,
  style,
  itemStyle,
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  const anim = useRef(new Animated.Value(0)).current

  const toggle = () => {
    if (disabled || loading) return

    const toValue = open ? 0 : 1

    Animated.timing(anim, {
      toValue,
      duration: 180,
      useNativeDriver: false,
    }).start()

    setOpen(!open)
  }

  const select = (val: string) => {
    onChange && onChange(val)

    Animated.timing(anim, {
      toValue: 0,
      duration: 120,
      useNativeDriver: false,
    }).start()

    setOpen(false)
  }

  const heightInterpolate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.min(200, options.length * 44)],
  })

  const opacityInterpolate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  // Arrow rotation
  const rotateInterpolate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? placeholder

  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={toggle}
        disabled={disabled || loading}
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        style={({ pressed }) => [
          styles.button,
          hovered && !disabled && styles.hover,
          pressed && styles.pressed,
          disabled && styles.disabled,
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#0F172A" />
        ) : (
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>{selectedLabel}</Text>

            <Animated.View
              style={{
                transform: [{ rotate: rotateInterpolate }],
              }}
            >
              <Ionicons
                name="chevron-down"
                size={18}
                color="#0F172A"
              />
            </Animated.View>
          </View>
        )}
      </Pressable>

      <Animated.View
        style={[
          styles.dropdown,
          {
            height: heightInterpolate,
            opacity: opacityInterpolate,
          },
        ]}
      >
        <FlatList
          data={options}
          keyExtractor={(item) => item.value}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <Pressable
              onPress={() => select(item.value)}
              style={({ pressed }) => [
                styles.item,
                itemStyle,
                pressed && styles.itemPressed,
              ]}
            >
              <Text
                style={[
                  styles.itemText,
                  item.value === value && styles.itemTextActive,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          )}
        />
      </Animated.View>
    </View>
  )
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

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttonText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '600',
  },

  hover: {
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },

  pressed: {
    transform: [{ scale: 0.995 }],
    opacity: 0.95,
  },

  disabled: {
    opacity: 0.6,
  },

  dropdown: {
    overflow: 'hidden',
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#E2E8F0',
    borderWidth: 1,
  },

  item: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  itemPressed: {
    backgroundColor: '#F1F5F9',
  },

  itemText: {
    color: '#0F172A',
  },

  itemTextActive: {
    color: '#0369A1',
    fontWeight: '700',
  },
})