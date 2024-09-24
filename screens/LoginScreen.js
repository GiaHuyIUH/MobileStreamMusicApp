import { useFonts } from "expo-font";
import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    MyFont: require("../assets/fonts/MyFont.ttf"),
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, alignItems: "center" }}></View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../assets/images/logo.png")}
          style={{ width: 50, height: 50 }}
        />
        <Text style={styles.title}>Milions of songs.</Text>
        <Text style={styles.title}>Free on Spotify.</Text>
      </View>

      <View style={styles.buttnGroup}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#1ED760" }]}
        >
          <Text
            style={{ fontFamily: "MyFont", fontWeight: "bold", fontSize: 18 }}
          >
            Sign up free
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: "#000",
            },
          ]}
        >
          <Image
            source={require("../assets/images/logoGg.png")}
            style={{
              width: 20,
              height: 20,
              position: "absolute",
              left: "6%",
            }}
          />
          <Text style={styles.btnText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#000" }]}>
          <Image
            source={require("../assets/images/logoFb.png")}
            style={{
              width: 20,
              height: 20,
              position: "absolute",
              left: "6%",
            }}
          />
          <Text style={styles.btnText}>Continue with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#000" }]}>
          <Text style={styles.btnText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  title: {
    fontFamily: "MyFont",
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  buttnGroup: { flex: 2, alignItems: "center", margin: "10%" },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 30,
    width: "100%",
    borderWidth: 1,
    borderColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  btnText: {
    color: "#fff",
    fontFamily: "MyFont",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default LoginScreen;
