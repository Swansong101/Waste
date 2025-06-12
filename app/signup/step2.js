import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupStep2() {
  const router = useRouter();

  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
    profileImage: '',
  });

  const [pledgeRecycle, setPledgeRecycle] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleImagePicker = () => {
    // Placeholder for image picker functionality
    Alert.alert('Image Picker', 'Image picker functionality would be implemented here');
  };

  const handleContinue = async () => {
    try {
      // Validate required fields
      if (!form.password || !form.confirmPassword) {
        Alert.alert('Error', 'Please fill all required fields');
        return;
      }

      // Validate password match
      if (form.password !== form.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }

      // Save signup completion state
      await AsyncStorage.setItem('signupCompleted', 'true');
      
      // Navigate to home page
      router.replace('/home'); // Replaces current route so they can't go back
    } catch (error) {
      console.error('Signup step 2 failed:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>We are glad to have you!</Text>
      <Text style={styles.subtitle}>Fill in this form to get started</Text>
      <Text style={styles.helper}>Let's build a better world</Text>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressCompleted} />
        <View style={styles.progressFilled} />
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Password <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder=""
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleChange('password', text)}
        />

        <Text style={styles.label}>Confirm password <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder=""
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={(text) => handleChange('confirmPassword', text)}
        />

        <Text style={styles.label}>Profile image</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={handleImagePicker}>
          <Text style={styles.imagePickerText}>Choose Image</Text>
        </TouchableOpacity>
        <Text style={styles.optional}>ⓘ Optional</Text>

        {/* Pledge Checkbox */}
        <TouchableOpacity 
          style={styles.checkboxContainer} 
          onPress={() => setPledgeRecycle(!pledgeRecycle)}
        >
          <View style={[styles.checkbox, pledgeRecycle && styles.checkboxChecked]}>
            {pledgeRecycle && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxText}>I pledge to recycle</Text>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* Sign In */}
      <Text style={styles.signinText}>
        Already have an account?{' '}
        <Text style={styles.signinLink} onPress={() => router.push('/login')}>Sign in</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 50,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 4,
  },
  helper: {
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },
  progressCompleted: {
    width: 80,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'limegreen',
  },
  progressFilled: {
    width: 80,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'limegreen',
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
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
  },
  required: {
    color: 'red',
  },
  optional: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 12,
    marginTop: 6,
  },
  imagePicker: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 12,
    marginTop: 6,
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#666',
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: 'limegreen',
    borderColor: 'limegreen',
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: 'limegreen',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  signinText: {
    fontSize: 14,
    color: '#555',
  },
  signinLink: {
    color: 'green',
    fontWeight: '500',
  },
});