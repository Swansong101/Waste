import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Navbar from "../components/navbar";
import { useAuth } from "../lib/AuthProvider";
import { db } from "../lib/firebase";

export default function History() {
  // const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "history"),
          where("userId", "==", user.uid),
          orderBy("date", "desc")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => doc.data());
        setHistoryData(data);
      } catch {
        setHistoryData([]);
      }
      setLoading(false);
    };
    fetchHistory();
  }, [user]);

  if (authLoading || loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="limegreen" />
      </View>
    );
  }

  const totalKgs = historyData.reduce(
    (sum, item) => sum + parseFloat(item.kgs),
    0
  );
  const totalEarnings = historyData.reduce(
    (sum, item) => sum + parseFloat(item.amount.replace("$", "")),
    0
  );

  return (
    <View style={styles.container}>
      {/* Header with Avatar */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/avatars/mary.png")}
          style={styles.avatar}
        />
      </View>
      <ScrollView style={styles.content}>
        {/* Earnings Card */}
        <View style={styles.earningsCard}>
          <Text style={styles.earningsSubtitle}>
            Your earning since{" "}
            {historyData[historyData.length - 1]?.date || "--"}
          </Text>
          <Text style={styles.earningsAmount}>${totalEarnings}</Text>
          <Text style={styles.totalKgs}>
            Total kg of plastic: {totalKgs} kg
          </Text>
        </View>
        {/* History Section */}
        <Text style={styles.historyTitle}>Your History</Text>
        {/* History Table */}
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.headerText, styles.dateColumn]}>DATE</Text>
            <Text style={[styles.headerText, styles.kgsColumn]}>KGS</Text>
            <Text style={[styles.headerText, styles.amountColumn]}>AMOUNT</Text>
            <Text style={[styles.headerText, styles.locationColumn]}>
              LOCATION
            </Text>
          </View>
          {/* Table Rows */}
          {historyData.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.cellText, styles.dateColumn]}>
                {item.date}
              </Text>
              <Text style={[styles.cellText, styles.kgsColumn]}>
                {item.kgs}
              </Text>
              <Text style={[styles.cellText, styles.amountColumn]}>
                {item.amount}
              </Text>
              <Text style={[styles.cellText, styles.locationColumn]}>
                {item.location}
              </Text>
            </View>
          ))}
        </View>
        <View style={{ height: 50 }} />
        <Navbar />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "flex-end",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "limegreen",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  earningsCard: {
    backgroundColor: "#E8F5E8",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: "center",
  },
  earningsSubtitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  earningsAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  totalKgs: {
    fontSize: 14,
    color: "#666",
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 100,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  headerText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  cellText: {
    fontSize: 14,
    color: "#333",
  },
  dateColumn: {
    flex: 2,
  },
  kgsColumn: {
    flex: 1,
    textAlign: "center",
  },
  amountColumn: {
    flex: 1.5,
    textAlign: "center",
  },
  locationColumn: {
    flex: 2,
    textAlign: "right",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    justifyContent: "space-around",
  },
  navItem: {
    alignItems: "center",
  },
  navIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  navIconText: {
    fontSize: 20,
    color: "#666",
  },
  recycleIcon: {
    backgroundColor: "limegreen",
  },
  recycleIconText: {
    fontSize: 20,
    color: "#fff",
  },
});
