import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

const TrackViewScreen = () => {
  // Thêm dữ liệu thời gian vào trackData
  const trackData = {
    cover:
      "https://s.yimg.com/ny/api/res/1.2/FyXeLDYArJFx_jRfVZIKNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/insider_articles_922/3cfb307db10dee35818faf40ebd4c8c6",
    album: "1 (Remastered)",
    title: "From Me to You - Mono / Remast",
    artist: "The Beatles",
    startTime: "0:38",  
    endTime: "-1:18",     
  };

  const renderControlButtons = () => (
    <View style={styles.controlsContainer}>
      <TouchableOpacity>
        <MaterialCommunityIcons name="shuffle" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="play-skip-back-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.playButton}>
        <Ionicons name="pause-circle-outline" size={64} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="play-skip-forward-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialCommunityIcons name="repeat" size={24} color="#1DB954" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-down" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.albumTitle}>{trackData.album}</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Album Cover */}
      <Image source={{ uri: trackData.cover }} style={styles.albumCover} />

      {/* Track Info */}
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{trackData.title}</Text>
        <Text style={styles.trackArtist}>{trackData.artist}</Text>
      </View>

      {/* Progress Slider */}
      <View style={styles.progressContainer}>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#1DB954"
          maximumTrackTintColor="#fff"
          thumbTintColor="#1DB954"
        />
        {/* Render thời gian từ dữ liệu track */}
        <View style={styles.progressTime}>
          <Text style={styles.timeText}>{trackData.startTime}</Text>
          <Text style={styles.timeText}>{trackData.endTime}</Text>
        </View>
      </View>

      {/* Control Buttons */}
      {renderControlButtons()}

      {/* Footer Info */}
      <View style={styles.footer}>
        <Text style={styles.footerSource}>BEATSPILL+</Text>
        <View style={styles.footerIcons}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Lyrics and More Button */}
      <View style={styles.lyricsContainer}>
        <TouchableOpacity style={styles.lyricsButton}>
          <Text style={styles.lyricsText}>Lyrics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreText}>MORE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  albumTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  albumCover: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginVertical: 20,
  },
  trackInfo: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  trackTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  trackArtist: {
    color: "#B0B0B0",
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
  },
  progressContainer: {
    paddingHorizontal: 20,
  },
  progressTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: -10, 
  },
  timeText: {
    color: "#B0B0B0",
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  playButton: {
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 10,
  },
  footerSource: {
    color: "#1DB954",
    fontSize: 14,
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  lyricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#282828",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  lyricsButton: {
    backgroundColor: "#FFA500",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    marginRight: 10,
  },
  lyricsText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  moreButton: {
    backgroundColor: "#404040",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
  },
  moreText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default TrackViewScreen;
