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
  const [errorMessage, setErrorMessage] = useState("");

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
    // Regex to allow only alphabetic characters and spaces (no numbers or special characters)
    const regex = /^[a-zA-Z ]*$/;

    // Check if the display name contains any special characters or numbers
    if (!regex.test(displayName)) {
      setErrorMessage("Display name cannot contain numbers or special characters.");
      return;
    }

    // Check if the display name is empty
    if (displayName.trim().length === 0) {
      setErrorMessage("Display name cannot be empty.");
      return;
    }

    // Check if the display name exceeds 20 characters
    if (displayName.trim().length > 20) {
      setErrorMessage("Display name cannot exceed 20 characters.");
      return;
    }

    // Reset error message if everything is valid
    setErrorMessage("");

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
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
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
  input: {
    width: "100%",
    padding: 15,
    backgroundColor: "#282828", // Subtle dark input background
    borderRadius: 8,
    fontSize: 16,
    color: "#FFFFFF", // White text
    marginBottom: 10,
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
  errorText: {
    color: "#FF0000", // Red color for error message
    fontSize: 14,
    marginBottom: 10,
  },
});
