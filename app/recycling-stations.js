import { Link } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { db } from "../lib/firebase";

const RecyclingStations = () => {
  // Coordinates for Strathmore University in Nairobi
  const strathmoreLocation = {
    latitude: -1.3182,
    longitude: 36.8152,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const [bins, setBins] = useState([]);
  const [selectedBin, setSelectedBin] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBins = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "bins"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBins(data);
      } catch {
        setBins([]);
      }
      setLoading(false);
    };
    fetchBins();
  }, []);

  // Get marker color based on capacity
  const getMarkerColor = (capacity) => {
    return capacity > 75 ? "red" : "green";
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3BAA58" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with Hamburger Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Image
            source={require("../assets/images/hamburger.png")}
            style={styles.hamburgerIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>RECYCLING STATIONS</Text>
        <View style={{ width: 30 }} />
      </View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchText}>Search here</Text>
      </View>
      {/* Map View */}
      <MapView style={styles.map} initialRegion={strathmoreLocation}>
        {bins.map((bin) => (
          <Marker
            key={bin.id}
            coordinate={bin.location}
            pinColor={getMarkerColor(bin.capacity)}
            onPress={() => setSelectedBin(bin)}
          >
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.binName}>{bin.name}</Text>
                <Text>Current Busyness: {bin.busyness}</Text>
                <Text>Average Waiting Time: {bin.waitingTime} minutes</Text>
                <Text>Capacity Level: {bin.capacity}% full</Text>
                <Text>Location: {bin.address}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      {/* Bin Details Panel */}
      {selectedBin && (
        <View style={styles.detailsPanel}>
          <Text style={styles.binName}>{selectedBin.name}</Text>
          <Text>Current Busyness: {selectedBin.busyness}</Text>
          <Text>Average Waiting Time: {selectedBin.waitingTime} minutes</Text>
          <Text>Capacity Level: {selectedBin.capacity}% full</Text>
          <Text>Location: {selectedBin.address}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedBin(null)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Hamburger Menu */}
      {menuVisible && (
        <View style={styles.hamburgerMenu}>
          <Link href="/profile" asChild>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => setMenuVisible(false)}
            >
              <Image
                source={require("../assets/images/navbar/profile.png")}
                style={styles.menuIcon}
              />
              <Text>Profile</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/news" asChild>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => setMenuVisible(false)}
            >
              <Image
                source={require("../assets/images/navbar/news.png")}
                style={styles.menuIcon}
              />
              <Text>News</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/scanner" asChild>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => setMenuVisible(false)}
            >
              <Image
                source={require("../assets/images/navbar/scanner.png")}
                style={styles.menuIcon}
              />
              <Text>Scan</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setMenuVisible(false)}
          >
            <Image
              source={require("../assets/images/navbar/recyclingStations.png")}
              style={styles.menuIcon}
            />
            <Text>Recycling Stations</Text>
          </TouchableOpacity>
          <Link href="/history" asChild>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => setMenuVisible(false)}
            >
              <Image
                source={require("../assets/images/navbar/history.png")}
                style={styles.menuIcon}
              />
              <Text>Cash</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  hamburgerIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchContainer: {
    padding: 15,
    backgroundColor: "#f0f0f0",
  },
  searchText: {
    color: "#888",
  },
  map: {
    flex: 1,
  },
  calloutContainer: {
    width: 200,
    padding: 10,
  },
  binName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailsPanel: {
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
  },
  hamburgerMenu: {
    position: "absolute",
    top: 80,
    left: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    padding: 10,
    zIndex: 1000,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});

export default RecyclingStations;
