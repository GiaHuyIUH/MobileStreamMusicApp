import React from "react";
import { useNavigation } from "@react-navigation/native";

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

const AlbumControlScreen = () => {
  const navigation = useNavigation();
  const albumData = {
    cover:
      "https://s.yimg.com/ny/api/res/1.2/FyXeLDYArJFx_jRfVZIKNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/insider_articles_922/3cfb307db10dee35818faf40ebd4c8c6",
    title: "1 (Remastered)",
    artist: "The Beatles",
  };

  // Dữ liệu cho các tùy chọn hành động
  const actions = [
    { id: "1", title: "Like", icon: "heart-outline" },
    {
      id: "2",
      title: "View artist",
      icon: "account-music-outline",
      type: "MaterialCommunityIcons",
    },
    { id: "3", title: "Share", icon: "share-outline" },
    {
      id: "4",
      title: "Like all songs",
      icon: "heart-multiple-outline",
      type: "MaterialCommunityIcons",
    },
    {
      id: "5",
      title: "Add to playlist",
      icon: "playlist-plus",
      type: "MaterialCommunityIcons",
    },
    {
      id: "6",
      title: "Add to queue",
      icon: "playlist-play",
      type: "MaterialCommunityIcons",
    },
    { id: "7", title: "Go to radio", icon: "radio-outline" },
  ];

  // Hàm render mỗi mục tùy chọn
  const renderActionItem = ({ item }) => (
    <TouchableOpacity style={styles.actionItem}>
      {item.type === "MaterialCommunityIcons" ? (
        <MaterialCommunityIcons name={item.icon} size={24} color="#fff" />
      ) : (
        <Ionicons name={item.icon} size={24} color="#fff" />
      )}
      <Text style={styles.actionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Thông tin album */}
      <View style={styles.albumInfoContainer}>
        <Image source={{ uri: albumData.cover }} style={styles.albumCover} />
        <Text style={styles.albumTitle}>{albumData.title}</Text>
        <Text style={styles.albumArtist}>{albumData.artist}</Text>
      </View>

      {/* Danh sách các tùy chọn */}
      <FlatList
        data={actions}
        keyExtractor={(item) => item.id}
        renderItem={renderActionItem}
        contentContainerStyle={styles.actionList}
      />

      {/* Nút Đóng */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  albumInfoContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  albumCover: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 15,
  },
  albumTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  albumArtist: {
    fontSize: 16,
    color: "#B0B0B0",
    textAlign: "center",
    marginBottom: 20,
  },
  actionList: {
    paddingHorizontal: 20,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 15,
  },
  closeButton: {
    alignItems: "center",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#333",
    marginTop: 20,
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AlbumControlScreen;
