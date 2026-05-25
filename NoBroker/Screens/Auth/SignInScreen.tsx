import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../src/firebase/firebaseconfig';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Dashboard from '../User/Dashboard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 30,
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    paddingHorizontal: 4,
    color: '#555',
    marginBottom: 6,
    fontFamily: 'Poppins_400Regular',
  },
  input: {
    height: 52,
    zIndex: 1,
    overflow: 'visible',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#F8FAFC',
    color: 'rgba(16, 24, 40, 0.5)',
  },
  submitBtn: {
    marginVertical: 20,
    backgroundColor: 'olive',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  DisabledsubmitBtn: {
    opacity: 0.5,
    marginVertical: 20,
    backgroundColor: 'olive',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Poppins_400Regular',
  },

})

export default function SignInScreen() {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const checkEmailValidity = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && !loading;
  }

  const getUsers = async () => {
    const q = query(
      collection(db, "users"),
      where("companyEmail", "==", email
      )
    );
    const snapshot = await getDocs(q);
    const user = snapshot.docs[0];
    if (!user) {
      alert("User not registered");
      
      return ;
    }
    navigation.navigate('Dashboard');
    console.log(user);
  }

  const handleSubmit =async () => {
    console.log('Form submitted successfully!', email);
    setLoading(true);
    await getUsers();
    setLoading(false);
    setEmail('');
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In To Continue</Text>
      <Text style={styles.label}>Enter your email : </Text>
      <TextInput
        style={styles.input}
        placeholder="Valid registered email address"
        value={email}
        onChangeText={setEmail}
      />
      <Pressable disabled={!checkEmailValidity(email)} style={checkEmailValidity(email) ? styles.submitBtn : styles.DisabledsubmitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>{loading ? 'Please Wait' : 'Sign in'}</Text>
      </Pressable>
    </View>
  )
}