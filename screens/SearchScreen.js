import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View, // Correctly importing View from react-native
} from "react-native";
import React from "react";
import { zingmp3Api } from "../apis/constants";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { setCurrentProgress, setIsPlaying } from "../store/playerSlice";

const data = [
  {
    id: 1,
    title: "New Releases",
    color: "#9854b2",
    api: zingmp3Api.getNewSong(),
  },
  {
    id: 2,
    title: "Radio",
    color: "#678026",
    api: zingmp3Api.getRadioPage(),
  },
  {
    id: 3,
    title: "V-Pop",
    color: "#3371e4",
    api: zingmp3Api.getHubDetail("IWZ9Z087"),
  },
  {
    id: 4,
    title: "Dance/Electronic",
    color: "#cf4321",
    api: zingmp3Api.getHubDetail("IWZ9Z08B"),
  },
  {
    id: 5,
    title: "K-Pop",
    color: "#abbb6d",
    api: zingmp3Api.getHubDetail("IWZ9Z08U"),
  },
  {
    id: 6,
    title: "US-UK",
    color: "#8768a7",
    api: zingmp3Api.getHubDetail("IWZ9Z086"),
  },
  {
    id: 7,
    title: "C-Pop",
    color: "#F037A5",
    api: zingmp3Api.getHubDetail("IWZ9Z08Z"),
  },
  {
    id: 8,
    title: "Bolero",
    color: "#223160",
    api: zingmp3Api.getHubDetail("IWZ9Z09U"),
  },
  {
    id: 9,
    title: "Children's",
    color: "brown",
    api: zingmp3Api.getHubDetail("IWZ9Z090"),
  },
  {
    id: 10,
    title: "Jazz",
    color: "#148A08",
    api: zingmp3Api.getHubDetail("IWZ9Z0AB"),
  },
  {
    id: 11,
    title: "Latin",
    color: "#F037A5",
    api: zingmp3Api.getHubDetail("IWZ9Z08F"),
  },
  {
    id: 12,
    title: "Classical",
    color: "#FDBB2C",
    api: zingmp3Api.getHubDetail("IWZ9Z0C9"),
  },
  {
    id: 13,
    title: "Hip Hop",
    color: "#1DB954",
    api: zingmp3Api.getHubDetail("IWZ9Z08C"),
  },
  {
    id: 14,
    title: "Remix",
    color: "#1DB954",
    api: zingmp3Api.getHubDetail("IWZ9Z0BO"),
  },
];

export default function SearchScreen({ navigation }) {
  const dispatch = useDispatch();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.stickyContainer}>
        <Header title={"Search"} navigation={navigation} />
        <Pressable
          onPress={() => navigation.navigate("SearchView")}
          style={styles.searchInput}
        >
          <Text>{/* SVG icon */}</Text>
          <Text style={styles.searchText}>What do you want to listen to?</Text>
        </Pressable>
      </View>
      <Text style={styles.browseText}>Browse all</Text>
      <View style={styles.contentContainer}>
        <FlatList
          columnWrapperStyle={styles.columnWrapper}
          numColumns={2}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                dispatch(setIsPlaying(false));
                dispatch(setCurrentProgress(0));
                navigation.navigate("CategoryDetail", { item });
              }}
              style={[styles.item, { backgroundColor: item.color }]}
            >
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.itemText}
              >
                {item.title}
              </Text>
            </Pressable>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    paddingTop: 40,
    paddingLeft: 16,
    paddingRight: 16,
  },
  stickyContainer: {
    position: "sticky", // Positioning to make it stick to top
    top: 0, // Keep it at the top of the screen
    zIndex: 1, // Ensure it stays above other content
    backgroundColor: "#000", // Background color matching the screen
    paddingBottom: 10,
  },
  searchInput: {
    width: "100%",
    height: 44,
    backgroundColor: "white",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    gap: 8,
    marginBottom: 20,
  },
  searchText: {
    fontSize: 16,
    fontWeight: "400",
    color: "black",
  },
  browseText: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 35,
    color: "white",
    textTransform: "uppercase",
  },
  contentContainer: {
    marginBottom: 80,
  },
  columnWrapper: {
    marginRight: 16,
    marginLeft: 8,
  },
  item: {
    width: 164,
    height: 92,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 16,
    marginRight: 16,
  },
  itemText: {
    marginTop: 15,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
});
