import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native'

type TextAreaProps = {
  value?: string
  onChange?: (text: string) => void
  placeholder?: string
  disabled?: boolean
  maxLength?: number
  minRows?: number
  maxRows?: number
  label?: string
  error?: string
  showCharCount?: boolean
  style?: any
  editable?: boolean
}

export default function TextArea({
  value = '',
  onChange,
  placeholder = 'Enter text here...',
  disabled = false,
  maxLength,
  minRows = 3,
  maxRows = 6,
  label,
  error,
  showCharCount = false,
  style,
  editable = true,
}: TextAreaProps) {
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)

  const minHeight = Math.max(minRows * 20, 60)
  const maxHeight = maxRows * 20

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, error && styles.labelError]}>
          {label}
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          focused && styles.focused,
          error && styles.inputError,
          disabled && styles.disabled,
          hovered && !disabled && styles.hover,
          { minHeight, maxHeight },
        ]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        editable={editable && !disabled}
        multiline
        maxLength={maxLength}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        textAlignVertical="top"
      />

      <View style={styles.footer}>
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        {showCharCount && maxLength && (
          <Text style={[styles.charCount, value.length === maxLength && styles.charCountFull]}>
            {value.length} / {maxLength}
          </Text>
        )}
      </View>
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  errorText: {
    fontSize: 12,
    color: '#DC2626',
    fontWeight: '500',
  },
  charCount: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  charCountFull: {
    color: '#DC2626',
  },
})
