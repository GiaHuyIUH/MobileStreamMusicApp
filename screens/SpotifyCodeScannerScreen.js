import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SpotifyCodeScannerScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header với nút đóng */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scanning for Spotify codes</Text>
      </View>

      {/* Khung camera giả */}
      <View style={styles.cameraContainer}>
        <View style={styles.cameraFrame} />
      </View>

      {/* Hướng dẫn */}
      <View style={styles.instructionContainer}>
        <View style={styles.codeBars} />
        <Text style={styles.instructionText}>
          Point your camera at a Spotify code.
        </Text>
        <TouchableOpacity>
          <Text style={styles.selectPhotosText}>Select from photos</Text>
        </TouchableOpacity>
      </View>

      {/* Thanh trượt dưới cùng */}
      <View style={styles.bottomSlider} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraFrame: {
    width: 200,
    height: 300,
    borderColor: "#1DB954",
    borderWidth: 2,
    borderRadius: 10,
  },
  instructionContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  codeBars: {
    width: 50,
    height: 10,
    backgroundColor: "#B0B0B0",
    borderRadius: 5,
    marginBottom: 10,
  },
  instructionText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  selectPhotosText: {
    color: "#1DB954",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
  bottomSlider: {
    width: 80,
    height: 4,
    backgroundColor: "#B0B0B0",
    borderRadius: 2,
    marginBottom: 20,
  },
});

export default SpotifyCodeScannerScreen;
