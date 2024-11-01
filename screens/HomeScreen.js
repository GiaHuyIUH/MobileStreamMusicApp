import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  const recentlyPlayedData = [
    { id: "1", title: "1(Remastered)", image: "https://via.placeholder.com/80" },
    { id: "2", title: "Lana Del Rey", image: "https://via.placeholder.com/80" },
    { id: "3", title: "Marvin Gaye", image: "https://via.placeholder.com/80" },
    { id: "4", title: "Indie Indie", image: "https://via.placeholder.com/80" },
  ];

  const editorPicksData = [
    { id: "1", title: "Ed Sheeran", image: "https://via.placeholder.com/120" },
    { id: "2", title: "Big Sean", image: "https://via.placeholder.com/120" },
    { id: "3", title: "Juice WRLD", image: "https://via.placeholder.com/120" },
    { id: "4", title: "Post Malone", image: "https://via.placeholder.com/120" },
  ];

  const reviewData = [
    {
      id: "1",
      title: "Your Top Songs 2021",
      image: "https://via.placeholder.com/100",
    },
    {
      id: "2",
      title: "Your Artists Revealed",
      image: "https://via.placeholder.com/100",
    },
  ];

  const renderRecentlyPlayedItem = ({ item }) => (
    <View style={styles.recentlyPlayedItem}>
      <Image source={{ uri: item.image }} style={styles.recentlyPlayedImage} />
      <Text style={styles.recentlyPlayedText} numberOfLines={1}>
        {item.title}
      </Text>
    </View>
  );

  const renderEditorPickItem = ({ item }) => (
    <View style={styles.editorPickItem}>
      <Image source={{ uri: item.image }} style={styles.editorPickImage} />
      <Text style={styles.editorPickText}>{item.title}</Text>
    </View>
  );

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <Image source={{ uri: item.image }} style={styles.reviewImage} />
      <Text style={styles.reviewText}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.sectionTitle}>Recently played</Text>
          <View style={styles.iconContainer}>
            <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
            <Ionicons name="time-outline" size={20} color="#FFFFFF" />
            <Ionicons name="settings-outline" size={20} color="#FFFFFF" />
          </View>
        </View>

        <FlatList
          data={recentlyPlayedData}
          renderItem={renderRecentlyPlayedItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        <Text style={styles.sectionTitle}>Your 2021 in review</Text>
        <FlatList
          data={reviewData}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        <Text style={styles.sectionTitle}>Editor's picks</Text>
        <FlatList
          data={editorPicksData}
          renderItem={renderEditorPickItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        {/* Footer Player */}
        <View style={styles.footerPlayer}>
          <Image
            source={{ uri: "https://via.placeholder.com/40" }}
            style={styles.playerIcon}
          />
          <View style={styles.footerTextContainer}>
            <Text style={styles.playerSong}>From Me to You - Mono / Remastered</Text>
            <Text style={styles.playSource}>BEATSPILL+</Text>
          </View>
          {/* Icons for Bluetooth and Pause */}
          <MaterialCommunityIcons name="bluetooth" size={20} color="#1DB954" style={styles.iconSpacing} />
          <Ionicons name="pause" size={24} color="#FFFFFF" style={styles.iconSpacing} />
        </View>
        {/* Progress bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 10,
  },
  horizontalList: {
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  recentlyPlayedItem: {
    width: 90,
    marginRight: 10,
    alignItems: "center",
  },
  recentlyPlayedImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  recentlyPlayedText: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  reviewItem: {
    width: 140,
    marginRight: 10,
    backgroundColor: "#333333",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  reviewImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  reviewText: {
    color: "#FFFFFF",
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  editorPickItem: {
    width: 120,
    marginRight: 10,
    alignItems: "center",
  },
  editorPickImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  editorPickText: {
    color: "#FFFFFF",
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },
  footerPlayer: {
    backgroundColor: "#1C1C1C",
    borderRadius: 12,
    padding: 10,
    margin: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  playerIcon: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 12,
  },
  footerTextContainer: {
    flex: 1,
  },
  playerSong: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  playSource: {
    color: "#1DB954",
    fontSize: 12,
  },
  iconSpacing: {
    marginHorizontal: 8,
  },
  progressBarContainer: {
    backgroundColor: "#555",
    height: 3,
    borderRadius: 2,
    marginHorizontal: 16,
    marginTop: 5,
  },
  progressBar: {
    width: "70%",
    height: "100%",
    backgroundColor: "#1DB954",
  },
});

export default HomeScreen;
