import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/auth-context";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function ChangeDisplayName() {
  const { userInfo, setUserInfo } = useAuth();
  console.log("ChangeDisplayName ~ userInfo:", userInfo);
  const [displayName, setDisplayName] = useState("");

  // Get the current logged-in user
  const auth = getAuth();
  const user = auth.currentUser;

  const updateUserName = async (newUserName) => {
    try {
      // Get Firestore reference
      const db = getFirestore();
      // Find the document of the user by their email or userId
      const userRef = doc(collection(db, "users"), user.uid);

      // Set or update the userName field in Firestore
      await setDoc(
        userRef,
        {
          userName: newUserName,
        },
        { merge: true }
      ); // Merge true to update existing fields

      console.log("Username updated successfully!");
    } catch (error) {
      console.error("Error updating username: ", error);
    }
  };

  const handleChangeDisplayName = async () => {
    if (displayName.trim().length === 0) {
      Alert.alert("Error", "Display name cannot be empty");
      return;
    }
    try {
      await updateUserName(displayName);
    } catch (error) {
      Alert.alert("Error", error.message || "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        defaultValue={userInfo.userName}
        onChangeText={setDisplayName}
        placeholder="Enter a new display name"
        placeholderTextColor="#B3B3B3"
      />
      <Pressable onPress={handleChangeDisplayName} style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Spotify's dark theme background
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#1DB954", // Spotify green
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: "#282828", // Subtle dark input background
    borderRadius: 8,
    fontSize: 16,
    color: "#FFFFFF", // White text
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1DB954", // Spotify green
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 50, // Rounded button
    shadowColor: "#1DB954",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF", // White text
    fontSize: 16,
    fontWeight: "600",
  },
});
