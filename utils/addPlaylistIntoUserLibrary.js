import {
  collection,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { auth, db } from "../components/firebase";
import { ToastAndroid } from "react-native";

export default async function addPlaylistIntoUserLibrary(
  playlistId,
  name,
  thumbnail,
  userInfo,
  setUserInfo
) {
  try {
    // Get a reference to the user's document in the 'users' collection
    const userId = auth.currentUser.uid;
    const userRef = doc(collection(db, "users"), userId);

    // Get the current state of the user's document
    const userDoc = await getDoc(userRef);

    // Create a playlist object
    const playlist = { playlistId, name, thumbnail };

    // Check if the Playlist array contains the playlist
    if (
      userDoc.exists() &&
      userDoc.data().Playlist?.some((pl) => pl.playlistId === playlistId)
    ) {
      ToastAndroid.show("Playlist existed", ToastAndroid.SHORT);
      return;
    }

    // Update the user's document by adding the playlist to the Playlist array
    await updateDoc(userRef, {
      Playlist: arrayUnion(playlist),
    });
    // Update userInfo
    setUserInfo({
      ...userInfo,
      Playlist: [...(userInfo.Playlist || []), playlist],
    });
    ToastAndroid.show("Add playlist success", ToastAndroid.SHORT);
  } catch (error) {
    console.log("error:", error);
    ToastAndroid.show("Add playlist failed", ToastAndroid.SHORT);
  }
}
