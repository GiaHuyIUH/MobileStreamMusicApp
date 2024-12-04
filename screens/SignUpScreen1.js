import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { db } from "../components/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const SignUpScreen1 = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const checkEmailExistence = async () => {
    try {
      console.log(email);
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setEmailMessage("This email is already registered.");
        return false;
      } 
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = async () => {
    const emailValid = checkEmail();
    const emailExists = await checkEmailExistence();
    const passwordValid = checkPassword();
    if (emailValid && emailExists && passwordValid) {
      navigation.navigate("SignUpScreen2", {
        email: email,
        password: password,
      });
    }
  };

  const checkEmail = () => {
    const regexEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regexEmail.test(email)) {
      setEmailMessage("Please enter a valid email address.");
      return false;
    }
    setEmailMessage(""); // Clear email error message if valid
    return true;
  };

  const checkPassword = () => {
    const regexPassword =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,12}$/;
    if (!regexPassword.test(password)) {
      setPasswordMessage(
        "Password must be 6-12 characters long, contain at least one uppercase letter, one number, and one special character."
      );
      return false;
    }
    setPasswordMessage(""); // Clear password error message if valid
    return true;
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "#121212", padding: 20 }}>
        {/* Email field */}
        <Text style={styles.PrimaryLabel}>What's your email?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputPass}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            onBlur={checkEmail} // Validate email on blur (when focus is lost)
          />
        </View>
        <Text style={styles.label}>{emailMessage}</Text>

        {/* Password field */}
        <Text style={styles.PrimaryLabel}>Create a password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputPass}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            onBlur={checkPassword} // Validate password on blur
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>{passwordMessage}</Text>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#ccc",
              borderRadius: 30,
              padding: 15,
              width: "100%",
              alignItems: "center",
            }}
            onPress={() => {
              handleNext(); // Call the validation function
            }}
          >
            <Text style={[styles.PrimaryLabel, { color: "#000" }]}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    backgroundColor: "#7777",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  inputPass: {
    flex: 1,
    height: 50,
    color: "#fff",
    fontSize: 22,
  },
  PrimaryLabel: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    color: "#fff", // Optional: change color to gray
  },
});

export default SignUpScreen1;
