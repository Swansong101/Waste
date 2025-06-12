import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    phoneNumber: '',
    password: '',
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleContinue = async () => {
    try {
      // Validate required fields
      if (!form.phoneNumber || !form.password) {
        Alert.alert('Error', 'Please fill all required fields');
        return;
      }

      // Here you have to validate credentials with backend, to be done
      
      // Save login state
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('hasSignedUp', 'true');
      
      // Navigate to home page
      router.replace('/home'); 
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Let's build a better world</Text>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Phone number <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="e.g +1234567"
          keyboardType="phone-pad"
          value={form.phoneNumber}
          onChangeText={(text) => handleChange('phoneNumber', text)}
        />

        <Text style={styles.label}>Password <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder=""
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleChange('password', text)}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* Sign Up */}
      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Text style={styles.signupLink} onPress={() => router.push('/signup/step1')}>Sign up</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 80,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
  },
  form: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 6,
  },
  required: {
    color: 'red',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'limegreen',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  signupText: {
    fontSize: 14,
    color: '#555',
  },
  signupLink: {
    color: 'green',
    fontWeight: '500',
  },
});
