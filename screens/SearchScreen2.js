import React from "react";
import { SafeAreaView, ScrollView, View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from "react-native";

export default (SearchScreen2) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchText}>Search</Text>
          <View style={styles.searchBar}>
            <TextInput placeholder="Artists, songs, or podcasts" placeholderTextColor="#B0B0B0" style={styles.searchInput} />
          </View>
        </View>

        {/* Your Top Genres */}
        <Text style={styles.sectionTitle}>Your top genres</Text>
        <View style={styles.genreContainer}>
          <View style={styles.genreBox}>
          <Image source={{ uri: "../assets/images/Pop.png" }} style={styles.albumImage} />
            <Text style={styles.genreText}>Pop</Text>
          </View>
          <View style={styles.genreBox}>
            <Image source={{ uri: "../assets/images/Pop.png" }} style={styles.albumImage} />
            <Text style={styles.genreText}>Indie</Text>
          </View>
        </View>

        {/* Popular Podcast Categories */}
        <Text style={styles.sectionTitle}>Popular podcast categories</Text>
        <View style={styles.genreContainer}>
          <View style={[styles.genreBox, styles.blueBox]}>
            <Text style={styles.genreText}>News & Politics</Text>
          </View>
          <View style={[styles.genreBox, styles.redBox]}>
            <Text style={styles.genreText}>Comedy</Text>
          </View>
        </View>

        {/* Browse All Section */}
        <Text style={styles.sectionTitle}>Browse all</Text>
        <View style={styles.genreContainer}>
          <View style={styles.genreBox}>
            <Image source={{ uri: "../assets/images/Artist2.png" }} style={styles.albumImage} />
            <Text style={styles.genreText}>2021 Wrapped</Text>
          </View>
          <View style={styles.genreBox}>
          <Image source={{ uri: "../assets/images/Artist1.png" }} style={styles.albumImage} />
            <Text style={styles.genreText}>Podcasts</Text>
          </View>
        </View>

        <View style={styles.genreContainer}>
          <View style={styles.genreBox}>
          <Image source={{ uri: "../assets/images/Artist3.png" }} style={styles.albumImage} />
            <Text style={styles.genreText}>Made for you</Text>
          </View>
          <View style={styles.genreBox}>
          <Image source={{ uri: "../assets/images/album2.png" }} style={styles.albumImage} />
            <Text style={styles.genreText}>Charts</Text>
          </View>
        </View>
      </ScrollView>

      {/* Now Playing Section */}
      <View style={styles.nowPlaying}>
        <Image
          source={{ uri: "../assets/images/Artist1.png" }} 
          style={styles.nowPlayingImage}
        />
        <View style={styles.nowPlayingTextContainer}>
          <Text style={styles.nowPlayingText} numberOfLines={1}>
            Easy - Troye Sivan
          </Text>
          <Text style={styles.nowPlayingSubtext}>BEAST!!!</Text>
        </View>
        <TouchableOpacity>
          <Image
            source={{ uri: "https://e7.pngegg.com/pngimages/261/757/png-clipart-computer-icons-google-play-music-button-play-angle-rectangle-thumbnail.png" }} // Replace with the pause button icon
            style={styles.nowPlayingControl}
          />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem}>
          <Image source={{ uri: "../assets/images/Homeicon.png" }} style={styles.navIcon} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Image source={{ uri: "../assets/images/Searchicon.png" }} style={styles.navIcon} />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Image source={{ uri: "../assets/images/libraryicon.png" }} style={styles.navIcon} />
          <Text style={styles.navText}>Your Library</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollView: {
    paddingHorizontal: 15,
  },
  searchContainer: {
    paddingTop: 20,
    marginBottom: 20,
  },
  searchText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#121212",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchInput: {
    color: "#fff",
    flex: 1,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  genreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  genreBox: {
    width: "48%",
    height: 100,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  blueBox: {
    backgroundColor: "#4B93FC",
  },
  redBox: {
    backgroundColor: "#E14D2A",
  },
  genreText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  albumImage: {
    width: 100,
    height: 70,
    marginBottom: 5,
  },
  nowPlaying: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121212",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: "#282828",
  },
  nowPlayingImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  nowPlayingTextContainer: {
    flex: 1,
  },
  nowPlayingText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  nowPlayingSubtext: {
    color: "#B0B0B0",
    fontSize: 14,
  },
  nowPlayingControl: {
    width: 24,
    height: 24,
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#000",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#282828",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  navText: {
    color: "#fff",
    fontSize: 12,
  },
});
