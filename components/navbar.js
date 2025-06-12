import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router'; 

export default function Navbar() {
  const icons = [
    {
      source: require('../assets/images/navbar/history.png'),
      route: '/history',
    },
    {
      source: require('../assets/images/navbar/recyclingStations.png'),
      route: '/recycling-stations',
    },
    {
      source: require('../assets/images/navbar/news.png'),
      route: '/news',
    },
    {
      source: require('../assets/images/navbar/scanner.png'),
      route: '/scanner',
    },
    {
      source: require('../assets/images/navbar/profile.png'),
      route: '/profile',
    },
  ];

  return (
    <View style={styles.container}>
      {icons.map((icon, index) => (
        <Link key={index} href={icon.route} asChild>
          <TouchableOpacity style={styles.button}>
            <Image source={icon.source} style={styles.icon} resizeMode="contain" />
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    width: 28,
    height: 28,
  },
});
