import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchScreen2 = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [editable, setEditable] = useState(true);

  const handleSearch = (text) => {
    setQuery(text);
    const simulatedResults = [
      { id: "1", title: "FKA twigs", type: "Artist", image: "https://via.placeholder.com/50" },
      { id: "2", title: "Hozier", type: "Artist", image: "https://via.placeholder.com/50" },
      { id: "3", title: "Grimes", type: "Artist", image: "https://via.placeholder.com/50" },
    ].filter((item) => item.title.toLowerCase().includes(text.toLowerCase()));
    setResults(simulatedResults);
  };

  const handleCancel = () => {
    setQuery("");
    setResults([]);
    setEditable(false);
    setTimeout(() => setEditable(true), 0);
  };

  const genres = [
    { id: "1", title: "Pop", color: "#D147A3", image: "https://via.placeholder.com/100" },
    { id: "2", title: "Indie", color: "#73A942", image: "https://via.placeholder.com/100" },
  ];

  const podcasts = [
    { id: "1", title: "News & Politics", color: "#4B93FC", image: "https://via.placeholder.com/100" },
    { id: "2", title: "Comedy", color: "#E14D2A", image: "https://via.placeholder.com/100" },
  ];

  const browseAll = [
    { id: "1", title: "2021 Wrapped", color: "#9DAF08", image: "https://via.placeholder.com/100" },
    { id: "2", title: "Podcasts", color: "#1E50A2", image: "https://via.placeholder.com/100" },
    { id: "3", title: "Made for you", color: "#71A6D2", image: "https://via.placeholder.com/100" },
    { id: "4", title: "Charts", color: "#E67232", image: "https://via.placeholder.com/100" },
  ];

  const renderGenreItem = ({ item }) => (
    <View style={[styles.genreBox, { backgroundColor: item.color }]}>
      <Text style={styles.genreText}>{item.title}</Text>
      <Image source={{ uri: item.image }} style={styles.genreImage} />
    </View>
  );

  const renderPodcastItem = ({ item }) => (
    <View style={[styles.genreBox, { backgroundColor: item.color }]}>
      <Text style={styles.genreText}>{item.title}</Text>
      <Image source={{ uri: item.image }} style={styles.genreImage} />
    </View>
  );

  const renderBrowseItem = ({ item }) => (
    <View style={[styles.genreBox, { backgroundColor: item.color, width: "48%" }]}>
      <Text style={styles.genreText}>{item.title}</Text>
      <Image source={{ uri: item.image }} style={styles.genreImage} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Thanh tìm kiếm cố định */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchTitle}>Search</Text>
        <TouchableOpacity style={styles.cameraIcon}>
          <Ionicons name="camera-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Artists, songs, or podcasts"
          placeholderTextColor="#888"
          value={query}
          editable={editable}
          onChangeText={handleSearch}
        />
      </View>

      {/* Nội dung có thể cuộn */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Your Top Genres */}
        <Text style={styles.sectionTitle}>Your top genres</Text>
        <FlatList
          data={genres}
          renderItem={renderGenreItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genreContainer}
        />

        {/* Popular Podcast Categories */}
        <Text style={styles.sectionTitle}>Popular podcast categories</Text>
        <FlatList
          data={podcasts}
          renderItem={renderPodcastItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genreContainer}
        />

        {/* Browse All */}
        <Text style={styles.sectionTitle}>Browse all</Text>
        <FlatList
          data={browseAll}
          renderItem={renderBrowseItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.browseAllContainer}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </ScrollView>

      {/* Footer hiển thị bài hát đang phát */}
      <View style={styles.footerPlayer}>
        <Image
          source={{ uri: "https://via.placeholder.com/50" }}
          style={styles.footerImage}
        />
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerSongTitle} numberOfLines={1}>
            Easy - Troye Sivan
          </Text>
          <Text style={styles.footerDeviceName}>BEATSPILL+</Text>
        </View>
        <Ionicons name="bluetooth" size={20} color="#1DB954" style={styles.footerIcon} />
        <Ionicons name="pause" size={24} color="#fff" style={styles.footerIcon} />
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  searchTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  cameraIcon: {
    paddingRight: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
    color: "#888",
  },
  searchInput: {
    flex: 1,
    color: "#000",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  genreContainer: {
    marginBottom: 20,
  },
  browseAllContainer: {
    justifyContent: "space-between",
  },
  genreBox: {
    width: 150,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
  },
  genreText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  genreImage: {
    width: "80%",
    height: 60,
    resizeMode: "contain",
    marginTop: 5,
  },
  footerPlayer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1C",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#282828",
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 5,
  },
  footerImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  footerTextContainer: {
    flex: 1,
  },
  footerSongTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  footerDeviceName: {
    color: "#1DB954",
    fontSize: 12,
  },
  footerIcon: {
    marginLeft: 15,
  },
  progressBarContainer: {
    height: 3,
    backgroundColor: "#555",
    borderRadius: 2,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  progressBar: {
    width: "60%", 
    height: "100%",
    backgroundColor: "#1DB954",
    borderRadius: 2,
  },
});

export default SearchScreen2;
