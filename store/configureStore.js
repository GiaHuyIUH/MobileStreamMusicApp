import { configureStore, combineReducers } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import playerSlice from "./playerSlice";

const reducer = combineReducers({
  search: searchSlice,
  player: playerSlice,
});

const store = configureStore({
  reducer,
});

export default store;
