import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../lib/firebase";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    phoneNumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleContinue = async () => {
    try {
      if (!form.phoneNumber || !form.password) {
        Alert.alert("Error", "Please fill all required fields");
        return;
      }
      setLoading(true);
      // Use phone as email if email login is not used
      const email = form.phoneNumber.includes("@")
        ? form.phoneNumber
        : `${form.phoneNumber.replace(/[^\d]/g, "")}@wasteapp.com`;
      await signInWithEmailAndPassword(auth, email, form.password);
      setLoading(false);
      router.replace("/home");
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Let&apos;s build a better world</Text>
      <View style={styles.form}>
        <Text style={styles.label}>
          Phone number <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="e.g +1234567"
          keyboardType="phone-pad"
          value={form.phoneNumber}
          onChangeText={(text) => handleChange("phoneNumber", text)}
        />
        <Text style={styles.label}>
          Password <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder=""
          secureTextEntry
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Continue</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.signupText}>
        Don&apos;t have an account?{" "}
        <Text
          style={styles.signupLink}
          onPress={() => router.push("/signup/step1")}
        >
          Sign up
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 80,
    backgroundColor: "#fff",
    flexGrow: 1,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginBottom: 40,
  },
  form: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 12,
    marginBottom: 6,
  },
  required: {
    color: "red",
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "limegreen",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  signupText: {
    fontSize: 14,
    color: "#555",
  },
  signupLink: {
    color: "green",
    fontWeight: "500",
  },
});
