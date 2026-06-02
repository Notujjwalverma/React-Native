import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native'

type PhoneNumberInputProps = {
  value?: string
  onChange?: (text: string) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  error?: string
  style?: any
  maxLength?: number
  editable?: boolean
}

export default function PhoneNumberInput({
  value = '',
  onChange,
  placeholder = 'Enter phone number',
  label,
  disabled = false,
  error,
  style,
  maxLength = 15,
  editable = true,
}: PhoneNumberInputProps) {
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={[styles.label, error && styles.labelError]}>{label}</Text> : null}

      <TextInput
        style={[
          styles.input,
          focused && styles.focused,
          error && styles.inputError,
          disabled && styles.disabled,
          hovered && !disabled && styles.hover,
        ]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        keyboardType="phone-pad"
        editable={editable && !disabled}
        maxLength={maxLength}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 6,
  },
  labelError: {
    color: '#DC2626',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CBD5E1',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '500',
    height: 48,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  focused: {
    borderColor: '#0EA5E9',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  hover: {
    backgroundColor: '#F8FAFC',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  disabled: {
    backgroundColor: '#F1F5F9',
    opacity: 0.6,
  },
  inputError: {
    borderColor: '#DC2626',
  },
  errorText: {
    marginTop: 6,
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '500',
  },
})