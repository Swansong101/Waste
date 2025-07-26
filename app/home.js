import { useRouter } from "expo-router";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Circle, Svg } from "react-native-svg";
import Navbar from "../components/navbar";
import { useAuth } from "../lib/AuthProvider";
import { db } from "../lib/firebase";

const HomeScreen = () => {
  const router = useRouter();
  const { userData, loading: authLoading } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const q = query(
          collection(db, "users"),
          orderBy("totalRecycled", "desc"),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc, idx) => ({
          ...doc.data(),
          id: doc.id,
          rank: idx + 1,
        }));
        setLeaderboard(data);
      } catch {
        setLeaderboard([]);
      }
      setLoading(false);
    };
    fetchLeaderboard();
  }, []);

  if (authLoading || loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3BAA58" />
      </View>
    );
  }

  const currentUser = userData || {};
  const avatarSource = currentUser.profileImage
    ? { uri: currentUser.profileImage }
    : require("../assets/images/avatars/mary.png"); // fallback

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hello,{" "}
          <Text style={{ color: "#3BAA58" }}>
            {currentUser.fullName || "User"}
          </Text>
        </Text>
        <Text style={styles.subtext}>You are doing great 🥳</Text>
        <Image source={avatarSource} style={styles.avatar} />
      </View>
      {/* Monthly Report */}
      <View style={styles.section}>
        <Text style={styles.reportTitle}>
          Here is your <Text style={{ fontWeight: "700" }}>monthly</Text> report
        </Text>
        <View style={styles.circularContainer}>
          <Svg height="200" width="200">
            <Circle
              cx="100"
              cy="100"
              r="90"
              stroke="#000"
              strokeWidth="20"
              fill="none"
              strokeDasharray="565"
              strokeDashoffset="113"
              strokeLinecap="round"
            />
            <Circle
              cx="100"
              cy="100"
              r="90"
              stroke="url(#grad)"
              strokeWidth="20"
              fill="none"
              strokeDasharray="452"
              strokeDashoffset="0"
              strokeLinecap="round"
            />
          </Svg>
          <Text style={styles.kgLabel}>{currentUser.totalRecycled || 0}kg</Text>
          <Text style={styles.kgSub}>🍃</Text>
        </View>
        <Text style={styles.reportText}>
          You recycled{" "}
          <Text style={{ fontWeight: "700" }}>
            {currentUser.totalRecycled || 0}kgs
          </Text>{" "}
          of plastics this month
        </Text>
        <TouchableOpacity>
          <Text style={styles.link}>See your Carbon Footprint ↗</Text>
        </TouchableOpacity>
        <Image
          source={require("../assets/images/bar-chart.png")}
          style={styles.barChart}
        />
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => router.push("/history")}
        >
          <Text style={styles.historyButtonText}>View history</Text>
        </TouchableOpacity>
      </View>
      {/* Leaderboard */}
      <View style={styles.section}>
        <Text style={styles.leaderboardTitle}>Leaderboard</Text>
        <TouchableOpacity style={styles.monthDropdown}>
          <Text style={{ fontWeight: "600" }}>March ⌄</Text>
        </TouchableOpacity>
        <View style={styles.leaderboard}>
          {leaderboard.map((user, index) => (
            <View key={user.id} style={styles.userRow}>
              <Text>{user.rank}.</Text>
              <Image
                source={
                  user.profileImage
                    ? { uri: user.profileImage }
                    : require("../assets/images/avatars/mary.png")
                }
                style={styles.leaderAvatar}
              />
              <Text style={styles.username}>
                {user.fullName || user.email || "User"}
              </Text>
              <View style={styles.badges}>
                {/* Example: badges can be calculated based on totalRecycled */}
                {user.totalRecycled >= 3 && <Text>🥇</Text>}
                {user.totalRecycled >= 2 && user.totalRecycled < 3 && (
                  <Text>🥈</Text>
                )}
                {user.totalRecycled >= 1 && user.totalRecycled < 2 && (
                  <Text>🥉</Text>
                )}
              </View>
              <Text style={styles.weight}>{user.totalRecycled || 0}kg</Text>
            </View>
          ))}
        </View>
        <Navbar />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    position: "relative",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
  },
  subtext: {
    fontSize: 14,
    color: "#444",
  },
  avatar: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  section: {
    padding: 20,
  },
  reportTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  circularContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  kgLabel: {
    position: "absolute",
    fontSize: 22,
    fontWeight: "800",
  },
  kgSub: {
    position: "absolute",
    top: 120,
    fontSize: 18,
  },
  reportText: {
    textAlign: "center",
    marginVertical: 10,
  },
  link: {
    color: "#3BAA58",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  barChart: {
    height: 150,
    resizeMode: "contain",
    marginVertical: 10,
    alignSelf: "center",
  },
  historyButton: {
    backgroundColor: "#3BAA58",
    padding: 12,
    borderRadius: 25,
    marginTop: 10,
    alignSelf: "center",
    paddingHorizontal: 30,
  },
  historyButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  leaderboardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  monthDropdown: {
    backgroundColor: "#f3f3f3",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  leaderboard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    gap: 10,
  },
  leaderAvatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  username: {
    flex: 1,
    fontWeight: "600",
  },
  badges: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    minWidth: 170,
  },
  weight: {
    fontWeight: "600",
  },
});

export default HomeScreen;
