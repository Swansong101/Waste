import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Navbar from '../components/navbar';        

export default function NewsPage() {
  const openStub = (title) => Alert.alert(title, 'Coming soon!');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ===== Header ===== */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/news/titlePlasticBag.png')}
          style={styles.headerIcon}
        />
        <Text style={styles.headerTitle}>NEWS</Text>
        <Image
          source={require('../assets/images/news/titlePlasticBottle.png')}
          style={styles.headerIcon}
        />
      </View>

      {/* ===== Article 1 ===== */}
      <View style={[styles.articleCard, { backgroundColor: '#E1F7E4' }]}>
        <Image
          source={require('../assets/images/news/noPlasticBags.png')}
          style={styles.articleImage}
        />

        <View style={styles.articleBody}>
          <Text style={styles.articleTitle}>Country X Bans Plastic Bags</Text>
          <Text style={styles.articleText}>
            Country X has announced a nationwide ban on single‑use plastic bags,
            set to take effect next month. Shoppers are encouraged to switch to
            reusable bags as part of the green initiative.
          </Text>

          <TouchableOpacity onPress={() => openStub('Plastic‑Bag Ban')}>
            <Text style={styles.readMore}>Read Full Article</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ===== Article 2 ===== */}
      <View style={[styles.articleCard, { backgroundColor: '#F5E6F4' }]}>
        <Image
          source={require('../assets/images/news/typesOfPlastics.png')}
          style={styles.articleImage}
        />

        <View style={styles.articleBody}>
          <Text style={styles.articleTitle}>Types of Plastics</Text>
          <Text style={styles.articleText} numberOfLines={3}>
            Learn the seven common resin codes, how to recognise them, and which
            plastics are easiest to recycle.
          </Text>

          <TouchableOpacity onPress={() => openStub('Types of Plastics')}>
            <Text style={styles.readMore}>Read Full Article</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ===== Article 3 ===== */}
      <View style={[styles.articleCard, { backgroundColor: '#FFF9D9' }]}>
        <Image
          source={require('../assets/images/news/plasticWasteGraph.png')}
          style={styles.articleImage}
        />

        <View style={styles.articleBody}>
          <Text style={styles.articleTitle}>Plastic Wastes since 2010</Text>
          <Text style={styles.articleText} numberOfLines={3}>
            A decade‑long view of global plastic production versus recycling
            rates — where do we stand today?
          </Text>

          <TouchableOpacity onPress={() => openStub('Plastic Waste Stats')}>
            <Text style={styles.readMore}>Read Full Article</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: 230 }} />

      <Navbar />
    </ScrollView>
  );
}

/* ---------- styles ---------- */
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  /* header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginHorizontal: 8,
  },
  headerIcon: {
    width: 26,
    height: 26,
  },

  /* article card */
  articleCard: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  articleImage: {
    width: 110,
    height: 110,
  },
  articleBody: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  articleTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },
  articleText: {
    fontSize: 12,
    lineHeight: 16,
  },
  readMore: {
    marginTop: 6,
    fontSize: 12,
    color: '#2360e8',
    textDecorationLine: 'underline',
  },
});
