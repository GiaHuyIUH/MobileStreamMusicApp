import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  setAudioUrl,
  setIsPlaying,
  setShowPlayer,
  setShowSubPlayer,
  setCurrentProgress,
} from "../../store/playerSlice";
import AudioService from "../../services/AudioService"; // Import AudioService

export default function SubPlayer({ data }) {
  if (!data || Object.keys(data).length === 0) return null;

  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const audioUrl = useSelector((state) => state.player.audioUrl);
  const currentProgress = useSelector((state) => state.player.currentProgress);
  const [progressWidth, setProgressWidth] = useState(0);

  // Cập nhật progressWidth dựa trên tiến trình hiện tại của bài hát
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const status = await AudioService.sound.getStatusAsync();
        if (status.isLoaded) {
          const progress =
            (status.positionMillis / status.durationMillis) * 100;
          setProgressWidth(progress);
          dispatch(setCurrentProgress(status.positionMillis));
        }
      } catch (error) {
        console.error("Error updating progress:", error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  // Kiểm soát hành vi play/pause dựa trên trạng thái isPlaying
  useEffect(() => {
    if (isPlaying) {
      AudioService.play(); // Phát audio
    } else {
      AudioService.pause(); // Tạm dừng audio
    }
  }, [isPlaying]);

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
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart" size={20} color="#1DB954" />
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
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBar, { width: `${progressWidth}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1e",
    height: 64,
    width: "98%",
    borderRadius: 15,
    borderTopWidth: 1,
    borderTopColor: "#282828",
    alignSelf: "center",
  },
  subPlayer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 54,
    paddingHorizontal: 12,
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
    gap: 20,
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressBarBackground: {
    height: 4,
    borderRadius: 9999,
    backgroundColor: "#404040",
  },
  progressBar: {
    height: 4,
    borderRadius: 9999,
    backgroundColor: "#1DB954",
  },
});
