import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { auth, db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const fetchUserData = async (currentUser) => {
    try {
      // Only attempt to fetch data if there is a logged-in user
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        setUser(null); // Reset user state if no user is logged in
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      console.log("Auth state changed: ", currentUser);
      if (currentUser) {
        await fetchUserData(currentUser);
      } else {
        setUser(null); // Ensure user state is cleared when no user is logged in
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate("Start");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      {user && (
        <View>
          <Text>User Name: {user.userName}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Gender: {user.gender}</Text>
          <Text>Avatar: {user.avatar}</Text>
        </View>
      )}
      <TouchableOpacity onPress={handleLogout}>
        <Text>Log out</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: "#7777",
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
    // fontWeight: "bold",
  },
});

export default HomeScreen;
