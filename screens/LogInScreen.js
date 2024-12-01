import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase";
import { useAuth } from "../context/auth-context";

const LogInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("tranhuyzaza@gmail.com");
  const [password, setPassword] = useState("Anhbakhia3@");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userInfo } = useAuth();
  useEffect(() => {
    if (userInfo) {
      navigation.navigate("MainFlow");
    }
  }, [userInfo]);

  const handleLogin = async () => {
    setErrorMessage(""); // Xóa thông báo lỗi trước khi thử đăng nhập
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("MainFlow"); // Chuyển đến màn hình chính nếu đăng nhập thành công
    } catch (error) {
      // Phân tích lỗi và cập nhật thông báo
      switch (error.code) {
        case "auth/invalid-email":
          setErrorMessage("Invalid email please try again.");
          break;
        case "auth/user-not-found":
          setErrorMessage("User not found please sign up.");
          break;
        case "auth/wrong-password":
          setErrorMessage("Wrong password please try again.");
          break;
        default:
          setErrorMessage("Something went wrong please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "#121212", padding: 20 }}>
        {/* Email field */}
        <Text style={styles.PrimaryLabel}>Email or username</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputPass}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password field */}
        <Text style={styles.PrimaryLabel}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputPass}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Error Message */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

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
            onPress={handleLogin}
          >
            <Text style={[styles.PrimaryLabel, { color: "#000" }]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 20,
              padding: 15,
              borderRadius: 30,
              borderWidth: 1,
              borderColor: "#fff",
            }}
            onPress={() => navigation.navigate("LogInNotPassScreen")}
          >
            <Text
              style={[
                styles.PrimaryLabel,
                { textDecorationLine: "underline", fontSize: 16 },
              ]}
            >
              Login without password
            </Text>
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
    color: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginVertical: 10,
    textAlign: "center",
  },
});

export default LogInScreen;
