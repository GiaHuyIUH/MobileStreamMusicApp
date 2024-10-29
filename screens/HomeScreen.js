import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { auth, db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { FlatList } from "react-native";

let limit = 10;
let loadMore = false;

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [trending, setTrending] = useState([]);

  const [skip, setSkip] = useState(0);

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

  const fetchData = async () => {
    let query = `?skip=${skip}&limit=${limit}`;
    try {
      const response = await fetch(
        "https://api-zingmp3.vercel.app/api/home" + query
      );
      const data = await response.json();
      setTrending(data.items[0].items);
      console.log("Data:", data.items[0].items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      console.log("Auth state changed: ", currentUser);
      if (currentUser) {
        await fetchUserData(currentUser);
        await fetchData();
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={handleLogout}>
          <Text>LOG OUT</Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.headerText}>Trending</Text>
          <FlatList
            data={trending}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            renderItem={({ item }) => (
              <Image source={{ uri: item.image }} style={styles.icon} />
            )}
          />
        </View>
        {/* Image Grid */}
        <View style={styles.imageGrid}>
          <Image
            source={{ uri: "../assets/images/Artist1.png" }}
            style={styles.albumArt}
          />
          <Image
            source={{ uri: "../assets/images/Artist2.png" }}
            style={styles.albumArt}
          />
          <Image
            source={{ uri: "../assets/images/Artist3.png" }}
            style={styles.albumArt}
          />
        </View>
        {/* Artists Section */}
        <View style={styles.artistRow}>
          <Text style={styles.artistText}>1(Remastered)</Text>
          <Text style={styles.artistText}>Lana Del Rey</Text>
          <Text style={styles.artistText}>Marvin Gaye</Text>
        </View>
        {/* Wrapped Section */}
        <View style={styles.wrappedSection}>
          <Image
            source={{
              uri: "https://th.bing.com/th/id/OIP.Aq0jgWn091tkbeIlnNWkIAHaEK?rs=1&pid=ImgDetMai",
            }}
            style={styles.wrappedImage}
          />
          <View style={styles.wrappedTextContainer}>
            <Text style={styles.hashtag}>#SPOTIFYWRAPPED</Text>
            <Text style={styles.title}>Your 2021 in review</Text>
          </View>
        </View>
        {/* More Albums */}
        <View style={styles.albumRow}>
          <Image
            source={{
              uri: "https://th.bing.com/th/id/R.0fc7b54ed9593a0c1915b802a52f78f8?rik=WNv9BoCenaFZ%2bQ&riu=http%3a%2f%2fmedia1.popsugar-assets.com%2ffiles%2f2016%2f01%2f10%2f138%2fn%2f1922398%2f49aaa839caa8207b_GettyImages-504396978.xxxlarge_2x.jpg&ehk=agNMoMN0X9qeqkxGBxix1q%2bye74YK%2bXxhGfXFfGsarM%3d&risl=&pid=ImgRaw&r=0",
            }}
            style={styles.largeAlbumArt}
          />
          <Image
            source={{
              uri: "https://s.yimg.com/ny/api/res/1.2/FyXeLDYArJFx_jRfVZIKNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/insider_articles_922/3cfb307db10dee35818faf40ebd4c8c6",
            }}
            style={styles.largeAlbumArt}
          />
        </View>
        {/* Top Songs */}
        <View style={styles.topSongs}>
          <Text style={styles.topSongText}>Your Top Songs 2021</Text>
          <Text style={styles.topSongText}>Your Artists Revealed</Text>
        </View>
        {/* Editor's Picks */}
        <Text style={styles.sectionTitle}>Editor’s picks</Text>
        <View style={styles.editorPicks}>
          <Image
            source={{
              uri: "https://th.bing.com/th/id/R.0fc7b54ed9593a0c1915b802a52f78f8?rik=WNv9BoCenaFZ%2bQ&riu=http%3a%2f%2fmedia1.popsugar-assets.com%2ffiles%2f2016%2f01%2f10%2f138%2fn%2f1922398%2f49aaa839caa8207b_GettyImages-504396978.xxxlarge_2x.jpg&ehk=agNMoMN0X9qeqkxGBxix1q%2bye74YK%2bXxhGfXFfGsarM%3d&risl=&pid=ImgRaw&r=0",
            }}
            style={styles.editorPickImage}
          />
          <Image
            source={{
              uri: "https://s.yimg.com/ny/api/res/1.2/FyXeLDYArJFx_jRfVZIKNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/insider_articles_922/3cfb307db10dee35818faf40ebd4c8c6",
            }}
            style={styles.editorPickImage}
          />
          <Image
            source={{
              uri: "https://th.bing.com/th/id/R.0fc7b54ed9593a0c1915b802a52f78f8?rik=WNv9BoCenaFZ%2bQ&riu=http%3a%2f%2fmedia1.popsugar-assets.com%2ffiles%2f2016%2f01%2f10%2f138%2fn%2f1922398%2f49aaa839caa8207b_GettyImages-504396978.xxxlarge_2x.jpg&ehk=agNMoMN0X9qeqkxGBxix1q%2bye74YK%2bXxhGfXFfGsarM%3d&risl=&pid=ImgRaw&r=0",
            }}
            style={styles.editorPickImage}
          />
        </View>
        <View style={styles.editorArtistTextRow}>
          <Text style={styles.editorArtistText}>
            Ed Sheeran, Big Sean, Juice WRLD, Post Malone
          </Text>
          <Text style={styles.editorArtistText}>
            Mitski, Tame Impala, Glass Animals, Charli XCX
          </Text>
        </View>
        {/* Footer Player */}
        <View style={styles.footerPlayer}>
          <View style={styles.footerPlayerInfo}>
            <Image
              source={{
                uri: "https://th.bing.com/th/id/R.0fc7b54ed9593a0c1915b802a52f78f8?rik=WNv9BoCenaFZ%2bQ&riu=http%3a%2f%2fmedia1.popsugar-assets.com%2ffiles%2f2016%2f01%2f10%2f138%2fn%2f1922398%2f49aaa839caa8207b_GettyImages-504396978.xxxlarge_2x.jpg&ehk=agNMoMN0X9qeqkxGBxix1q%2bye74YK%2bXxhGfXFfGsarM%3d&risl=&pid=ImgRaw&r=0",
              }}
              style={styles.playerIcon}
            />
            <View style={styles.footerTextContainer}>
              <Text style={styles.playerSong}>
                From Me to You - Mono / Remastered
              </Text>
              <View style={styles.footerPlayerRow}>
                <Image
                  source={{ uri: "../assets/images/bluetooth.png" }}
                  style={styles.playIcon}
                />
                <Text style={styles.playSource}>BEATSPILL+</Text>
              </View>
            </View>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}></View>
          </View>
        </View>
        {/* Navigation */}
        <View style={styles.navigation}>
          <Image
            source={{ uri: "../assets/images/Homeicon.png" }}
            style={styles.playerIcon}
          />
          <Image
            source={{ uri: "../assets/images/Searchicon.png" }}
            style={styles.playerIcon}
          />
          <Image
            source={{ uri: "../assets/images/libraryicon.png" }}
            style={styles.playerIcon}
          />
        </View>
        <View style={styles.navigation}>
          <Text style={styles.navItem}>Home</Text>

          <Text style={styles.navItem}>Search</Text>

          <Text style={styles.navItem}>Your Library</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    backgroundColor: "#111111",
    paddingTop: 75,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
    marginHorizontal: 18,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  imageGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginHorizontal: 19,
  },
  albumArt: {
    width: 105,
    height: 105,
  },
  artistRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
    marginHorizontal: 19,
  },
  artistText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  wrappedSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginHorizontal: 16,
  },
  wrappedImage: {
    width: 58,
    height: 58,
    marginRight: 8,
    borderRadius: 5,
  },
  wrappedTextContainer: {
    flex: 1,
  },
  hashtag: {
    color: "#9C9C9C",
    fontSize: 10,
    marginBottom: 5,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
  },
  albumRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 22,
  },
  largeAlbumArt: {
    justifyContent: "space-between",
    width: 155,
    height: 155,
  },
  topSongs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    marginHorizontal: 17,
  },
  topSongText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 9,
    marginLeft: 18,
  },
  editorPicks: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 19,
    marginBottom: 10,
  },
  editorPickImage: {
    width: 154,
    height: 154,
  },
  editorArtistTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 13,
    marginBottom: 15,
  },
  editorArtistText: {
    color: "#B3B3B3",
    fontSize: 11,
    fontWeight: "bold",
    width: 150,
  },
  footerPlayer: {
    backgroundColor: "#550A1B8F",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    marginHorizontal: 12,
  },
  footerPlayerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  playerIcon: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 12,
  },
  footerTextContainer: {
    flex: 1,
  },
  playerSong: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },
  footerPlayerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  playIcon: {
    width: 6,
    height: 10,
    marginRight: 5,
  },
  playSource: {
    color: "#1DB954",
    fontSize: 10,
  },
  progressBarContainer: {
    backgroundColor: "#702E3C",
    borderRadius: 4,
  },
  progressBar: {
    width: "70%",
    height: 4,
    backgroundColor: "#B2B2B2",
    borderRadius: 4,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 28,
    marginBottom: 12,
  },
  navItem: {
    color: "#E5E5E5",
    fontSize: 13,
  },
  navIndicator: {
    width: 151,
    height: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 21,
    marginHorizontal: 129,
    marginBottom: 20,
  },
});

export default HomeScreen;
