import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { useAuth } from "../context/auth-context";
import { auth } from "../components/firebase";
import { updateProfile } from "firebase/auth";

export default function ChangeDisplayName() {
  const { userInfo, setUserInfo } = useAuth();
  console.log("ChangeDisplayName ~ userInfo:", userInfo);
  const [displayName, setDisplayName] = React.useState("");
  const handleChangeDisplayName = async () => {
    if (displayName.length === 0) {
      Alert.alert("Lỗi", "Tên hiển thị không được để trống");
      return;
    } else {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      setUserInfo((prevState) => ({
        ...prevState,
        displayName: displayName,
      }));
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ color: "white", fontSize: 30, fontWeight: 700 }}>
        Change your display name
      </Text>
      <TextInput
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 10,
          backgroundColor: "white",
          borderColor: "white",
          borderWidth: 1,
          fontSize: 20,
          fontWeight: 500,
        }}
        defaultValue={userInfo.displayName}
        onChangeText={(text) => setDisplayName(text)}
      ></TextInput>
      <Pressable
        onPress={handleChangeDisplayName}
        style={{
          width: 100,
          padding: 10,
          borderRadius: 10,
          backgroundColor: "#F62682",
          fontSize: 20,
          fontWeight: 500,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: 500 }}>
          Complete
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
});
