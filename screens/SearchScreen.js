import React, { useState } from "react";
import { View, TextInput, FlatList, Text, StyleSheet } from "react-native";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (text) => {
    setQuery(text);
    // Simulate search results
    const simulatedResults = [
      { id: "1", title: "Song 1" },
      { id: "2", title: "Song 2" },
      { id: "3", title: "Song 3" },
    ].filter((item) => item.title.toLowerCase().includes(text.toLowerCase()));
    setResults(simulatedResults);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for music..."
        value={query}
        onChangeText={handleSearch}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.resultItem}>{item.title}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  resultItem: {
    padding: 16,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default SearchScreen;
