import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    age: "",
    email: "",
    phone: "",
    residence: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleContinue = () => {
    // Validate required fields
    if (!form.fullName || !form.age || !form.phone || !form.residence) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }
    // Optionally validate email format and age as number
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    if (isNaN(Number(form.age)) || Number(form.age) < 10) {
      Alert.alert("Error", "Please enter a valid age (10+)");
      return;
    }
    // Pass form data to step 2
    router.push({ pathname: "/signup/step2", params: { ...form } });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>We are glad to have you!</Text>
      <Text style={styles.subtitle}>Fill in this form to get started</Text>
      <Text style={styles.helper}>Let’s build a better world</Text>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressFilled} />
        <View style={styles.progressEmpty} />
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>
          Full name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="e.g Mary Doe"
          value={form.fullName}
          onChangeText={(text) => handleChange("fullName", text)}
        />

        <Text style={styles.label}>
          Age <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="16"
          keyboardType="number-pad"
          value={form.age}
          onChangeText={(text) => handleChange("age", text)}
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
        />

        <Text style={styles.optional}>ⓘ Optional</Text>
        <Text style={styles.label}>
          Phone Number <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="e.g +12345678"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(text) => handleChange("phone", text)}
        />

        <Text style={styles.label}>
          Place of Residence <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={form.residence}
          onChangeText={(text) => handleChange("residence", text)}
        />
      </View>

      {/* Continue Button */}

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* Sign In */}
      <Text style={styles.signinText}>
        Already have an account?{" "}
        <Text style={styles.signinLink} onPress={() => router.push("/login")}>
          Sign in
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 50,
    backgroundColor: "#fff",
    flexGrow: 1,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 4,
  },
  helper: {
    textAlign: "center",
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 20,
  },
  progressFilled: {
    width: 80,
    height: 10,
    borderRadius: 5,
    backgroundColor: "limegreen",
  },
  progressEmpty: {
    width: 80,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
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
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 12,
  },
  required: {
    color: "red",
  },
  optional: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 12,
    marginTop: 6,
  },
  button: {
    backgroundColor: "limegreen",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  signinText: {
    fontSize: 14,
    color: "#555",
  },
  signinLink: {
    color: "green",
    fontWeight: "500",
  },
});
