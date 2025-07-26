import { useLocalSearchParams, useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../../lib/firebase";

export default function SignupStep2() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleContinue = async () => {
    try {
      if (!form.password || !form.confirmPassword) {
        Alert.alert("Error", "Please fill all required fields");
        return;
      }
      if (form.password !== form.confirmPassword) {
        Alert.alert("Error", "Passwords do not match");
        return;
      }
      setLoading(true);
      // Use email if provided, otherwise fallback to phone as email
      const email =
        params.email || `${params.phone.replace(/[^\d]/g, "")}@wasteapp.com`;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        form.password
      );
      const user = userCredential.user;
      // Store user profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName: params.fullName,
        age: params.age,
        email: params.email || "",
        phone: params.phone,
        residence: params.residence,
        profileImage: form.profileImage,
        pledgeRecycle: false, // Default to false
        createdAt: new Date().toISOString(),
      });
      setLoading(false);
      router.replace("/home");
    } catch (error) {
      setLoading(false);
      Alert.alert("Signup failed", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Set your password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={form.confirmPassword}
        onChangeText={(text) => handleChange("confirmPassword", text)}
      />
      {/* Profile image picker and pledge checkbox can go here */}
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
  progressCompleted: {
    width: 80,
    height: 10,
    borderRadius: 5,
    backgroundColor: "limegreen",
  },
  progressFilled: {
    width: 80,
    height: 10,
    borderRadius: 5,
    backgroundColor: "limegreen",
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
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 12,
    marginTop: 6,
  },
  imagePicker: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 12,
    marginTop: 6,
    alignItems: "center",
  },
  imagePickerText: {
    color: "#666",
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ccc",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "limegreen",
    borderColor: "limegreen",
  },
  checkmark: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  checkboxText: {
    fontSize: 14,
    color: "#333",
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
