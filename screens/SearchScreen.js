import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [editable, setEditable] = useState(true);

  const handleSearch = (text) => {
    setQuery(text);

    const simulatedResults = [
      { id: "1", title: "FKA twigs", type: "Artist", image: "https://via.placeholder.com/50" },
      { id: "2", title: "Hozier", type: "Artist", image: "https://via.placeholder.com/50" },
      { id: "3", title: "Grimes", type: "Artist", image: "https://via.placeholder.com/50" },
      { id: "4", title: "1(Remastered)", type: "Album - The Beatles", image: "https://via.placeholder.com/50" },
      { id: "5", title: "HAYES", type: "Artist", image: "https://via.placeholder.com/50" },
      { id: "6", title: "Led Zeppelin", type: "Artist", image: "https://via.placeholder.com/50" },
      { id: "7", title: "Les", type: "Song - Childish Gambino", image: "https://via.placeholder.com/50" },
    ].filter((item) => item.title.toLowerCase().includes(text.toLowerCase()));
    setResults(simulatedResults);
  };

  const handleCancel = () => {
    setQuery("");
    setResults([]);
    setEditable(false);
    setTimeout(() => setEditable(true), 0);
  };

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#888"
          value={query}
          editable={editable}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Tiêu đề Recent Searches */}
      <Text style={styles.sectionTitle}>Recent searches</Text>

      {/* Danh sách kết quả tìm kiếm */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Image source={{ uri: item.image }} style={styles.resultImage} />
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultTitle}>{item.title}</Text>
              <Text style={styles.resultType}>{item.type}</Text>
            </View>
          </View>
        )}
      />


      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIconContainer}>
          <Ionicons name="happy-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIconContainer}>
          <Ionicons name="mic-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
  },
  searchContainer: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    height: 40,
  },
  cancelButton: {
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 10,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },
  resultImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  resultTextContainer: {
    flex: 1,
  },
  resultTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  resultType: {
    color: "#888",
    fontSize: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
    backgroundColor: "#121212",
    marginHorizontal: 10,
    marginBottom: 5
  },
  footerIconContainer: {
    alignItems: "center",
  },
});

export default SearchScreen;
