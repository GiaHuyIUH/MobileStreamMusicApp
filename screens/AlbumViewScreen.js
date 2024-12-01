// AlbumViewScreen.js

import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { zingmp3Api } from "../apis/constants";
import axios from "axios";
import PlaylistHeader from "../modules/Playlist/PlaylistHeader";
import ListMusics from "../modules/Playlist/ListMusics";

const AlbumViewScreen = () => {
  const album = useSelector((state) => state.player.albumData);
  const [data, setData] = React.useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchPlayListData() {
      try {
        const res = await axios.get(
          zingmp3Api.getAlbumPage(album?.album.encodeId)
        );
        const data = res.data;
        setData(data.data);
        if (data?.data?.song?.items) {
          dispatch(setPlaylist(data.data.song.items));
        }
      } catch (error) {
        console.error("Failed to fetch playlist data:", error);
      }
    }
    fetchPlayListData();
  }, [album, dispatch]);

  return (
    <ScrollView style={styles.container}>
      <PlaylistHeader data={data} type="playlist" />
      <ListMusics data={data?.song} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    overflow: "scroll",
  },
});

export default AlbumViewScreen;
