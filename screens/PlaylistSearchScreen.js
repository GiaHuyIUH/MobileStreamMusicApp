import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const PlaylistSearchScreen = () => {
  const navigation = useNavigation(); // Sử dụng useNavigation để lấy navigation

  const playlistData = {
    cover: "https://via.placeholder.com/300",
    title: "Indie Pop",
    description: "New and approved indie pop. Cover: No Rome",
    likes: "1,629,592",
    duration: "6h 48m",
  };

  const tracks = [
    { id: "1", title: "Easy", artist: "Troye Sivan" },
    { id: "2", title: "chance with you", artist: "mehro" },
    { id: "3", title: "Nirvana", artist: "Unknown" },
  ];

  const renderTrackItem = ({ item }) => (
    <View style={styles.trackItem}>
      <Image
        source={{ uri: "https://via.placeholder.com/50" }}
        style={styles.trackImage}
      />
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{item.title}</Text>
        <Text style={styles.trackArtist}>{item.artist}</Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back, Search, and Sort */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#888" />
          <TextInput
            placeholder="Find in playlist"
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortText}>Sort</Text>
        </TouchableOpacity>
      </View>

      {/* Playlist Info Section */}
      <View style={styles.playlistInfo}>
        <Image source={{ uri: playlistData.cover }} style={styles.playlistCover} />
        <Text style={styles.playlistOverlayText}>{playlistData.title}</Text>
        <Text style={styles.playlistDescription}>{playlistData.description}</Text>
        <View style={styles.playlistDetails}>
          <View style={styles.playlistIcons}>
            <MaterialCommunityIcons name="spotify" size={16} color="#1DB954" />
            <Text style={styles.spotifyText}>Spotify</Text>
          </View>
          <Text style={styles.playlistDetailsText}>
            {playlistData.likes} likes • {playlistData.duration}
          </Text>
        </View>
        <View style={styles.actionIcons}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="download-outline" size={24} color="#fff" style={styles.iconSpacing} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={24} color="#fff" style={styles.iconSpacing} />
          </TouchableOpacity>
        </View>
        {/* Adjusted Play Button */}
        <TouchableOpacity style={styles.playButton}>
          <MaterialCommunityIcons name="play-circle" size={50} color="#1DB954" />
        </TouchableOpacity>
      </View>

      {/* Track List */}
      <FlatList
        data={tracks}
        renderItem={renderTrackItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.trackList}
        showsVerticalScrollIndicator={false}
      />

      {/* Now Playing Bar */}
      <View style={styles.nowPlayingBar}>
        <Image
          source={{ uri: "https://via.placeholder.com/40" }}
          style={styles.nowPlayingImage}
        />
        <View style={styles.nowPlayingInfo}>
          <Text style={styles.nowPlayingTitle}>Easy - Troye Sivan</Text>
          <Text style={styles.nowPlayingSource}>BEATSPILL+</Text>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons name="bluetooth" size={20} color="#1DB954" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="pause" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerIconContainer}
          onPress={() => navigation.navigate("MainTabs", { screen: "Home" })}
        >
          <Ionicons name="home-outline" size={24} color="#fff" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerIconContainer}
          onPress={() => navigation.navigate("MainTabs", { screen: "Search" })}
        >
          <Ionicons name="search-outline" size={24} color="#fff" />
          <Text style={styles.footerText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerIconContainer}
          onPress={() => navigation.navigate("MainTabs", { screen: "Library" })}
        >
          <Ionicons name="library-outline" size={24} color="#fff" />
          <Text style={styles.footerText}>Your Library</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginLeft: 10,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    marginLeft: 8,
    padding: 7,
  },
  sortButton: {
    marginLeft: 10,
  },
  sortText: {
    color: "#fff",
    fontSize: 14,
  },
  playlistInfo: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
  },
  playlistCover: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  playlistOverlayText: {
    position: "absolute",
    top: "45%",
    alignSelf: "center",
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  playlistDescription: {
    color: "#B0B0B0",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
  playlistDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  playlistIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  spotifyText: {
    color: "#1DB954",
    fontSize: 14,
    marginLeft: 5,
  },
  playlistDetailsText: {
    color: "#B0B0B0",
    fontSize: 12,
    marginLeft: 10,
  },
  actionIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 5,
    marginTop: 10,
  },
  iconSpacing: {
    marginLeft: 20,
  },
  playButton: {
    position: "absolute",
    right: 5, 
    bottom: 0, 
  },
  trackList: {
    paddingHorizontal: 20,
    paddingBottom: 70,
  },
  trackItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomColor: "#282828",
    borderBottomWidth: 1,
  },
  trackImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 10,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    color: "#fff",
    fontSize: 16,
  },
  trackArtist: {
    color: "#B0B0B0",
    fontSize: 14,
  },
  nowPlayingBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#282828",
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: "absolute",
    bottom: 55,
    left: 0,
    right: 0,
  },
  nowPlayingImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 10,
  },
  nowPlayingInfo: {
    flex: 1,
  },
  nowPlayingTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  nowPlayingSource: {
    color: "#1DB954",
    fontSize: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#121212",
    borderTopWidth: 1,
    borderTopColor: "#282828",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerIconContainer: {
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
});

export default PlaylistSearchScreen;
