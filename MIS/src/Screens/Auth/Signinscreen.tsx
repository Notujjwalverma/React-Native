import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebaseconfig'

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

export default function SignInScreen() {
  const navigation = useNavigation<any>()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSignIn = async () => {
    setErrors({})
    
    try {
      await validationSchema.validate(formData, { abortEarly: false })
      
      setLoading(true)
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
      
      console.log('User signed in:', userCredential.user.email)
      setFormData({ email: '', password: '' })
      navigation.navigate('Dashboard')
    } catch (error: any) {
      if (error.inner) {
        // Yup validation errors
        const errorMap: { [key: string]: string } = {}
        error.inner.forEach((err: any) => {
          errorMap[err.path] = err.message
        })
        setErrors(errorMap)
      } else if (error.code) {
        let errorMessage = 'An error occurred. Please try again.'
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'No account found with this email address'
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'Incorrect password. Please try again.'
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address'
        } else if (error.code === 'auth/user-disabled') {
          errorMessage = 'This account has been disabled'
        }
        setErrors({ form: errorMessage })
      } else {
        setErrors({ form: error.message || 'An error occurred' })
      }
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = formData.email && formData.password && !loading

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.title}>MIS</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
      </View>

      {errors.form && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errors.form}</Text>
        </View>
      )}

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Organization's Email Address</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="you@geminisolutions.com"
            placeholderTextColor="#B0B9C1"
            value={formData.email}
            onChangeText={(text) => {
              setFormData({ ...formData, email: text })
              if (errors.email) setErrors({ ...errors, email: '' })
            }}
            editable={!loading}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.fieldError}>{errors.email}</Text>}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <View style={[styles.passwordContainer, errors.password && styles.inputError]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              placeholderTextColor="#B0B9C1"
              value={formData.password}
              onChangeText={(text) => {
                setFormData({ ...formData, password: text })
                if (errors.password) setErrors({ ...errors, password: '' })
              }}
              editable={!loading}
              secureTextEntry={!showPassword}
              autoComplete="off"
              autoCorrect={false}
              spellCheck={false}
              textContentType="password"
              importantForAutofill="no"
              underlineColorAndroid="transparent"
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              disabled={!formData.password}
              style={styles.eyeIcon}
            >
              <Text style={styles.eyeText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
            </Pressable>
          </View>
          {errors.password && <Text style={styles.fieldError}>{errors.password}</Text>}
        </View>
      </View>

      <Pressable
        style={[styles.signInButton, !isFormValid && styles.buttonDisabled]}
        onPress={handleSignIn}
        disabled={!isFormValid}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <Text style={styles.signInButtonText}>Sign In</Text>
        )}
      </Pressable>

      <View style={styles.footer}>
        <Pressable onPress={() => navigation.navigate('Dashboard')} disabled={loading}>
          <Text style={styles.link}>Having trouble signing in?</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
    backgroundColor: '#F8FAFC',
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '400',
  },
  form: {
    marginBottom: 24,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    fontSize: 16,
  },
  passwordContainer: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    borderColor: '#E2E8F0',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    height: '100%',
    outlineColor: 'transparent',
    borderColor: 'transparent',
    color: '#0F172A',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  eyeText: {
    fontSize: 18,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  fieldError: {
    fontSize: 12,
    color: 'rgb(239, 68, 68)',
    marginTop: 6,
    fontWeight: '500',
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  errorText: {
    color: 'rgba(153, 27, 27, 0.5)',
    fontSize: 12,
    fontWeight: '500',
  },
  forgotPassword: {
    marginBottom: 12,
  },
  signInButton: {
    height: 56,
    backgroundColor: '#0EA5E9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#CBD5E1',
    shadowColor: 'transparent',
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#64748B',
  },
  link: {
    fontSize: 12,
    color: '#0EA5E9',
    fontWeight: '400',
  },
})