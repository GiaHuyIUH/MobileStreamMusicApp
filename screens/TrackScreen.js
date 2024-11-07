import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const TrackControlScreen = () => {
  const navigation = useNavigation();

  const trackData = {
    cover:
      "https://s.yimg.com/ny/api/res/1.2/FyXeLDYArJFx_jRfVZIKNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/insider_articles_922/3cfb307db10dee35818faf40ebd4c8c6",
    title: "1 (Remastered)",
    artist: "The Beatles",
  };

  const controls = [
    { id: "1", icon: "heart-outline", name: "Like" },
    { id: "2", icon: "eye-off-outline", name: "Hide song" },
    { id: "3", icon: "playlist-music-outline", name: "Add to playlist" },
    { id: "4", icon: "playlist-plus", name: "Add to queue" },
    { id: "5", icon: "share-outline", name: "Share" },
    { id: "6", icon: "radio", name: "Go to radio" },
    {
      id: "7",
      icon: "album",
      name: "View album",
      onPress: () => navigation.navigate("AlbumRadioScreen", { album: trackData }),
    },
    { id: "8", icon: "account-music", name: "View artist" },
    { id: "9", icon: "music-circle-outline", name: "Song credits" },
    { id: "10", icon: "moon-waning-crescent", name: "Sleep timer" },
  ];

  const renderControlItem = ({ item }) => (
    <TouchableOpacity
      style={styles.controlItem}
      onPress={item.onPress} // Thêm sự kiện chuyển hướng cho biểu tượng album
    >
      <MaterialCommunityIcons name={item.icon} size={24} color="#fff" />
      <Text style={styles.controlText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with album cover and title */}
      <View style={styles.header}>
        <Image source={{ uri: trackData.cover }} style={styles.albumCover} />
        <Text style={styles.albumTitle}>{trackData.title}</Text>
        <Text style={styles.artistName}>{trackData.artist}</Text>
      </View>

      {/* FlatList to render control items */}
      <FlatList
        data={controls}
        renderItem={renderControlItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
  },
  albumCover: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  albumTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  artistName: {
    fontSize: 16,
    color: "#B0B0B0",
    marginTop: 5,
    textAlign: "center",
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  controlItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#282828",
  },
  controlText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 15,
  },
  closeButton: {
    alignItems: "center",
    paddingVertical: 15,
    marginBottom: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default TrackControlScreen;
