import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Link } from 'expo-router';

const RecyclingStations = () => {
  // Coordinates for Strathmore University in Nairobi
  const strathmoreLocation = {
    latitude: -1.3182,
    longitude: 36.8152,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  // Sample bin data
  const [bins, setBins] = useState([
    {
      id: '1',
      name: 'Part X Smart Bin',
      location: {
        latitude: -1.3182,
        longitude: 36.8152,
      },
      busyness: 'Moderate',
      waitingTime: 6,
      capacity: 64,
      address: 'Strathmore University, Maraka Estate, Nairobi'
    },
    {
      id: '2',
      name: 'Library Smart Bin',
      location: {
        latitude: -1.3185,
        longitude: 36.8148,
      },
      busyness: 'Low',
      waitingTime: 2,
      capacity: 30,
      address: 'Strathmore University Library'
    },
    {
      id: '3',
      name: 'Cafeteria Smart Bin',
      location: {
        latitude: -1.3178,
        longitude: 36.8156,
      },
      busyness: 'High',
      waitingTime: 10,
      capacity: 85,
      address: 'Strathmore University Cafeteria'
    },
  ]);

  const [selectedBin, setSelectedBin] = useState(null);

  // Get marker color based on capacity
  const getMarkerColor = (capacity) => {
    return capacity > 75 ? 'red' : 'green';
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchText}>Search here</Text>
      </View>

      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={strathmoreLocation}
      >
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
      <View style={styles.hamburgerMenu}>
        <Link href="/profile" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Image 
              source={require('../assets/images/navbar/profile.png')} 
              style={styles.menuIcon} 
            />
            <Text>Profile</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/news" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Image 
              source={require('../assets/images/navbar/news.png')} 
              style={styles.menuIcon} 
            />
            <Text>News</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/scanner" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Image 
              source={require('../assets/images/navbar/scanner.png')} 
              style={styles.menuIcon} 
            />
            <Text>Scan</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/recycling-stations" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Image 
              source={require('../assets/images/navbar/recyclingStations.png')} 
              style={styles.menuIcon} 
            />
            <Text>Recycling Stations</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/history" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Image 
              source={require('../assets/images/navbar/history.png')} 
              style={styles.menuIcon} 
            />
            <Text>Cash</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#f0f0f0',
  },
  searchText: {
    color: '#888',
  },
  map: {
    flex: 1,
  },
  calloutContainer: {
    width: 200,
    padding: 10,
  },
  binName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailsPanel: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
  },
  hamburgerMenu: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
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