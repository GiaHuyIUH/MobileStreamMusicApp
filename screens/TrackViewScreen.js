import React, { useEffect, useState } from "react";
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
import { getInfoSong, getSong } from "../apis/song";
import { Audio } from "expo-av";

const TrackViewScreen = ({ route, navigation }) => {
  const [album, setAlbum] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0); // Current position
  const [duration, setDuration] = useState(1); // Total duration
  const { song } = route.params;

  // Helper function to format milliseconds to mm.ss format
  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}.${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    async function fetchSongDetail() {
      try {
        const res = await getInfoSong(song.encodeId);
        setAlbum(res.data);
      } catch (error) {
        console.error("Error fetching song details:", error);
      }
    }

    fetchSongDetail();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync(); // Unload sound when component unmounts
        }
      : undefined;
  }, [sound]);

  const playSound = async () => {
    try {
      const { data } = await getSong(song.encodeId); // Fetch song URL
      const { sound } = await Audio.Sound.createAsync(
        { uri: data["128"] },
        { shouldPlay: true }
      );
      setSound(sound);
      setIsPlaying(true);

      // Update position and duration in real-time
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis || 1); // Prevent division by zero
          if (status.didJustFinish) {
            setIsPlaying(false);
          }
        }
      });
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    } else {
      playSound();
    }
  };

  const handleSliderChange = async (value) => {
    if (sound) {
      const seekPosition = value * duration;
      await sound.setPositionAsync(seekPosition);
      setPosition(seekPosition);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-down" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.albumTitle}>{album?.album?.title || "Album"}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TrackControlScreen", { track: album })
          }
        >
          <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Album Cover */}
      <Image source={{ uri: song.thumbnailM }} style={styles.albumCover} />

      {/* Track Info */}
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{song.title}</Text>
        <Text style={styles.trackArtist}>{song.artistsNames}</Text>
      </View>

      {/* Progress Slider */}
      <View style={styles.progressContainer}>
        <Slider
          style={{ width: "100%", height: 20 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#1DB954"
          maximumTrackTintColor="#fff"
          thumbTintColor="#1DB954"
          value={position / duration}
          onSlidingComplete={handleSliderChange}
        />
        <View style={styles.progressTime}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>

      {/* Control Buttons */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="shuffle" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="play-skip-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          <Ionicons
            name={isPlaying ? "pause-circle-outline" : "play-circle-outline"}
            size={64}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="play-skip-forward-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="repeat" size={24} color="#1DB954" />
        </TouchableOpacity>
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
    width: "90%",
    height: "40%",
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: 20,
    resizeMode: "cover",
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
  footerBluetoothContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  footerSource: {
    color: "#1DB954",
    fontSize: 12,
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
