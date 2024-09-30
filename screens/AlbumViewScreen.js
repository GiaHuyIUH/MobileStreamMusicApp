import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default (AlbumViewScreen) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Album Artwork and Info */}
        <View style={styles.albumInfo}>
          <Image
            source={{ uri: 'https://s.yimg.com/ny/api/res/1.2/FyXeLDYArJFx_jRfVZIKNw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA-/https://media.zenfs.com/en/insider_articles_922/3cfb307db10dee35818faf40ebd4c8c6' }} // Replace with actual image
            style={styles.albumCover}
          />
          <Text style={styles.albumTitle}>1 (Remastered)</Text>
          <Text style={styles.artistName}>The Beatles</Text>
          <Text style={styles.albumYear}>Album • 2000</Text>
        </View>

        {/* Playback Controls */}
        <View style={styles.controls}>
          <TouchableOpacity>
            <Image
              source={{ uri: '../assets/images/hearticon.png' }} // Heart Icon
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={{ uri: '../assets/images/shuffleicon.png' }} // Shuffle Icon
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={{ uri: 'https://e7.pngegg.com/pngimages/261/757/png-clipart-computer-icons-google-play-music-button-play-angle-rectangle-thumbnail.png' }} // Play Button
              style={styles.playButton}
            />
          </TouchableOpacity>
        </View>

        {/* Track List */}
        <View style={styles.trackList}>
          {[
            { name: 'Love Me Do - Mono / Remastered', artist: 'The Beatles' },
            { name: 'From Me to You - Mono / Remastered', artist: 'The Beatles', playing: true },
            { name: 'She Loves You - Mono / Remastered', artist: 'The Beatles' },
            { name: 'I Want To Hold Your Hand - Remastered 2015', artist: 'The Beatles' },
          ].map((track, index) => (
            <View key={index} style={styles.trackItem}>
              <View>
                <Text style={[styles.trackName, track.playing && styles.playingTrack]}>
                  {track.name}
                </Text>
                <Text style={styles.trackArtist}>{track.artist}</Text>
              </View>
              <TouchableOpacity>
                {/* <Image
                    source={{ uri: '../assets/images/shuffleicon.png' }} // Shuffle Icon
                    style={styles.menuIcon}
                /> */}
                <Image
                  source={{ uri: '..//assets/images/3dots.png' }} // Menu (3 dots)
                  style={styles.menuIcon}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Now Playing Bar */}
      <View style={styles.nowPlayingBar}>
        <Image
          source={{ uri: '../assets/images/Artist1.png' }} // Mini Album Art
          style={styles.nowPlayingImage}
        />
        <View style={styles.nowPlayingInfo}>
          <Text style={styles.nowPlayingTrack}>From Me to You - Mono / Remastered</Text>
          <Text style={styles.nowPlayingArtist}>The Beatles</Text>
        </View>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://e7.pngegg.com/pngimages/261/757/png-clipart-computer-icons-google-play-music-button-play-angle-rectangle-thumbnail.png' }} // Pause Icon
            style={styles.nowPlayingControl}
          />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem}>
          <Image source={{ uri: '../assets/images/Homeicon.png' }} style={styles.navIcon} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Image source={{ uri: '../assets/images/Searchicon.png' }} style={styles.navIcon} />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Image source={{ uri: '../assets/images/libraryicon.png' }} style={styles.navIcon} />
          <Text style={styles.navText}>Your Library</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  albumInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  albumCover: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  albumTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  artistName: {
    fontSize: 16,
    color: '#B0B0B0',
    marginBottom: 5,
  },
  albumYear: {
    fontSize: 14,
    color: '#B0B0B0',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
  playButton: {
    width: 25,
    height: 25,
  },
  trackList: {
    paddingHorizontal: 20,
  },
  trackItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
  },
  trackName: {
    fontSize: 16,
    color: '#fff',
  },
  trackArtist: {
    fontSize: 14,
    color: '#B0B0B0',
  },
  playingTrack: {
    color: '#1DB954',
  },
  menuIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  nowPlayingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282828',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#121212',
  },
  nowPlayingImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  nowPlayingInfo: {
    flex: 1,
  },
  nowPlayingTrack: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  nowPlayingArtist: {
    fontSize: 14,
    color: '#B0B0B0',
  },
  nowPlayingControl: {
    width: 24,
    height: 24,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#282828',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  navText: {
    color: '#fff',
    fontSize: 12,
  },
});
