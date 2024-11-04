import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../components/firebase";

export default function Header({ title, navigation }) {
  const [userInfo, setUserInfo] = useState(null);
  const fetchUserData = async (currentUser) => {
    try {
      // Only attempt to fetch data if there is a logged-in user
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        setUserInfo(null); // Reset user state if no user is logged in
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user);
      }
    });
    return unsubscribe;
  }, []);
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        gap: 20,
        marginBottom: 15,
      }}
    >
      <Pressable onPress={() => navigation.navigate("UserSetting")}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1555231955-348aa2312e19?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={{
            width: 50,
            height: 50,
            resizeMode: "cover",
            borderRadius: 9999,
          }}
        ></Image>
      </Pressable>
      <Text style={{ fontSize: 18, fontWeight: 700, color: "white" }}>
        {`${title} ${userInfo?.userName}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
