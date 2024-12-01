import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet, Text } from "react-native";
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useAuth } from "../context/auth-context";
import { auth } from "../components/firebase";
import { useNavigation } from "@react-navigation/core";

const ChangePasswordScreen = () => {
  const { userInfo, setUserInfo } = useAuth();
  const [email, setEmail] = useState(userInfo?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUserInfo(null);
      navigation.navigate("Start");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleChangePassword = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No user is logged in.");
      }

      // Step 1: Reauthenticate user
      await reauthenticateUser(user, email, oldPassword);

      // Step 2: Update password
      await updateUserPassword(user, newPassword);

      Alert.alert("Success", "Password updated successfully");
      handleLogout();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const reauthenticateUser = async (user, email, oldPassword) => {
    try {
      const credential = EmailAuthProvider.credential(email, oldPassword);
      await reauthenticateWithCredential(user, credential);
      console.log("Reauthentication successful");
    } catch (error) {
      throw new Error("Old password is incorrect. Please try again.");
    }
  };

  const updateUserPassword = async (user, newPassword) => {
    try {
      await updatePassword(user, newPassword);
      console.log("Password updated successfully");
    } catch (error) {
      throw new Error("Failed to update password. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        editable={false}
      />
      <TextInput
        placeholder="Enter old password"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter new password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Change Password"
          onPress={handleChangePassword}
          color="#1db954"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#121212", // Dark theme
  },
  input: {
    height: 50,
    backgroundColor: "#333", // Dark background for input fields
    color: "#fff", // White text
    borderRadius: 30, // Rounded corners
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#444", // Slightly lighter border
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 30,
    overflow: "hidden",
  },
});

export default ChangePasswordScreen;
