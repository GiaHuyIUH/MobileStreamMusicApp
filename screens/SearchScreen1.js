import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

export default (SearchScreen1) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Search bar */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <Image
              source={{ uri: "https://img.icons8.com/ios-filled/50/ffffff/search--v1.png" }}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#B3B3B3"
              style={styles.searchInput}
            />
          </View>
          <Text style={styles.cancelText}>Cancel</Text>
        </View>

        {/* Recent searches title */}
        <Text style={styles.recentSearchesTitle}>Recent searches</Text>

        {/* Recent searches list */}
        <View style={styles.recentSearchesContainer}>
          {recentSearches.map((item, index) => (
            <View key={index} style={styles.searchItem}>
              <Image source={{ uri: item.imageUri }} style={styles.searchItemImage} />
              <View style={styles.searchItemTextContainer}>
                <Text style={styles.searchItemTitle}>{item.title}</Text>
                <Text style={styles.searchItemSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Keyboard mockup */}
      <KeyboardAvoidingView behavior="padding" style={styles.keyboardContainer}>
        <View style={styles.keyboardRow}>
          {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((key) => (
            <TouchableOpacity key={key} style={styles.keyButton}>
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.keyboardRow}>
          {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((key) => (
            <TouchableOpacity key={key} style={styles.keyButton}>
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.keyboardRow}>
          {["z", "x", "c", "v", "b", "n", "m"].map((key) => (
            <TouchableOpacity key={key} style={styles.keyButton}>
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bottomKeyboardRow}>
          <TouchableOpacity style={styles.wideKeyButton}>
            <Text style={styles.wideKeyText}>123</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.spaceKey}>
            <Text style={styles.spaceKeyText}>space</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.goKey}>
            <Text style={styles.wideKeyText}>Go</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const recentSearches = [
  {
    title: "FKA twigs",
    subtitle: "Artist",
    imageUri: "https://th.bing.com/th/id/OIP.6lSioztiBe1Dt_4uFDhtvAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    title: "Hozier",
    subtitle: "Artist",
    imageUri: "https://s.yimg.com/ny/api/res/1.2/FyXeLDYArJFx_jRfVZIKNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/insider_articles_922/3cfb307db10dee35818faf40ebd4c8c6",
  },
  {
    title: "Grimes",
    subtitle: "Artist",
    imageUri: "https://th.bing.com/th/id/OIP.6lSioztiBe1Dt_4uFDhtvAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    title: "1(Remastered)",
    subtitle: "Album · The Beatles",
    imageUri: "https://s.yimg.com/ny/api/res/1.2/FyXeLDYArJFx_jRfVZIKNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/insider_articles_922/3cfb307db10dee35818faf40ebd4c8c6",
  },
  {
    title: "HAYES",
    subtitle: "Artist",
    imageUri: "https://th.bing.com/th/id/OIP.6lSioztiBe1Dt_4uFDhtvAHaHa?rs=1&pid=ImgDetMain",
  },
  {
    title: "Led Zeppelin",
    subtitle: "Artist",
    imageUri: "https://s.yimg.com/ny/api/res/1.2/FyXeLDYArJFx_jRfVZIKNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/insider_articles_922/3cfb307db10dee35818faf40ebd4c8c6",
  },
  {
    title: "Les",
    subtitle: "Song · Childish Gambino",
    imageUri: "https://th.bing.com/th/id/OIP.6lSioztiBe1Dt_4uFDhtvAHaHa?rs=1&pid=ImgDetMain",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#282828",
    borderRadius: 8,
    padding: 10,
    flex: 1,
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  searchInput: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
  },
  cancelText: {
    color: "#B3B3B3",
    fontSize: 16,
    marginLeft: 15,
  },
  recentSearchesTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recentSearchesContainer: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 10,
  },
  searchItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  searchItemImage: {
    width: 45,
    height: 45,
    borderRadius: 5,
    marginRight: 15,
  },
  searchItemTextContainer: {
    flex: 1,
  },
  searchItemTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  searchItemSubtitle: {
    color: "#B3B3B3",
    fontSize: 14,
  },
  keyboardContainer: {
    backgroundColor: "#1E1E1E",
    padding: 10,
    paddingBottom: 30,
  },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  keyButton: {
    backgroundColor: "#333333",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 45,
  },
  keyText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  bottomKeyboardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wideKeyButton: {
    backgroundColor: "#333333",
    borderRadius: 5,
    padding: 10,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  spaceKey: {
    backgroundColor: "#333333",
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  goKey: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    padding: 10,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  wideKeyText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  spaceKeyText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});

