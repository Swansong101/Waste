import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LandingScreen() {
  const router = useRouter();

  const handleRecycleNow = () => {
    router.push("/signup/step1"); // Always go to signup step 1
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/hero.png")}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>WASTEMART</Text>
        <Text style={styles.subtitle}>
          Trash to Treasure – Let&apos;s Build a Better World
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleRecycleNow}>
          <Text style={styles.buttonText}>♻ Recycle Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C1F5FF",
    position: "relative",
    paddingTop: 60,
  },
  textContainer: {
    paddingHorizontal: 30,
    zIndex: 1,
    alignItems: "flex-start",
    paddingBottom: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0C4C60",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#E0FFEF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 1 },
    elevation: 2,
  },
  buttonText: {
    color: "#2C9B61",
    fontWeight: "600",
  },
  image: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 580,
    width: "100%",
  },
});
