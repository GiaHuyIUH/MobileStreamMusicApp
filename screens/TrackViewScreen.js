import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { getInfoSong, getSong } from "../apis/song";
import useLyric from "../hooks/useLyric";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowSubPlayer,
  setAudioUrl,
  setShowPlayer,
  setCurrentProgress,
} from "../store/playerSlice";
import AudioService from "../services/AudioService"; // Import AudioService
import { useNavigation } from "@react-navigation/core";

const TrackViewScreen = () => {
  const navigation = useNavigation();
  const singleSong = useSelector((state) => state.player.data);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const currentProgress = useSelector((state) => state.player.currentProgress);
  const duration = useSelector((state) => state.player.duration);
  const dispatch = useDispatch();
  const lyrics = useLyric(singleSong.encodeId);
  const [album, setAlbum] = useState(null);

  // State để hiển thị modal
  const [modalVisible, setModalVisible] = useState(false);
  const [intervalId, setIntervalId] = useState(null); // To store interval ID

  const trackData = {
    cover: singleSong.thumbnail,
    title: singleSong.title,
    artist: singleSong.artistsNames,
  };

  const controls = [
    { id: "1", icon: "heart-outline", name: "Like" },
    { id: "2", icon: "eye-off-outline", name: "Hide song" },
    { id: "3", icon: "playlist-music-outline", name: "Add to playlist" },
    { id: "4", icon: "playlist-plus", name: "Add to queue" },
    { id: "5", icon: "share-outline", name: "Share" },
    { id: "6", icon: "radio", name: "Go to radio" },
    {
      id: "7",
      icon: "album",
      name: "View album",
      onPress: () =>
        navigation.navigate("AlbumRadioScreen", { album: trackData }),
    },
    { id: "8", icon: "account-music", name: "View artist" },
    { id: "9", icon: "music-circle-outline", name: "Song credits" },
    { id: "10", icon: "moon-waning-crescent", name: "Sleep timer" },
  ];

  const renderControlItem = ({ item }) => (
    <TouchableOpacity
      style={styles.controlItem}
      onPress={item.onPress} // Thêm sự kiện chuyển hướng cho biểu tượng album
    >
      <MaterialCommunityIcons name={item.icon} size={24} color="#fff" />
      <Text style={styles.controlText}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Hàm mở modal
  const openModal = () => setModalVisible(true);

  // Hàm đóng modal
  const closeModal = () => setModalVisible(false);

  useEffect(() => {
    async function fetchSongDetail() {
      try {
        const songData = await getSong(singleSong.encodeId); // Lấy URL của bài hát
        console.log("Song data:", songData.data[128]);
        const res = await getInfoSong(singleSong.encodeId);
        setAlbum(res.data);
        dispatch(setAudioUrl(songData.data[128])); // Lưu URL vào Redux
        await AudioService.loadAudio(songData.data[128]); // Tải bài hát qua AudioService
      } catch (error) {
        console.error("Error fetching song details:", error);
      }
    }

    fetchSongDetail();
    // Clean up the interval when the component unmounts or song changes
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [singleSong]);

  // Start/Stop updating the progress when play/pause
  useEffect(() => {
    if (isPlaying) {
      const id = setInterval(async () => {
        const status = await AudioService.sound.getStatusAsync();
        if (status.isLoaded) {
          const position = status.positionMillis;
          dispatch(setCurrentProgress(position / status.durationMillis));
        }
      }, 1000); // Update every second
      setIntervalId(id); // Save the interval ID for cleanup
    } else {
      if (intervalId) {
        clearInterval(intervalId); // Stop updating progress if paused
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, duration]);

  // Hàm phát và tạm dừng
  const handlePlayPause = async () => {
    if (isPlaying) {
      await AudioService.pause(); // Tạm dừng qua AudioService
    } else {
      await AudioService.play(); // Phát qua AudioService
    }
  };

  // Hàm xử lý khi kéo thanh tiến trình
  const handleSliderChange = async (value) => {
    const seekPosition = value * duration;
    await AudioService.seek(seekPosition); // Tua bài hát qua AudioService
  };

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const renderLyricItem = ({ item }) => (
    <View style={styles.lyricItem}>
      <Text style={styles.lyricText}>{item.data}</Text>
      <Text style={styles.timeText}>
        {item.startTime} - {item.endTime}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            dispatch(setShowSubPlayer(true));
            dispatch(setShowPlayer(false));
          }}
        >
          <Ionicons name="chevron-down" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.albumTitle}>{album?.album?.title || "Album"}</Text>
        <TouchableOpacity onPress={() => openModal()}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: singleSong.thumbnailM }}
        style={styles.albumCover}
      />

      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{singleSong.title}</Text>
        <Text style={styles.trackArtist}>{singleSong.artistsNames}</Text>
      </View>

      <View style={styles.progressContainer}>
        <Slider
          style={{ width: "100%", height: 20 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#1DB954"
          maximumTrackTintColor="#fff"
          thumbTintColor="#1DB954"
          value={currentProgress}
          onSlidingComplete={handleSliderChange}
        />
        <View style={styles.progressTime}>
          <Text style={styles.timeText}>
            {formatTime(currentProgress * duration)}
          </Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={() => console.log("Shuffle")}>
          <MaterialCommunityIcons name="shuffle" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Previous")}>
          <Ionicons name="play-skip-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          <Ionicons
            name={isPlaying ? "pause-circle-outline" : "play-circle-outline"}
            size={64}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Next")}>
          <Ionicons name="play-skip-forward-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Repeat")}>
          <MaterialCommunityIcons name="repeat" size={24} color="#1DB954" />
        </TouchableOpacity>
      </View>

      <View style={styles.lyricsContainer}>
        <FlatList
          data={lyrics}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderLyricItem}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <ScrollView style={styles.modalContainer}>
            <View style={styles.header1}>
              <Image
                source={{ uri: trackData.cover }}
                style={styles.albumCover1}
              />
              <Text style={styles.albumTitle1}>{trackData.title}</Text>
              <Text style={styles.artistName}>{trackData.artist}</Text>
            </View>

            {/* FlatList to render control items */}
            <FlatList
              data={controls}
              renderItem={renderControlItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
            />

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => closeModal()}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </ScrollView>
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
    height: 300,
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#121212",
    borderRadius: 10,
    padding: 20,
  },
  lyricItem: {
    marginBottom: 16,
  },
  lyricText: {
    fontSize: 16,
    color: "#fff",
  },
  timeText: {
    fontSize: 12,
    color: "#666",
  },
  container1: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header1: {
    alignItems: "center",
    paddingVertical: 20,
  },
  albumCover1: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: "contain",
  },
  albumTitle1: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  artistName: {
    fontSize: 16,
    color: "#B0B0B0",
    marginTop: 5,
    textAlign: "center",
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  controlItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#282828",
  },
  controlText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 15,
  },
  closeButton: {
    alignItems: "center",
    paddingVertical: 15,
    marginBottom: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default TrackViewScreen;
