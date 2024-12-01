import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Swiper from "react-native-swiper/src";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentProgress,
  setCurrentSongIndex,
  setIsPlaying,
  setPlaylist,
} from "../../store/playerSlice";
import PlaylistHeader from "./PlaylistHeader";
import ListMusics from "./ListMusics";

export default function Hub({ data, navigation }) {
  const dispatch = useDispatch();
  const itemData = data?.sections?.slice(0, 2);

  useEffect(() => {
    if (itemData && itemData[1]?.items) {
      dispatch(setPlaylist(itemData[1]?.items));
      dispatch(setCurrentProgress(0));
      dispatch(setCurrentSongIndex(0));
    }
  }, [itemData, dispatch]);

  if (!itemData) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <PlaylistHeader data={data} type="hub" />
      <View style={{ marginBottom: 10 }}>
        <View>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "700",
              marginTop: 20,
              textTransform: "capitalize",
            }}
          >
            Trending
          </Text>
          <Swiper
            style={{ height: 200, marginTop: 10 }}
            showsPagination={false}
          >
            {itemData[0]?.items.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  dispatch(setIsPlaying(false));
                  dispatch(setCurrentProgress(0));
                  dispatch(setCurrentSongIndex(0));
                  navigation.navigate("PlayList", {
                    id: item.encodeId,
                  });
                }}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: item.thumbnailM }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 8,
                    resizeMode: "contain",
                  }}
                />
              </Pressable>
            ))}
          </Swiper>
        </View>
      </View>
      <View style={{ marginBottom: 80 }}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "700",
            marginTop: 20,
            textTransform: "capitalize",
          }}
        >
          {itemData[1]?.title}
        </Text>
        <ListMusics data={itemData[1]} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    overflow: "scroll",
  },
});
