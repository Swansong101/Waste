import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Navbar from "../components/navbar";
import { db } from "../lib/firebase";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "news"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setNews(data);
      } catch {
        setNews([]);
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  const openStub = (title) => Alert.alert(title, "Coming soon!");

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3BAA58" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ===== Header ===== */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/news/titlePlasticBag.png")}
          style={styles.headerIcon}
        />
        <Text style={styles.headerTitle}>NEWS</Text>
        <Image
          source={require("../assets/images/news/titlePlasticBottle.png")}
          style={styles.headerIcon}
        />
      </View>
      {/* ===== News Articles ===== */}
      {news.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          No news available.
        </Text>
      ) : (
        news.map((article, idx) => (
          <View
            key={idx}
            style={[
              styles.articleCard,
              { backgroundColor: article.bgColor || "#E1F7E4" },
            ]}
          >
            <Image
              source={
                article.image
                  ? { uri: article.image }
                  : require("../assets/images/news/noPlasticBags.png")
              }
              style={styles.articleImage}
            />
            <View style={styles.articleBody}>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <Text style={styles.articleText} numberOfLines={3}>
                {article.text}
              </Text>
              <TouchableOpacity onPress={() => openStub(article.title)}>
                <Text style={styles.readMore}>Read Full Article</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
      <View style={{ height: 230 }} />
      <Navbar />
    </ScrollView>
  );
}

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  /* header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginHorizontal: 8,
  },
  headerIcon: {
    width: 26,
    height: 26,
  },

  /* article card */
  articleCard: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  articleImage: {
    width: 110,
    height: 110,
  },
  articleBody: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  articleTitle: {
    fontWeight: "700",
    marginBottom: 4,
  },
  articleText: {
    fontSize: 12,
    lineHeight: 16,
  },
  readMore: {
    marginTop: 6,
    fontSize: 12,
    color: "#2360e8",
    textDecorationLine: "underline",
  },
});
