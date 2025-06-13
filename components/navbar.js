import React, { useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Asset } from 'expo-asset';

export default function Navbar() {
  // ✅ Preload icons to prevent flickering or missing icons
  useEffect(() => {
    Asset.loadAsync([
      require('../assets/images/navbar/history.png'),
      require('../assets/images/navbar/recyclingStations.png'),
      require('../assets/images/navbar/news.png'),
      require('../assets/images/navbar/scanner.png'),
      require('../assets/images/navbar/profile.png'),
    ]);
  }, []);

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
            <View style={styles.iconWrapper}>
              <Image source={icon.source} style={styles.icon} resizeMode="contain" />
            </View>
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
  iconWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 28,
    height: 28,
  },
});
