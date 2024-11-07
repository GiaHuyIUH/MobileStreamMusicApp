import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const user = {
    name: "User Name",
    playlistsCount: 23,
    followersCount: 58,
    followingCount: 43,
    playlists: [
      { id: "1", title: "Shazam", likes: "7 likes", image: "https://via.placeholder.com/50" },
      { id: "2", title: "Roadtrip", likes: "4 likes", image: "https://via.placeholder.com/50" },
      { id: "3", title: "Study", likes: "5 likes", image: "https://via.placeholder.com/50" },
    ],
  };

  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity style={styles.playlistItem}>
      <Image source={{ uri: item.image }} style={styles.playlistImage} />
      <View style={styles.playlistInfo}>
        <Text style={styles.playlistTitle}>{item.title}</Text>
        <Text style={styles.playlistLikes}>{item.likes}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#888" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Library</Text>
        <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
      </View>

      {/* Profile Information */}
      <View style={styles.profileInfoContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{user.playlistsCount}</Text>
            <Text style={styles.statLabel}>PLAYLISTS</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{user.followersCount}</Text>
            <Text style={styles.statLabel}>FOLLOWERS</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{user.followingCount}</Text>
            <Text style={styles.statLabel}>FOLLOWING</Text>
          </View>
        </View>
      </View>

      {/* Playlists Section */}
      <Text style={styles.sectionTitle}>Playlists</Text>
      <FlatList
        data={user.playlists}
        renderItem={renderPlaylistItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.playlistList}
        ListFooterComponent={
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See all playlists</Text>
            <Ionicons name="chevron-forward" size={16} color="#1DB954" />
          </TouchableOpacity>
        }
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIconContainer} onPress={() => navigation.navigate('Main', { screen: 'Home' })}>
          <Ionicons name="home-outline" size={24} color="#fff" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIconContainer} onPress={() => navigation.navigate('Main', { screen: 'Search' })}>
          <Ionicons name="search-outline" size={24} color="#fff" />
          <Text style={styles.footerText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIconContainer} onPress={() => navigation.navigate('Main', { screen: 'Library' })}>
          <Ionicons name="library-outline" size={24} color="#fff" />
          <Text style={styles.footerText}>Your Library</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileInfoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#333",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 20,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 10,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#888",
    fontSize: 12,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  playlistList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  playlistItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#282828",
  },
  playlistImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  playlistInfo: {
    flex: 1,
  },
  playlistTitle: {
    color: "#fff",
    fontSize: 16,
  },
  playlistLikes: {
    color: "#888",
    fontSize: 12,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
  },
  seeAllText: {
    color: "#1DB954",
    fontWeight: "bold",
    marginRight: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#121212',
    borderTopWidth: 1,
    borderTopColor: '#282828',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerIconContainer: {
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});

export default ProfileScreen;
