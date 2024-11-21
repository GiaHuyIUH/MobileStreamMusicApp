import React, { forwardRef, useRef, useImperativeHandle } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import RBSheet from "react-native-raw-bottom-sheet";

const TrackOptionBottomSheet = forwardRef(({ trackData }, ref) => {
  const refRBSheet = useRef();

  useImperativeHandle(ref, () => ({
    open: () => {
      refRBSheet.current.open();
    },
    close: () => {
      refRBSheet.current.close();
    },
  }));
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
      onPress={item.onPress}
      activeOpacity={0.6} // Hiệu ứng mờ khi nhấn
    >
      <MaterialCommunityIcons name={item.icon} size={24} color="#fff" />
      <Text style={styles.controlText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <RBSheet
      ref={refRBSheet}
      useNativeDriver={false}
      height={500}
      closeOnPressBack={true}
      draggable={true}
      dragOnContent={true}
      customStyles={{
        wrapper: {
          backgroundColor: "transparent",
        },
        draggableIcon: {
          backgroundColor: "#ccc",
        },
        container: {
          backgroundColor: "#212121",
        },
      }}
      customModalProps={{
        animationType: "slide",
        statusBarTranslucent: true,
      }}
      customAvoidingViewProps={{
        enabled: false,
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: trackData.cover }} style={styles.albumCover} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{trackData.title}</Text>
            <Text style={styles.artist}>{trackData.artist}</Text>
          </View>
        </View>
        <FlatList
          data={controls}
          renderItem={renderControlItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121", // Màu nền đen chuẩn của Spotify
    paddingTop: 10, // Khoảng cách bên trong
  },
  listContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a", // Dùng đường viền mờ giữa các mục
  },
  albumCover: {
    width: 50,
    height: 50,
    borderRadius: 8, // Làm góc tròn hơn
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: "column",
    marginLeft: 10,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 5,
  },
  artist: {
    color: "#b3b3b3", // Sử dụng màu xám nhạt hơn cho nghệ sĩ
    fontSize: 14,
  },
  controlItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a", // Dùng đường viền mờ giữa các mục
  },
  controlText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 15,
    fontWeight: "400", // Font cân bằng, không quá dày
  },
});

export default TrackOptionBottomSheet;
