import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default (TrackScreen) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Album Info */}
        <View style={styles.albumInfo}>
          <Image
            source={require('../assets/images/Artist1.png')} // Use require for local images
            style={styles.albumCover}
          />
          <Text style={styles.albumTitle}>1 (Remastered)</Text>
          <Text style={styles.artistName}>The Beatles</Text>
        </View>

        {/* Options List */}
        <View style={styles.optionList}>
          <TouchableOpacity style={styles.optionItem}>
            <Image source={require('../assets/images/hearticon.png')} style={styles.optionIcon} />
            <Text style={styles.optionLabel}>Like</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Image source={require('../assets/images/hide.png')} style={styles.optionIcon} />
            <Text style={styles.optionLabel}>Hide song</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Image source={require('../assets/images/addplaylist.png')} style={styles.optionIcon} />
            <Text style={styles.optionLabel}>Add to playlist</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Image source={require('../assets/images/addqueue.png')} style={styles.optionIcon} />
            <Text style={styles.optionLabel}>Add to queue</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Image source={require('../assets/images/share.png')} style={styles.optionIcon} />
            <Text style={styles.optionLabel}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Image source={require('../assets/images/radio.png')} style={styles.optionIcon} />
            <Text style={styles.optionLabel}>Go to radio</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Image source={require('../assets/images/viewalbum.png')} style={styles.optionIcon} />
            <Text style={styles.optionLabel}>View album</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Image source={require('../assets/images/viewartist.png')} style={styles.optionIcon} />
            <Text style={styles.optionLabel}>View artist</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Image source={require('../assets/images/songcredits.png')} style={styles.optionIcon} />
            <Text style={styles.optionLabel}>Song credits</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Image source={require('../assets/images/sleeptimer.png')} style={styles.optionIcon} />
            <Text style={styles.optionLabel}>Sleep timer</Text>
          </TouchableOpacity>
        </View>

        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark background to resemble the music app theme
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20, // Adjust padding for proper alignment
  },
  albumInfo: {
    alignItems: 'center',
    marginBottom: 20, // Adjust for spacing between album info and options
  },
  albumCover: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 8,
  },
  albumTitle: {
    fontSize: 22, // Adjusted size for better appearance
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center', // Center align the album title text
  },
  artistName: {
    fontSize: 14, // Match the font size for the artist name
    color: '#B0B0B0',
    marginTop: 5,
  },
  optionList: {
    width: '100%',
    paddingHorizontal: 20, // Adjust padding to center the list of options
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#282828', // Grey divider between items
  },
  optionIcon: {
    width: 25,
    height: 25,
    marginRight: 20, // Adjust spacing between icon and text
  },
  optionLabel: {
    fontSize: 16,
    color: '#FFF', // White text for better contrast
  },
  closeButton: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 60, // Adjust padding for better appearance
    backgroundColor: '#1DB954', // Green close button similar to the Spotify theme
    borderRadius: 50,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
