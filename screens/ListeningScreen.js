// ListeningScreen.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ListeningScreen = () => {
  const navigation = useNavigation();
  const devices = [
    { id: "1", name: "BRAVIA 4K GB", type: "Google Cast", icon: "television" },
    { id: "2", name: "Momitha's MacBook Pro", type: "", icon: "laptop" },
    { id: "3", name: "Airplay or Bluetooth", type: "", icon: "wifi" },
  ];

  const renderDeviceItem = ({ item }) => (
    <TouchableOpacity style={styles.deviceItem}>
      <MaterialCommunityIcons name={item.icon} size={24} color="#FFFFFF" />
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceName}>{item.name}</Text>
        {item.type ? <Text style={styles.deviceType}>{item.type}</Text> : null}
      </View>
      {item.id !== "1" && (
        <Ionicons name="ellipsis-horizontal" size={20} color="#FFFFFF" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Close Icon */}
      <TouchableOpacity
        style={styles.closeIcon}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="signal" size={24} color="#1DB954" />
          <Text style={styles.headerTitle}>Listening on</Text>
        </View>
        <View style={styles.currentDeviceContainer}>
          <Text style={styles.currentDevice}>BeatsPill+</Text>
          <MaterialCommunityIcons
            name="bluetooth"
            size={16}
            color="#1DB954"
            style={styles.bluetoothIcon}
          />
        </View>
      </View>

      {/* Device List */}
      <Text style={styles.selectDeviceText}>Select a device</Text>
      <FlatList
        data={devices}
        renderItem={renderDeviceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.deviceList}
      />

      {/* Group Session Section */}
      <View style={styles.groupSessionContainer}>
        <View style={styles.groupSessionHeader}>
          <Text style={styles.groupSessionTitle}>Start a Group Session</Text>
          <View style={styles.betaTag}>
            <Text style={styles.betaText}>BETA</Text>
          </View>
        </View>
        <Text style={styles.groupSessionDescription}>
          Listen with friends, in real time. Pick what to play and control the
          music together.
        </Text>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/50" }}
            style={styles.profileImage}
          />
        </View>
        <TouchableOpacity style={styles.startSessionButton}>
          <Text style={styles.startSessionText}>Start Session</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanToJoinButton}>
          <Text style={styles.scanToJoinText}>Scan to join</Text>
        </TouchableOpacity>
      </View>

      {/* Volume Control */}
      <View style={styles.volumeContainer}>
        <Ionicons name="volume-mute" size={20} color="#FFFFFF" />
        <View style={styles.volumeSlider}>
          <View style={styles.volumeFill} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  closeIcon: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  headerContainer: {
    marginBottom: 10,
    marginHorizontal: 30,
  },
  headerLeft: {
    flexDirection: "row",

    marginBottom: 5,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  currentDeviceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginLeft: 30,
  },
  currentDevice: {
    color: "#1DB954",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  bluetoothIcon: {
    marginTop: 1,
  },
  selectDeviceText: {
    color: "white",
    fontSize: 14,
    marginVertical: 10,
    fontWeight: "bold",
    marginLeft: 12,
  },
  deviceList: {
    marginBottom: 20,
  },
  deviceItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomColor: "#282828",
    borderBottomWidth: 1,
    marginLeft: 12,
  },
  deviceInfo: {
    flex: 1,
    marginLeft: 10,
  },
  deviceName: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  deviceType: {
    color: "#B0B0B0",
    fontSize: 12,
  },
  groupSessionContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  groupSessionHeader: {
    flexDirection: "row",
    marginBottom: 5,
  },
  groupSessionTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 5,
  },
  betaTag: {
    backgroundColor: "#333",
    borderRadius: 3,
    paddingHorizontal: 5,
  },
  betaText: {
    color: "#B0B0B0",
    fontSize: 10,
    fontWeight: "bold",
  },
  groupSessionDescription: {
    color: "#B0B0B0",
    fontSize: 10,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  profileContainer: {
    marginTop: 40,
    marginBottom: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  startSessionButton: {
    backgroundColor: "#1DB954",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  startSessionText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  scanToJoinButton: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "white",
    paddingVertical: 5,
  },
  scanToJoinText: {
    color: "white",
    fontSize: 14,
  },
  volumeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  volumeSlider: {
    flex: 1,
    height: 3,
    backgroundColor: "#555555",
    borderRadius: 2,
    marginHorizontal: 10,
  },
  volumeFill: {
    width: "50%", // Set initial volume level
    height: "100%",
    backgroundColor: "#1DB954",
    borderRadius: 2,
  },
});

export default ListeningScreen;
