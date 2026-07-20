import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebaseconfig'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSignIn = async () => {  
    navigation.navigate('Dashboard');
  }

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      extraScrollHeight={30}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >

      <Image
        source={require('../../assets/GeminiLogo-Small-Black.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.header}>
        <Text style={styles.title}>MIS</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
      </View>

      {errors.form && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errors.form}</Text>
        </View>
      )}



      <Pressable
        style={[styles.signInButton]}
        onPress={handleSignIn}
      >
          <Text style={styles.signInButtonText}>Login with SSO</Text>
      </Pressable>

      <Text style={styles.smallDescription}>
        This application is to be used only for authorized business purposes by the employees of Gemini Solutions. Unauthorized distribution of any information contained in the website is a violation of Gemini Solutions' internal policies. Use of the website is monitored. If user shares personal data including login credentials with an unauthorized external third party, they may compromise the user's confidential information. Gemini Solutions shall have no liability or responsibility for the integrity, and security of that confidential information.
      </Text>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
    backgroundColor: '#F8FAFC',
    alignContent: 'center', 
  },
  header: {
    marginBottom: 70,
    
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#205072',
    textAlign: 'center',
    marginTop: 18,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'Roboto',
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
  signInButton: {
    height: 50,
    backgroundColor: '#349fa2',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#349fa2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    
  },
  signInButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Roboto',
  },
  link: {
    fontSize: 12,
    color: '#0EA5E9',
    fontWeight: '400',
  },
  logo: {
    width: '60%',
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  smallDescription: {
    fontSize: 9,
    color: 'rgba(0, 0, 0, 0.5)',
    fontWeight: '400',
    marginVertical: 30,
    borderColor: '#349fa2',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(56,163,165,0.08)',
    fontFamily: 'Roboto',
  },
})