import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default (AlbumControlScreen) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Album Info */}
        <View style={styles.albumInfo}>
          <Image
            source={{ uri: '../assets/images/Artist1.png' }} // Thay thế bằng ảnh thực
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
            <Image source={require('../assets/images/viewartist.png')} style={styles.optionIcon} />
            <Text style={styles.optionLabel}>View artist</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Image source={require('../assets/images/share.png')} style={styles.optionIcon} />
            <Text style={styles.optionLabel}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Image source={require('../assets/images/hearticon.png')} style={styles.optionIcon} />
            <Text style={styles.optionLabel}>Like all songs</Text>
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
            <Image source={require('../assets/images/radio.png')} style={styles.optionIcon} />
            <Text style={styles.optionLabel}>Go to radio</Text>
          </TouchableOpacity>
        </View>

        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Nền đen giống ảnh
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  albumInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  albumCover: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 8,
  },
  albumTitle: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
  },
  artistName: {
    fontSize: 16,
    color: '#B0B0B0',
    marginTop: 5,
  },
  optionList: {
    width: '100%',
    paddingHorizontal: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
  },
  optionIcon: {
    width: 25,
    height: 25,
    marginRight: 20,
  },
  optionLabel: {
    fontSize: 18,
    color: '#FFF',
  },
  closeButton: {
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#1DB954',
    borderRadius: 50,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
