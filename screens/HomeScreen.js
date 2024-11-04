import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from "react-native";
import { auth, db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getHomePage } from "../apis/home";
import Header from "./Header";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchUserData = async (currentUser) => {
      try {
        if (currentUser) {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUser(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchData = async () => {
      try {
        const data = await getHomePage();
        const items = data.data.items;

        const organizedData = items.reduce((acc, item) => {
          const { sectionType, title, ...rest } = item;

          if (
            sectionType === "new-release" ||
            sectionType === "playlist" ||
            sectionType === "banner"
          ) {
            acc.push({ sectionType, title, ...rest });
          }

          return acc;
        }, []);

        setHomeData(organizedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      console.log("Auth state changed: ", currentUser);
      if (currentUser) {
        await fetchUserData(currentUser);
        await fetchData();
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (homeData && homeData.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= homeData[0].items.length) {
            return 0;
          }
          return nextIndex;
        });
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [homeData]);

  useEffect(() => {
    if (flatListRef.current && homeData && homeData.length > 0) {
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [currentIndex, homeData]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate("Start");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const getCurrentTime = () => {
    const hour = new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
    });
    const hourNumber = parseInt(hour.split(":")[0]);
    if (hourNumber >= 0 && hourNumber < 12) {
      return "Good morning";
    }
    if (hourNumber >= 12 && hourNumber < 18) {
      return "Good afternoon";
    }
    if (hourNumber >= 18 && hourNumber < 24) {
      return "Good evening";
    }
    return "";
  };

  const bannerItems =
    homeData?.filter((item) => item.sectionType === "banner") || [];

  const BannerItem = ({ item }) => (
    <TouchableOpacity style={styles.bannerContainer}>
      <Image source={{ uri: item.banner }} style={styles.bannerImage} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title={getCurrentTime()} navigation={navigation} />
      <TouchableOpacity onPress={handleLogout}>
        <Text>LOG OUT</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#ccc" />
      ) : (
        <FlatList
          ref={flatListRef}
          data={bannerItems[0].items}
          renderItem={({ item }) => <BannerItem item={item} />}
          keyExtractor={(item) => item.encodeId}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    flex: 1,
    padding: 15,
  },
  bannerContainer: {
    width: Dimensions.get("window").width * 0.8,
    height: 220,
    marginRight: 15,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
});

export default HomeScreen;
