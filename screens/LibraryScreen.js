import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LibraryScreen = ({ navigation }) => {
  const sections = [
    {
      id: "1",
      title: "Liked Songs",
      type: "Playlist",
      songs: "58 songs",
      icon: "heart",
      color: "#1DB954",
    },
    {
      id: "2",
      title: "New Episodes",
      type: "Playlist",
      updated: "Updated 2 days ago",
      icon: "notifications",
      color: "#A020F0",
    },
    {
      id: "3",
      title: "Lolo Zouaï",
      type: "Artist",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "4",
      title: "Lana Del Rey",
      type: "Artist",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "5",
      title: "Front Left",
      type: "Playlist - Spotify",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "6",
      title: "Marvin Gaye",
      type: "Artist",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "7",
      title: "Les",
      type: "Song - Childish Gambino",
      image: "https://via.placeholder.com/50",
    },
  ];

  const renderLibraryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.libraryItem}
      onPress={() => navigation.navigate("Profile", { item })} // Navigate to ProfileScreen with item data
    >
      <View style={styles.iconContainer}>
        {item.icon ? (
          <Ionicons name={item.icon} size={24} color={item.color} />
        ) : (
          <Image source={{ uri: item.image }} style={styles.libraryImage} />
        )}
      </View>
      <View style={styles.libraryTextContainer}>
        <Text style={styles.libraryTitle}>{item.title}</Text>
        <Text style={styles.librarySubtitle}>
          {item.type} {item.songs ? `- ${item.songs}` : ""}
          {item.updated ? ` - ${item.updated}` : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Library</Text>
        <TouchableOpacity>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Playlists</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Artists</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Albums</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Podcasts & Shows</Text>
        </TouchableOpacity>
      </View>

      {/* Library Items List */}
      <FlatList
        data={sections}
        renderItem={renderLibraryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.libraryList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#333",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 5,
  },
  filterText: {
    color: "#fff",
    fontSize: 14,
  },
  libraryList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  libraryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#282828",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  libraryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  libraryTextContainer: {
    flex: 1,
  },
  libraryTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  librarySubtitle: {
    color: "#B0B0B0",
    fontSize: 14,
  },
});

export default LibraryScreen;
