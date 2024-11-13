import { Audio } from "expo-av";
import store from "../store/configureStore"; // Ensure this import is without destructuring
import { setAudioState } from "../store/playerSlice"; // Redux action to update state

class AudioService {
  constructor() {
    this.sound = null;
    this.isLoaded = false;
  }

  async loadAudio(uri) {
    if (this.sound) {
      await this.sound.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync({ uri });
    this.sound = sound;
    this.isLoaded = true;
    this.sound.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
  }

  onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      store.dispatch(
        setAudioState({
          isPlaying: status.isPlaying,
          currentProgress: status.positionMillis / status.durationMillis,
          duration: status.durationMillis,
        })
      );
    }
  };

  async play() {
    if (this.isLoaded) await this.sound.playAsync();
  }

  async pause() {
    if (this.isLoaded) await this.sound.pauseAsync();
  }

  async stop() {
    if (this.sound && this.isLoaded) {
      await this.sound.stopAsync();
    }
  }

  unload() {
    if (this.sound) {
      this.sound.unloadAsync();
    }
  }

  async seek(position) {
    if (this.isLoaded) await this.sound.setPositionAsync(position);
  }
}

export default new AudioService();
