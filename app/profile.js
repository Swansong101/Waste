import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Navbar from "../components/navbar";
import { useAuth } from "../lib/AuthProvider";
import { db } from "../lib/firebase";

export default function Profile() {
  const { user, userData, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState(null);
  const [editableFields, setEditableFields] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData({ ...userData });
      setEditableFields({
        name: false,
        age: false,
        email: false,
        phone: false,
        residence: false,
      });
    }
  }, [userData]);

  if (authLoading || !formData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3BAA58" />
      </View>
    );
  }

  const toggleEdit = (field) => {
    setEditableFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const update = {
        fullName: formData.name,
        age: formData.age,
        email: formData.email,
        phone: formData.phone,
        residence: formData.residence,
      };
      await updateDoc(doc(db, "users", user.uid), update);
      setLoading(false);
      Alert.alert("Success", "Profile updated successfully!");
      // Optionally, set all fields to non-editable
      setEditableFields({
        name: false,
        age: false,
        email: false,
        phone: false,
        residence: false,
      });
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Summary */}
      <View style={styles.profileBox}>
        <Image
          source={
            formData.profileImage
              ? { uri: formData.profileImage }
              : require("../assets/images/avatars/mary.png")
          }
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.info}>
            Name: {formData.name || formData.fullName}
          </Text>
          <Text style={styles.info}>Age: {formData.age}</Text>
          <Text style={styles.info}>Location: {formData.residence}</Text>
          <Text style={styles.info}>Email: {formData.email}</Text>
          <Text style={styles.info}>Phone Number: {formData.phone}</Text>
        </View>
      </View>
      {/* Editable Form Fields */}
      <View style={styles.formBox}>
        {[
          { label: "Full name", key: "name", required: true },
          { label: "Age", key: "age", required: true },
          { label: "E-mail", key: "email", required: false },
          { label: "Phone Number", key: "phone", required: true },
          { label: "Place of Residence", key: "residence", required: true },
        ].map((field) => (
          <View key={field.key} style={styles.formGroup}>
            <Text style={styles.label}>
              {field.label}{" "}
              {field.required && <Text style={{ color: "red" }}>*</Text>}
            </Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[
                  styles.input,
                  editableFields[field.key] && styles.editableInput,
                ]}
                value={formData[field.key] || ""}
                editable={editableFields[field.key]}
                onChangeText={(text) => handleChange(field.key, text)}
              />
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => toggleEdit(field.key)}
              >
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>SAVE</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={{ height: 70 }} />
      {/* Navbar */}
      <Navbar />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  profileBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  profileInfo: {
    flex: 1,
  },
  info: {
    fontSize: 14,
    marginBottom: 4,
  },
  formBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    borderColor: "#eee",
    borderWidth: 1,
  },
  formGroup: {
    marginBottom: 12,
  },
  label: {
    fontWeight: "600",
    marginBottom: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f4f4f4",
    borderRadius: 4,
  },
  editableInput: {
    backgroundColor: "#e6f7ff",
  },
  editButton: {
    backgroundColor: "#00CFFF",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginLeft: 8,
    borderRadius: 4,
  },
  editText: {
    color: "#fff",
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#66DD65",
    padding: 14,
    borderRadius: 24,
    alignItems: "center",
    marginTop: 16,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
