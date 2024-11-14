import React, { useCallback, useEffect, useRef, useState } from "react";
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
  setIsPlaying,
  setCurrentSongIndex,
  setRadioUrl,
  setPlayerData,
} from "../store/playerSlice";
import AudioService from "../services/AudioService"; // Import AudioService
import { useNavigation } from "@react-navigation/core";

const TrackViewScreen = () => {
  const navigation = useNavigation();
  const singleSong = useSelector((state) => state.player.data);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const currentProgress = useSelector((state) => state.player.currentProgress);
  const duration = useSelector((state) => state.player.duration);
  const playlist = useSelector((state) => state.player.playlist);
  const currentSongIndex = useSelector(
    (state) => state.player.currentSongIndex
  );
  const data = useSelector((state) => state.player.data);
  const isRepeat = useSelector((state) => state.player.isRepeat);
  const isRandom = useSelector((state) => state.player.isRandom);
  const isLove = useSelector((state) => state.player.isLove);
  const dispatch = useDispatch();
  const lyrics = useLyric(singleSong.encodeId);
  const [album, setAlbum] = useState(null);

  // State để hiển thị modal
  const [modalVisible, setModalVisible] = useState(false);
  const [intervalId, setIntervalId] = useState(null); // To store interval ID

  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const flatListRef = useRef(null);

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
    async function fetchAndPlaySong() {
      if (
        singleSong.encodeId &&
        singleSong.duration > 0 &&
        singleSong?.streamingStatus === 1
      ) {
        if (currentProgress === 0) {
          try {
            const songData = await getSong(singleSong.encodeId); // Lấy URL bài hát
            const res = await getInfoSong(singleSong.encodeId);
            setAlbum(res.data);
            dispatch(setAudioUrl(songData.data[128])); // Cập nhật URL vào Redux

            // Tải nhạc và tự động phát khi tải xong
            await AudioService.loadAudio(songData.data[128]);
            await AudioService.play(); // Tự động phát nhạc sau khi tải xong

            // Cập nhật trạng thái isPlaying trong Redux sau khi nhạc bắt đầu phát
            dispatch(setIsPlaying(true));
          } catch (error) {
            console.error("Error fetching song details:", error);
            dispatch(setIsPlaying(false)); // Đặt isPlaying về false nếu có lỗi
          }
        } else {
          await AudioService.play(); // Tự động phát nhạc sau khi tải xong
        }
      }
    }

    fetchAndPlaySong();

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

  useEffect(() => {
    const index = lyrics.findIndex(
      (lyric) =>
        currentProgress * duration >= lyric.startTime &&
        currentProgress * duration < lyric.endTime
    );
    if (index !== -1 && index !== currentLyricIndex) {
      setCurrentLyricIndex(index);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index, animated: true });
      }
    }
  }, [currentProgress, duration]);

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

  // Thêm hàm xử lý khi nhấn vào lyric
  const handleLyricPress = async (startTime) => {
    try {
      await AudioService.seek(startTime); // Tua đến thời gian startTime của lyric
      dispatch(setIsPlaying(true)); // Bắt đầu phát nhạc
      await AudioService.play(); // Phát nhạc nếu nhạc đang tạm dừng
    } catch (error) {
      console.error("Error seeking audio:", error);
    }
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      await AudioService.pause();
      dispatch(setIsPlaying(false));
    } else {
      await AudioService.play();
      dispatch(setIsPlaying(true));
    }
  };

  const renderLyricItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleLyricPress(item.startTime)}>
      <View
        style={
          index === currentLyricIndex
            ? styles.activeLyricItem
            : styles.lyricItem
        }
      >
        <Text style={styles.lyricText}>{item.data}</Text>
      </View>
    </TouchableOpacity>
  );

  // Section to handle Next and Previous song
  const handleNext = useCallback(() => {
    if (currentSongIndex < playlist.length - 1) {
      dispatch(setCurrentProgress(0));
      dispatch(setCurrentSongIndex(currentSongIndex + 1));
      dispatch(setAudioUrl(""));
      dispatch(setRadioUrl(""));
      dispatch(setPlayerData(playlist[currentSongIndex + 1]));
      dispatch(setIsPlaying(true));
    }
  }, [currentSongIndex, playlist]);

  const handlePrev = useCallback(() => {
    if (currentSongIndex > 0) {
      dispatch(setCurrentSongIndex(currentSongIndex - 1));
      dispatch(setPlayerData(playlist[currentSongIndex - 1]));
      dispatch(setAudioUrl(""));
      dispatch(setRadioUrl(""));
      dispatch(setCurrentProgress(0));
      dispatch(setIsPlaying(true));
    }
  }, [currentSongIndex, playlist]);
  const handleRepeat = useCallback(() => {
    dispatch(setCurrentProgress(0));
  }, []);

  const handleRandomSong = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * playlist.length);
    dispatch(setCurrentSongIndex(randomIndex));
    dispatch(setPlayerData(playlist[randomIndex]));
    dispatch(setAudioUrl(""));
    dispatch(setRadioUrl(""));
    dispatch(setCurrentProgress(0));
    dispatch(setIsPlaying(true));
  }, [playlist]);

  return (
    <View style={styles.container}>
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
        <TouchableOpacity onPress={handlePrev}>
          <Ionicons name="play-skip-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          <Ionicons
            name={isPlaying ? "pause-circle-outline" : "play-circle-outline"}
            size={64}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <Ionicons name="play-skip-forward-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRepeat}>
          <MaterialCommunityIcons name="repeat" size={24} color="#1DB954" />
        </TouchableOpacity>
      </View>

      <View style={styles.lyricsContainer}>
        {lyrics.length !== 0 ? (
          <FlatList
            ref={flatListRef}
            data={lyrics}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderLyricItem}
            extraData={currentLyricIndex}
            showsVerticalScrollIndicator={false}
            getItemLayout={(data, index) => ({
              length: 40,
              offset: 40 * index,
              index,
            })}
            onScrollToIndexFailed={(info) => {
              const wait = new Promise((resolve) => setTimeout(resolve, 500));
              wait.then(() => {
                flatListRef.current?.scrollToIndex({
                  index: info.index,
                  animated: true,
                });
              });
            }}
          />
        ) : (
          <Text style={{ fontSize: 21, fontWeight: 600, color: "#fff" }}>
            No lyrics available for this song.
          </Text>
        )}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
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
          </View>
        </View>
      </Modal>
    </View>
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
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    flexWrap: "wrap",
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
    marginTop: 10,
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
  footerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  lyricsContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#282828",
    borderRadius: 10,
    marginHorizontal: 20,
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
    marginBottom: 10,
  },
  lyricText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
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
  lyricItem: {
    padding: 10,
    opacity: 0.6,
  },
  activeLyricItem: {
    width: "100%",
    padding: 10,
    backgroundColor: "#525356", // Highlight color for active lyric
    opacity: 1,
    borderRadius: 10,
  },
});

export default TrackViewScreen;
