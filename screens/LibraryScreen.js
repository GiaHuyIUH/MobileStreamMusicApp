import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/auth-context";
import { useDispatch } from "react-redux";
import Header from "../modules/Search/Header";
import {
  setCurrentProgress,
  setIsPlaying,
  setShowSubPlayer,
} from "../store/playerSlice";
import removeArtistFromUserLibrary from "../utils/removeArtistFromUserLibrary";
const LibraryScreen = ({ navigation }) => {
  const { userInfo, setUserInfo } = useAuth();
  const [selectedArtists, setSelectedArtists] = useState(
    userInfo?.Artist || []
  );
  const [playlist, setPlaylist] = useState(userInfo?.Playlist || []);
  const [myPlaylist, setMyPlaylist] = useState(userInfo?.MyPlaylist);
  const dispatch = useDispatch();
  console.log("userInfo", userInfo);

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
  ];

  function SearchOptionItem({ title, onPress, isActive = false }) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: 100,
          height: 40,
          borderRadius: 9999,
          backgroundColor: isActive ? "#1fdf64" : "#272727",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: isActive ? "black" : "white",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  const renderLibraryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.libraryItem}
      onPress={() => handleLibraryItemPress(item)} // Navigate to ProfileScreen with item data
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

  const addMusic = () => {
    navigation.navigate("ArtistListScreen", {
      selectedArtists: selectedArtists,
    });
  };

  const handleLibraryItemPress = (item) => {
    if (item.type === "Artist") {
      navigation.navigate("ArtistPage", { item });
    } else if (item.title === "Liked Songs") {
      dispatch(setIsPlaying(false));
      dispatch(setCurrentProgress(0));
      navigation.navigate("PlayList", {
        type: "liked",
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Header title="Your Library" />
        {/* <Text style={styles.headerTitle}>Your Library</Text> */}
        <TouchableOpacity
          onPress={() => navigation.navigate("CreatePlaylistScreen")}
        >
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
      </View>

      {/* Combined Scrollable List */}
      <ScrollView contentContainerStyle={styles.libraryList}>
        <FlatList
          data={sections}
          renderItem={renderLibraryItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
        <FlatList
          data={selectedArtists}
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.libraryItem}
              onPress={() => navigateToArtistPage(item)}
            >
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.musicItemImage}
              />
              <View style={styles.itemTextContainer}>
                <Text style={styles.libraryTitle}>{item.name}</Text>
                <Text style={styles.librarySubtitle}>Artist</Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  const newSelectedArtists = selectedArtists.filter(
                    (artist) => {
                      return artist.artistId !== item.artistId;
                    }
                  );
                  setSelectedArtists(newSelectedArtists);
                  removeArtistFromUserLibrary(
                    item.artistId,
                    userInfo,
                    setUserInfo
                  );
                }}
              >
                <Ionicons name="trash" size={24} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.addButton} onPress={addMusic}>
            <View style={styles.musicButtonCircle}>
              <Text style={{ fontSize: 36, color: "#fff" }}>+</Text>
            </View>
            <Text style={styles.addButtonLabel}>Add Artist</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingBottom: 100,
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
  buttonsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "column",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  musicButtonCircle: {
    width: 50,
    height: 50,
    borderRadius: 33,
    backgroundColor: "#302C2C",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  addButtonLabel: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "bold",
  },
  musicItemImage: {
    width: 50,
    height: 50,
    borderRadius: 33,
  },
  itemTextContainer: {
    marginLeft: 8,
    minWidth: 280,
  },
});

export default LibraryScreen;
