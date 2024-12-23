import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Import AntDesign icon
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
  const [errorMessage, setErrorMessage] = useState(""); // To display error messages
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false); // Manage visibility for old password
  const [newPasswordVisible, setNewPasswordVisible] = useState(false); // Manage visibility for new password
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
    if (!validatePassword(newPassword)) {
      return; // Stop execution if password is invalid
    }

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

  const validatePassword = (password) => {
    if (password.length > 12) {
      setErrorMessage("Password must not exceed 12 characters.");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setErrorMessage("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setErrorMessage("Password must contain at least one number.");
      return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setErrorMessage("Password must contain at least one special character.");
      return false;
    }
    setErrorMessage(""); // Clear error if password is valid
    return true;
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
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Enter old password"
          secureTextEntry={!oldPasswordVisible}
          value={oldPassword}
          onChangeText={setOldPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setOldPasswordVisible(!oldPasswordVisible)} style={styles.iconContainer}>
          <AntDesign 
            name={oldPasswordVisible ? "eye" : "eyeo"} 
            size={24} 
            color="#1db954" 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Enter new password"
          secureTextEntry={!newPasswordVisible}
          value={newPassword}
          onChangeText={setNewPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setNewPasswordVisible(!newPasswordVisible)} style={styles.iconContainer}>
          <AntDesign 
            name={newPasswordVisible ? "eye" : "eyeo"} 
            size={24} 
            color="#1db954" 
          />
        </TouchableOpacity>
      </View>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
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
  passwordContainer: {
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    right: 16,
    top: 12,
  },
  errorText: {
    color: "#FF0000", // Red error message
    fontSize: 14,
    marginBottom: 10,
  },
});

export default ChangePasswordScreen;
