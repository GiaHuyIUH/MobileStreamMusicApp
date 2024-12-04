import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  setAudioUrl,
  setIsPlaying,
  setShowPlayer,
  setShowSubPlayer,
  setCurrentProgress,
  setCurrentSongIndex,
  setPlayerData,
  setRadioUrl,
  setIsLove,
} from "../store/playerSlice";
import AudioService from "../services/AudioService"; // Import AudioService
import { getInfoSong, getSong } from "../apis/song";
import { useAuth } from "../context/auth-context";
import addSongIntoUserLibrary from "../utils/addSongIntoUserLibrary";

export default function SubPlayer({ data }) {
  if (!data || Object.keys(data).length === 0) return null;

  const dispatch = useDispatch();
  const singleSong = useSelector((state) => state.player.data);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const audioUrl = useSelector((state) => state.player.audioUrl);
  const currentProgress = useSelector((state) => state.player.currentProgress);
  const isLove = useSelector((state) => state.player.isLove);
  const currentSongIndex = useSelector(
    (state) => state.player.currentSongIndex
  );
  const { userInfo, setUserInfo } = useAuth();
  const playlist = useSelector((state) => state.player.playlist);
  const isRepeat = useSelector((state) => state.player.isRepeat);
  const isRandom = useSelector((state) => state.player.isRandom);

  useEffect(() => {
    if (userInfo?.Songs?.some((song) => song.songId === singleSong.encodeId)) {
      dispatch(setIsLove(true));
    } else {
      dispatch(setIsLove(false));
    }
  }, [singleSong]);

  useEffect(() => {
    async function fetchAndPlaySong() {
      if (data.encodeId && data.duration > 0 && data?.streamingStatus === 1) {
        if (currentProgress === 0) {
          try {
            const songData = await getSong(data.encodeId); // Lấy URL bài hát
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
        }
      } else {
        dispatch(setIsPlaying(false));
        dispatch(setAudioUrl(""));
        dispatch(setRadioUrl(""));
        dispatch(setCurrentProgress(0));
        ToastAndroid.showWithGravityAndOffset(
          "🎵 This song is only for VIP users 🎶",
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          -200, // xOffset
          -100 // yOffset
        );
        setTimeout(() => {
          handleNext();
        }, 2000);
      }
    }

    fetchAndPlaySong();
  }, [data]);

  // Kiểm soát hành vi play/pause dựa trên trạng thái isPlaying
  useEffect(() => {
    if (isPlaying) {
      AudioService.play(); // Phát audio
    } else {
      AudioService.pause(); // Tạm dừng audio
    }
  }, [isPlaying]);

  useEffect(() => {
    if (AudioService.sound) {
      AudioService.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          const position = status.positionMillis;
          const duration = status.durationMillis;

          dispatch(setCurrentProgress(position / duration));

          // Kiểm tra nếu bài hát kết thúc
          if (status.didJustFinish) {
            if (isRepeat) {
              handleRepeat();
            } else if (isRandom) {
              handleRandomSong();
            } else {
              if (currentSongIndex === playlist.length - 1) {
                dispatch(setCurrentProgress(0));
                dispatch(setCurrentSongIndex(0));
                dispatch(setPlayerData(playlist[0]));
                dispatch(setIsPlaying(false));
              } else {
                handleNext();
              }
            }
          }
        }
      });
    }

    return () => {
      AudioService.setOnPlaybackStatusUpdate(null);
    };
  }, [AudioService.sound, isRepeat, isRandom, currentSongIndex, playlist]);

  // Section to handle Next and Previous song
  const handleNext = useCallback(() => {
    if (currentSongIndex < playlist.length - 1) {
      dispatch(setCurrentProgress(0));
      dispatch(setCurrentSongIndex(currentSongIndex + 1));
      dispatch(setAudioUrl(""));
      dispatch(setRadioUrl(""));
      dispatch(setPlayerData(playlist[currentSongIndex + 1]));
    }
  }, [currentSongIndex, playlist]);

  const handleRepeat = useCallback(() => {
    AudioService.playFromStart();
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

  const handleAdd = () => {
    if (
      addSongIntoUserLibrary(
        singleSong?.encodeId,
        singleSong?.title,
        singleSong?.thumbnailM,
        singleSong?.artistsNames,
        userInfo,
        setUserInfo
      )
    ) {
      dispatch(setIsLove(true));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          dispatch(setShowSubPlayer(false));
          dispatch(setShowPlayer(true));
        }}
        style={styles.subPlayer}
      >
        <View style={styles.infoContainer}>
          <Image style={styles.thumbnail} source={{ uri: data.thumbnailM }} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.artist}>{data.artistsNames}</Text>
          </View>
        </View>
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={handleAdd}>
            <Ionicons
              name={isLove ? "heart" : "heart-outline"}
              size={24}
              color={isLove ? "#1DB954" : "#fff"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(setIsPlaying(!isPlaying))}
            style={styles.iconButton}
            disabled={!audioUrl}
          >
            {isPlaying ? (
              <Ionicons name="pause-circle" size={30} color="#FFF" />
            ) : (
              <Ionicons name="play-circle" size={30} color="#FFF" />
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {/* Thanh tiến trình */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View
            style={[styles.progressBar, { width: `${currentProgress * 100}%` }]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1e",
    height: 70, // Tăng chiều cao của container để bao gồm cả thanh tiến trình
    width: "98%",
    borderRadius: 15,
    borderTopWidth: 1,
    borderTopColor: "#282828",
    alignSelf: "center",
    justifyContent: "flex-start", // Để phần điều khiển và thanh tiến trình có đủ không gian
    paddingBottom: 8, // Đảm bảo thanh tiến trình không bị cắt
  },
  subPlayer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 30, // Giảm chiều cao của subPlayer
    paddingHorizontal: 8, // Giảm khoảng cách ngang
    flex: 1,
  },
  
  infoContainer: {
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    paddingLeft: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFF",
  },
  artist: {
    fontSize: 12,
    fontWeight: "400",
    color: "#B3B3B3",
    marginTop: 2,
  },
  controlsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  iconButton: {
    marginHorizontal: 10,
  },
  progressBarContainer: {
    height: 4,
    marginHorizontal: 12,
    //marginBottom: 8, // Add space between the progress bar and other elements
  },
  progressBarBackground: {
    height: "100%",
    borderRadius: 9999,
    backgroundColor: "#404040",
  },
  progressBar: {
    height: "100%",
    borderRadius: 9999,
    backgroundColor: "#1DB954",
  },
});
