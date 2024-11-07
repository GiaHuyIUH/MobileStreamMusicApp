import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const profileData = {
  name: "maya",
  profileImage: "https://via.placeholder.com/50",
};

const settingsOptions = [
  { id: "1", title: "Account" },
  { id: "2", title: "Data Saver" },
  { id: "3", title: "Languages" },
  { id: "4", title: "Playback" },
  { id: "5", title: "Explicit Content" },
  { id: "6", title: "Devices" },
  { id: "7", title: "Car" },
  { id: "8", title: "Social" },
  { id: "9", title: "Voice Assistant & Apps" },
  { id: "10", title: "Audio Quality" },
  { id: "11", title: "Storage" },
];

const SettingsScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.optionContainer}>
      <Text style={styles.optionText}>{item.title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Profile Section */}
      <TouchableOpacity style={styles.profileContainer}>
        <Image source={{ uri: profileData.profileImage }} style={styles.profileImage} />
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>{profileData.name}</Text>
          <Text style={styles.profileSubtitle}>View Profile</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#B0B0B0" />
      </TouchableOpacity>

      {/* Settings Options */}
      <FlatList
        data={settingsOptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.optionsList}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIconContainer} onPress={() => navigation.navigate('Main', { screen: 'Home' })}>
          <Ionicons name="home-outline" size={24} color="#fff" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIconContainer} onPress={() => navigation.navigate('Main', { screen: 'Search' })}>
          <Ionicons name="search-outline" size={24} color="#fff" />
          <Text style={styles.footerText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIconContainer} onPress={() => navigation.navigate('Main', { screen: 'Library' })}>
          <Ionicons name="library-outline" size={24} color="#fff" />
          <Text style={styles.footerText}>Your Library</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1E1E1E",
    borderBottomWidth: 1,
    borderBottomColor: "#282828",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  profileSubtitle: {
    color: "#B0B0B0",
    fontSize: 14,
  },
  optionsList: {
    paddingHorizontal: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#282828",
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#121212',
    borderTopWidth: 1,
    borderTopColor: '#282828',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerIconContainer: {
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});

export default SettingsScreen;
