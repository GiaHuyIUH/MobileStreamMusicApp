import React, { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const data = [
  {
    id: 1,
    name: "Ariana Grande",
    picture:
      "https://th.bing.com/th/id/R.f9d03078ff25653f854cb1a5d776a1aa?rik=G%2bsf7mhhjQm2sQ&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f36900000%2fjustin-bieber-justin-bieber-36918699-1804-2500.jpg&ehk=%2b9NgpXJsV56rSyzufbThq4NIr5WZNFY8RfxkKvxK6ok%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: 2,
    name: "Billie Eilish",
    picture:
      "https://th.bing.com/th/id/R.f9d03078ff25653f854cb1a5d776a1aa?rik=G%2bsf7mhhjQm2sQ&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f36900000%2fjustin-bieber-justin-bieber-36918699-1804-2500.jpg&ehk=%2b9NgpXJsV56rSyzufbThq4NIr5WZNFY8RfxkKvxK6ok%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    id: 3,
    name: "Drake",
    picture:
      "https://th.bing.com/th/id/R.f9d03078ff25653f854cb1a5d776a1aa?rik=G%2bsf7mhhjQm2sQ&riu=http%3a%2f%2fimages6.fanpop.com%2fimage%2fphotos%2f36900000%2fjustin-bieber-justin-bieber-36918699-1804-2500.jpg&ehk=%2b9NgpXJsV56rSyzufbThq4NIr5WZNFY8RfxkKvxK6ok%3d&risl=&pid=ImgRaw&r=0",
  },
  // more data...
];

const ChooseArtistScreen = ({ navigation }) => {
  const [numColumns, setNumColumns] = useState(3); // Initial number of columns

  // This is the render function for each item
  const renderItem = ({ item }) => {
    return (
      <View style={styles.artistContainer}>
        <Image source={{ uri: item.picture }} style={styles.artistImage} />
        <Text style={styles.artistName}>{item.name}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.searchBar}>
        <TouchableOpacity style={{ paddingHorizontal: 5 }}>
          <AntDesign name="search1" size={24} color="grey" />
        </TouchableOpacity>
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingTop: 60 }}
        numColumns={numColumns}
        key={numColumns}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    position: "relative",
  },
  artistContainer: {
    alignItems: "center",
    padding: 10,
  },
  artistImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  artistName: {
    color: "#fff",
    marginTop: 5,
  },
  searchBar: {
    width: "90%",
    height: 50,
    flexDirection: "row",
    position: "absolute",
    top: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
    alignItems: "center",
    paddingHorizontal: 10,
    alignSelf: "center",
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
});

export default ChooseArtistScreen;
