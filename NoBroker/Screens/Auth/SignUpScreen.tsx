import { StyleSheet, View, Text, TextInput, Pressable, ScrollView } from 'react-native'
import DropDown from '../inputs/DropDown'
import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../src/firebase/firebaseconfig';
import * as Yup from 'yup';

export default function SignUpScreen() { 

  const [error , setError] = useState({});

  const saveUser = async () => {
    try {
      await addDoc(collection(db, 'users'),formData);
      console.log('Data saved successfully on Firebase!');
    } catch (error) {
      console.error('Error saving to Firebase:', error);
    }
  };

  const validationSchema = Yup.object({
    agentType: Yup.string()
      .required("Select agent type"),
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    companyName: Yup.string().required("Company name required"),
    tradeLicenseNo: Yup.string().required("License required"),
    companyEmail: Yup.string().email('Invalid Email').required("Email required"),
    phoneCountryCode: Yup.string().required("Country Code required"),
    phoneNumber: Yup.string().required("Phone required"),
    country: Yup.string().required("Country required"),
    city: Yup.string().required("City required"),
    address: Yup.string().required("Address required"),
    aradaSalesperson: Yup.string(),
  });

  const [formData, setFormData] = useState(validationSchema.cast({
    agentType: '',
    firstName: '',
    lastName: '',
    companyName: '',
    tradeLicenseNo: '',
    companyEmail: '',
    phoneCountryCode: '',
    phoneNumber: '',
    country: '',
    city: '',
    address: '',
    aradaSalesperson: '',
  }));
  
  validationSchema.isValid(formData).then(valid => {
    console.log('Form is valid:', valid);
  }).catch(error => {
    console.error('Validation error:', error);
  });

  const resetFormData = () => {
    setFormData({
      agentType: '',
      firstName: '',
      lastName: '',
      companyName: '',
      tradeLicenseNo: '',
      companyEmail: '',
      phoneCountryCode: '',
      phoneNumber: '',
      country: '',
      city: '',
      address: '',
      aradaSalesperson: '',
    });
  }
  const handleSubmit = async () => {  

    try { 
      await validationSchema.validate(formData, { abortEarly: false });
      saveUser();
      resetFormData();
      setError({});
      alert('Form submitted successfully!');
    } catch (validationErrors) { 
      const errorMap = {};
      validationErrors.inner.forEach(err => { 
        errorMap[err.path] = err.message;
      })
      setError(errorMap);
      alert('Please recheck all values and try again ');
    }

  }



  return (
    <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
      <View style={styles.card}>
        <Text style={styles.heading}>Let's get started!</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Agent type*</Text>

          <DropDown
            HeadingPlaceholder="Select Your Role"
            items={[
              { label: "Broker", value: "Broker" },
              { label: "Builder", value: "Builder" }
            ]}
            value={formData.agentType}
            setValue={(val) => {
              if (typeof val === "function") {
                setFormData({
                  ...formData,
                  agentType: val(formData.agentType),
                });
              } else {
                setFormData({
                  ...formData, agentType: val,
                });
              }
            }}
          />

        </View>

        <View style={styles.field}>
          <Text style={styles.label}>First name*</Text>
          <TextInput
            placeholder="John"
            style={styles.input}
            placeholderTextColor="#7A7A7A"
            maxLength={15}
            value={formData.firstName}
            onChangeText={(text) => setFormData({ ...formData, firstName: text })}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Last name*</Text>
          <TextInput
            placeholder="Mathew"
            style={styles.input}
            placeholderTextColor="#7A7A7A"
            maxLength={15}
            value={formData.lastName}
            onChangeText={(text) => setFormData({ ...formData, lastName: text })}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Company name*</Text>
          <TextInput
            placeholder="Demo LLC"
            style={styles.input}
            placeholderTextColor="#7A7A7A"
            maxLength={100}
            value={formData.companyName}
            onChangeText={(text) => setFormData({ ...formData, companyName: text })}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Trade License no.*</Text>
          <TextInput
            placeholder="12345"
            style={styles.input}
            placeholderTextColor="#7A7A7A"
            keyboardType="default"
            value={formData.tradeLicenseNo}
            onChangeText={(text) => setFormData({ ...formData, tradeLicenseNo: text })}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Company email*</Text>
          <TextInput
            placeholder="demo12@email.com"
            style={styles.input}
            placeholderTextColor="#7A7A7A"
            keyboardType="email-address"
            value={formData.companyEmail}
            onChangeText={(text) => setFormData({ ...formData, companyEmail: text })}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Phone*</Text>
          <View style={styles.phoneNumber}>
            <TextInput
              value={formData.phoneCountryCode}
              onChangeText={(text) => setFormData({ ...formData, phoneCountryCode: text })}
              placeholder="+91"
              style={styles.countryinput}
              maxLength={4}
              placeholderTextColor="#7A7A7A"
              keyboardType="phone-pad" />

            <TextInput
              value={formData.phoneNumber}
              onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
              placeholder="1234567890"
              style={styles.numberinput}
              maxLength={10}
              placeholderTextColor="#7A7A7A"
              keyboardType="phone-pad" />
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Country*</Text>
          <DropDown
            HeadingPlaceholder="Select Your Country"
            items={[{ label: 'Broker', value: 'Broker' }, { label: 'Builder', value: 'Builder' }]}
            value={formData.country}
            setValue={(val) => {
              if (typeof val === "function") {
                setFormData({
                  ...formData,
                  country: val(formData.country),
                });
              } else {
                setFormData({
                  ...formData, country: val,
                });
              }
            }}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>City*</Text>
          <DropDown
            HeadingPlaceholder="Select Your City"
            items={[{ label: 'Broker', value: 'Broker' }, { label: 'Builder', value: 'Builder' }]}
            value={formData.agentType}
            setValue={(val) => {
              if (typeof val === "function") {
                setFormData({
                  ...formData, city: val(formData.city),
                });
              } else {
                setFormData({
                  ...formData, city: val,
                });
              }
            }}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Address*</Text>
          <TextInput
            placeholder="Demo LLC"
            style={styles.input}
            placeholderTextColor="#7A7A7A"
            maxLength={100}
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Arada Salesperson</Text>
          <TextInput
            placeholder="Demo LLC"
            style={styles.input}
            placeholderTextColor="#7A7A7A"
            maxLength={100}
            value={formData.aradaSalesperson}
            onChangeText={(text) => setFormData({ ...formData, aradaSalesperson: text })}
          />
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
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 30,
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
    fontWeight: '400',
    zIndex: -5,
    overflow: 'visible',
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
    fontWeight: '500',
    fontFamily: 'Poppins_400Regular',
  },
})