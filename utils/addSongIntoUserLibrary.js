import {
  collection,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { auth, db } from "../components/firebase";
import Toast from "react-native-toast-message";
export default async function addSongIntoUserLibrary(
  songId,
  name,
  thumbnail,
  artistsNames,
  userInfo,
  setUserInfo
) {
  try {
    // Get a reference to the user's document in the 'users' collection
    const userId = auth.currentUser.uid;
    const userRef = doc(collection(db, "users"), userId);

    // Get the current state of the user's document
    const userDoc = await getDoc(userRef);

    // Create a song object
    const song = { songId, name, thumbnail, artistsNames };

    // Check if the Songs array contains the song
    if (
      userDoc.exists() &&
      userDoc.data().Songs?.some((s) => s.songId === songId)
    ) {
      Toast.show({
        type: "success",
        text1: "Thông báo",
        text2: "Bài hát đã có trong thư viện của bạn",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return;
    }

    // Update the user's document by adding the song to the Songs array
    await updateDoc(userRef, {
      Songs: arrayUnion(song),
    });

    // Update userInfo
    setUserInfo({
      ...userInfo,
      Songs: [...(userInfo.Songs || []), song],
    });
    Toast.show({
      type: "success",
      text1: "Thông báo",
      text2: "Thêm bài hát vào thư viện thành công",
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    console.log("Song added to library");
  } catch (error) {
    console.log("error:", error);
  }
}
