import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

export default (LibraryScreen) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: "../assets/images/Artist2.png" }} 
            style={styles.profileIcon}
          />
          <Text style={styles.headerText}>Your Library</Text>
          <Image
            source={{ uri: "../assets/images/plus.png" }} 
            style={styles.iconSmall}
          />
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <CategoryButton label="Playlists" />
          <CategoryButton label="Artists" />
          <CategoryButton label="Albums" />
          <CategoryButton label="Podcasts & Shows" large />
        </View>

        {/* Recently Played */}
        <View style={styles.recentlyPlayedContainer}>
          <Image
            source={{ uri: "../assets/images/upicon.png" }} 
            style={styles.recentlyPlayedIcon}
          />
          <Text style={styles.recentlyPlayedText}>Recently played</Text>
          <View style={{ flex: 1 }} /> {/* Spacer */}
          <Image
            source={{ uri: "../assets/images/square.png" }} 
            style={styles.recentlyPlayedIconRight}
          />
        </View>

        {/* Liked Songs Section */}
        <View style={styles.likedSongsContainer}>
          <Image
            source={{ uri: "../assets/images/album.png" }} // Liked Songs Image
            style={styles.likedSongsImage}
          />
          <View style={styles.likedSongsTextContainer}>
            <Text style={styles.likedSongsTitle}>Liked Songs</Text>
            <View style={styles.likedSongsSubtitle}>
              <Text style={styles.subtitleText}>Playlist</Text>
              <Image
                source={{ uri: "../assets/images/1dot.png" }} // Dot Icon
                style={styles.dotIcon}
              />
              <Text style={styles.subtitleText}>58 songs</Text>
            </View>
          </View>
        </View>

        {/* Artist Section */}
        <View style={styles.artistContainer}>
          <Image
            source={{ uri: "../assets/images/album2.png" }} // Artist 1 Image
            style={styles.artistImage}
          />
          <View style={styles.artistTextContainer}>
            <Text style={styles.artistName}>Lolo Zouaï</Text>
            <Text style={styles.artistSubtitle}>Artist</Text>
          </View>
        </View>

        <View style={styles.artistContainer}>
          <Image
            source={{ uri: "../assets/images/Artist2.png" }} // Artist 2 Image
            style={styles.artistImage}
          />
          <View style={styles.artistTextContainer}>
            <Text style={styles.artistName}>Lana Del Rey</Text>
            <Text style={styles.artistSubtitle}>Artist</Text>
          </View>
        </View>

        {/* Playlist Section */}
        <View style={styles.playlistContainer}>
          <Image
            source={{ uri: "../assets/images/Artist3.png" }} // Playlist Image
            style={styles.playlistImage}
          />
          <View style={styles.playlistTextContainer}>
            <Text style={styles.playlistName}>Front Left</Text>
            <View style={styles.playlistSubtitle}>
              <Text style={styles.subtitleText}>Playlist</Text>
              <Image
                source={{ uri: "../assets/images/1dot.pngg" }} // Dot Icon
                style={styles.dotIcon}
              />
              <Text style={styles.subtitleText}>Spotify</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          {/* Home Button */}
          <TouchableOpacity style={styles.footerItem}>
            <Image
              source={{ uri: "../assets/images/homeicon.png" }} // Home Icon
              style={styles.footerIcon}
            />
            <Text style={styles.footerText}>Home</Text>
          </TouchableOpacity>

          {/* Search Button */}
          <TouchableOpacity style={styles.footerItem}>
            <Image
              source={{ uri: "../assets/images/searchicon.png" }} // Search Icon
              style={styles.footerIcon}
            />
            <Text style={styles.footerText}>Search</Text>
          </TouchableOpacity>

          {/* Your Library Button */}
          <TouchableOpacity style={styles.footerItem}>
            <Image
              source={{ uri: "../assets/images/libraryicon.png" }} // Library Icon
              style={styles.footerIcon}
            />
            <Text style={styles.footerTextSelected}>Your Library</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerIndicator} />
      </ScrollView>
    </SafeAreaView>
  );
};

const CategoryButton = ({ label, large }) => (
  <View style={[styles.categoryButton, large && styles.categoryButtonLarge]}>
    <Text style={styles.categoryButtonText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollViewContainer: {
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  profileIcon: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
  },
  iconSmall: {
    width: 18,
    height: 18,
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryButton: {
    borderColor: "#7F7F7F",
    borderWidth: 1,
    borderRadius: 45,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  categoryButtonLarge: {
    width: 140,
  },
  categoryButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  recentlyPlayedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  recentlyPlayedIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  recentlyPlayedText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  recentlyPlayedIconRight: {
    width: 20,
    height: 20,
    marginLeft: 'auto', // This aligns the square to the right
  },
  likedSongsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  likedSongsImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
  },
  likedSongsTextContainer: {
    flex: 1,
  },
  likedSongsTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  likedSongsSubtitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitleText: {
    color: "#B3B3B3",
    fontSize: 13,
    marginRight: 5,
  },
  dotIcon: {
    width: 5,
    height: 5,
    marginHorizontal: 5,
  },
  artistContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  artistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  artistTextContainer: {
    flex: 1,
  },
  artistName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  artistSubtitle: {
    color: "#B3B3B3",
    fontSize: 13,
  },
  playlistContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  playlistImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
  },
  playlistTextContainer: {
    flex: 1,
  },
  playlistName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  playlistSubtitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#121212",
  },
  footerItem: {
    alignItems: "center",
  },
  footerIcon: {
    width: 20,
    height: 20,
    marginBottom: 5,
  },
  footerText: {
    color: "#E5E5E5",
    fontSize: 11,
  },
  footerTextSelected: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  footerIndicator: {
    height: 3,
    width: 100,
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 10,
  },
});
