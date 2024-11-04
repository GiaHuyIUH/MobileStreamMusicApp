import { Pressable, TextInput, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../store/searchSlice";

export default function HeaderSearch() {
  const value = useSelector((state) => state.search.value);
  const dispatch = useDispatch();
  const handleChangeText = (text) => {
    setShow(true);
    dispatch(setSearchValue(text));
  };
  const [show, setShow] = React.useState(false);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TextInput
        onChangeText={(text) => handleChangeText(text)}
        value={value}
        placeholder="Search"
        placeholderTextColor="#fff"
        style={{
          width: 200,
          height: 40,
          paddingRight: 20,
          color: "#fff",
          borderWidth: 0,
          outlineStyle: "none",
        }}
      />
      {show && (
        <Pressable
          onPress={() => {
            setShow(false);
            dispatch(setSearchValue(""));
          }}
          style={{
            width: 20,
            height: 20,
            color: "#fff",
            marginLeft: 100,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Pressable>
      )}
    </View>
  );
}
