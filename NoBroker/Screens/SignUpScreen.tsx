import { StyleSheet, View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import DropDown from '../inputs/DropDown'
import React, { useState } from 'react'



export default function SignUpScreen() {

  const handleSubmit = () => {
    console.log('Form submitted');
  } 

  return (

    <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
      <View style={styles.card}>
        <Text style={styles.heading}>Let's get started!</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Agent type*</Text>
          <DropDown
            HeadingPlaceholder="Select Your Role"
            items={[{ label: 'Broker', value: 'Broker' }, { label: 'Builder', value: 'Builder' }]}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>First name*</Text>
          <TextInput placeholder="John" style={styles.input} placeholderTextColor="#7A7A7A" maxLength={15} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Last name*</Text>
          <TextInput placeholder="Mathew" style={styles.input} placeholderTextColor="#7A7A7A" maxLength={15} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Company name*</Text>
          <TextInput placeholder="Demo LLC" style={styles.input} placeholderTextColor="#7A7A7A" maxLength={100} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Trade License no.*</Text>
          <TextInput placeholder="12345" style={styles.input} placeholderTextColor="#7A7A7A" keyboardType="default" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Company email*</Text>
          <TextInput placeholder="demo12@email.com" style={styles.input} placeholderTextColor="#7A7A7A" keyboardType="email-address" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Phone*</Text>
          <View style={styles.phoneNumber}>
            <TextInput placeholder="+91" style={styles.countryinput} maxLength={4} placeholderTextColor="#7A7A7A" keyboardType="phone-pad" />
            <TextInput placeholder="1234567890" style={styles.numberinput} maxLength={10} placeholderTextColor="#7A7A7A" keyboardType="phone-pad" />
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Country*</Text>
          <DropDown
            HeadingPlaceholder="Select Your Role"
            items={[{ label: 'Broker', value: 'Broker' }, { label: 'Builder', value: 'Builder' }]}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>City*</Text>
          <DropDown
            HeadingPlaceholder="Select Your Role"
            items={[{ label: 'Broker', value: 'Broker' }, { label: 'Builder', value: 'Builder' }]}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Address*</Text>
          <TextInput placeholder="Demo LLC" style={styles.input} placeholderTextColor="#7A7A7A" maxLength={100} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Arada Salesperson</Text>
          <TextInput placeholder="Demo LLC" style={styles.input} placeholderTextColor="#7A7A7A" maxLength={100} />
        </View>


      


        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: 16,
    flexGrow: 1,
  },
  card: {
    padding: 10,
    elevation: 4,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#101828',
  },
  field: {
    marginBottom: 18,
  },
  phoneNumber: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  countryinput: {
    height: 52,
    width: '20%',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#F8FAFC',
    color: '#101828',
  },
  numberinput: {
    height: 52,
    width: '80%',
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#F8FAFC',
    color: '#101828',
  },
  label: {
    fontSize: 13,
    color: '#667085',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#F8FAFC',
    color: '#101828',
  },
  submitBtn: {
    marginTop: 10,
    backgroundColor: '#2546D3',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
})