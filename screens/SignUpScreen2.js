import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Artists, songs, or podcasts"
            placeholderTextColor="#B3B3B3"
            style={styles.searchInput}
          />
        </View>

        {/* Your Top Genres */}
        <Text style={styles.sectionTitle}>Your top genres</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topGenres.map((genre, index) => (
            <TouchableOpacity key={index} style={[styles.genreCard, { backgroundColor: genre.color }]}>
              <Image source={{ uri: genre.image }} style={styles.genreImage} />
              <Text style={styles.genreText}>{genre.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Popular Podcast Categories */}
        <Text style={styles.sectionTitle}>Popular podcast categories</Text>
        <View style={styles.categoryContainer}>
          {podcastCategories.map((category, index) => (
            <TouchableOpacity key={index} style={[styles.categoryCard, { backgroundColor: category.color }]}>
              <Image source={{ uri: category.icon }} style={styles.categoryIcon} />
              <Text style={styles.categoryText}>{category.name}</Text>
              <Text style={styles.categorySubtitle}>Album</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Browse All */}
        <Text style={styles.sectionTitle}>Browse all</Text>
        <View style={styles.categoryContainer}>
          {browseAll.map((item, index) => (
            <TouchableOpacity key={index} style={[styles.categoryCard, { backgroundColor: item.color }]}>
              <Image source={{ uri: item.icon }} style={styles.categoryIcon} />
              <Text style={styles.categoryText}>{item.name}</Text>
              <Text style={styles.categorySubtitle}>Album</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Currently Playing Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Easy</Text>
        <Text style={styles.footerSubtitle}>Troye Sivan</Text>
        <Text style={styles.footerInfo}>BEATSPILL+</Text>
      </View>
    </SafeAreaView>
  );
};

const topGenres = [
  { name: "Pop", color: "#5E27FD", image: "https://i.imgur.com/Z7yC4kE.png" },
  { name: "Indie", color: "#2BB673", image: "https://i.imgur.com/TI6H7pe.png" },
];

const podcastCategories = [
  { name: "News & Politics", color: "#007AFF", icon: "https://i.imgur.com/YoN7avT.png" },
  { name: "Comedy", color: "#FF5C5C", icon: "https://i.imgur.com/1c5HTD7.png" },
];

const browseAll = [
  { name: "2021 Wrapped", color: "#5E27FD", icon: "https://i.imgur.com/xHQaXeC.png" },
  { name: "Podcasts", color: "#2BB673", icon: "https://i.imgur.com/1c5HTD7.png" },
  { name: "Made for you", color: "#007AFF", icon: "https://i.imgur.com/1c5HTD7.png" },
  { name: "Charts", color: "#FF5C5C", icon: "https://i.imgur.com/1c5HTD7.png" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollView: {
    padding: 20,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#282828",
    borderRadius: 10,
    padding: 10,
    color: "#FFFFFF",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  genreCard: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
    elevation: 5,
  },
  genreImage: {
    width: 60,
    height: 60,
    position: "absolute",
    top: 10,
  },
  genreText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryCard: {
    width: "48%",
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    elevation: 5,
  },
  categoryText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
  },
  categorySubtitle: {
    color: "#B3B3B3",
    fontSize: 12,
  },
  categoryIcon: {
    width: 24,
    height: 24,
    position: "absolute",
    top: 10,
  },
  footer: {
    backgroundColor: "#282828",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerSubtitle: {
    color: "#B3B3B3",
    fontSize: 12,
  },
  footerInfo: {
    color: "#1DB954",
    fontSize: 12,
  },
});

export default App;
