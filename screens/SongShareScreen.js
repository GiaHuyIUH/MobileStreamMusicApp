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
import { useNavigation } from "@react-navigation/native"; // Import navigation hook

const SongShareScreen = () => {
  const navigation = useNavigation(); // Sử dụng navigation

  const trackData = {
    cover:
      "https://s.yimg.com/ny/api/res/1.2/FyXeLDYArJFx_jRfVZIKNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/insider_articles_922/3cfb307db10dee35818faf40ebd4c8c6",
    title: "From Me to You - Mono / Remastered",
    artist: "The Beatles",
  };

  const shareOptions = [
    { id: "1", icon: "link", name: "Copy Link" },
    {
      id: "2",
      icon: "whatsapp",
      name: "WhatsApp",
      iconType: "MaterialCommunityIcons",
    },
    {
      id: "3",
      icon: "twitter",
      name: "Twitter",
      iconType: "MaterialCommunityIcons",
    },
    { id: "4", icon: "chatbubble-outline", name: "Messages" },
    { id: "5", icon: "ellipsis-horizontal", name: "More" },
  ];

  const renderShareOption = ({ item }) => (
    <TouchableOpacity style={styles.shareOption}>
      {item.iconType === "MaterialCommunityIcons" ? (
        <MaterialCommunityIcons name={item.icon} size={24} color="#fff" />
      ) : (
        <Ionicons name={item.icon} size={24} color="#fff" />
      )}
      <Text style={styles.shareText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Share</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Song Information */}
      <View style={styles.songInfo}>
        <Image source={{ uri: trackData.cover }} style={styles.albumCover} />
        <Text style={styles.trackTitle}>{trackData.title}</Text>
        <Text style={styles.artistName}>{trackData.artist}</Text>
      </View>

      {/* Share Options */}
      <FlatList
        data={shareOptions}
        renderItem={renderShareOption}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.shareOptionsContainer}
        numColumns={3}
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
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  songInfo: {
    alignItems: "center",
    paddingVertical: 20,
  },
  albumCover: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  trackTitle: {
    fontSize: 18,
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
  shareOptionsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  shareOption: {
    alignItems: "center",
    justifyContent: "center",
    width: "33%",
    marginVertical: 10,
  },
  shareText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});

export default SongShareScreen;
