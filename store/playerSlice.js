import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    showPlayer: false,
    data: {},
    isPlaying: false,
    audioUrl: "",
    radioUrl: "",
    currentProgress: 0,
    showSubPlayer: false,
    isRandom: false,
    isRepeat: false,
    currentSongIndex: 0,
    playlist: [],
    playlistId: "",
    isLove: false,
    isLoading: false,
  },
  reducers: {
    setShowPlayer: (state, action) => {
      state.showPlayer = action.payload;
    },
    setPlayerData: (state, action) => {
      state.data = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setAudioUrl: (state, action) => {
      state.audioUrl = action.payload;
    },
    setRadioUrl: (state, action) => {
      state.radioUrl = action.payload;
    },
    setCurrentProgress: (state, action) => {
      state.currentProgress = action.payload;
    },
    setShowSubPlayer: (state, action) => {
      state.showSubPlayer = action.payload;
    },
    setIsRandom: (state, action) => {
      state.isRandom = action.payload;
    },
    setIsRepeat: (state, action) => {
      state.isRepeat = action.payload;
    },
    setCurrentSongIndex: (state, action) => {
      state.currentSongIndex = action.payload;
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    setPlaylistId: (state, action) => {
      state.playlistId = action.payload;
    },
    setIsLove: (state, action) => {
      state.isLove = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setShowPlayer,
  setPlayerData,
  setIsPlaying,
  setAudioUrl,
  setRadioUrl,
  setCurrentProgress,
  setShowSubPlayer,
  setIsRandom,
  setIsRepeat,
  setCurrentSongIndex,
  setPlaylist,
  setPlaylistId,
  setIsLove,
  setIsLoading,
} = playerSlice.actions;
export default playerSlice.reducer;
