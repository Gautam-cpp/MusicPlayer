import React, { useState } from 'react';
import { Text, StyleSheet, View, Dimensions, Image, FlatList } from 'react-native';
import TrackPlayer, { Event, Track, useTrackPlayerEvents } from 'react-native-track-player';

import SongInfo from '../components/SongInfo';
import ControlCenter from '../components/ControlCenter';
import SongSlider from '../components/SongSlider';
import { playListData } from '../constant';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;

export default function MusicPlayer() {
  const [track, setTrack] = useState<Track | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
    if (event.type === Event.PlaybackActiveTrackChanged && event.index !== undefined) {
      const playingTrack = await TrackPlayer.getTrack(event.index);
      setTrack(playingTrack ?? null);
      setActiveIndex(event.index);
    }
  });

  const renderArtWork = ({ item, index }: { item: Track; index: number }) => {
   
    if (index !== activeIndex) {
      return null;
    }
    
    return (
      <View style={styles.artWorkContainer}>
        <View style={styles.albumContainer}>
          {item.artwork ? (
            <Image
              source={{ uri: item.artwork.toString() }}
              style={styles.albumArtImg}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.noArtText}>No Artwork</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.artworkWrapper}>
        {track?.artwork ? (
          <Image
            source={{ uri: track.artwork.toString() }}
            style={styles.albumArtImg}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.noArtText}>No Artwork</Text>
          </View>
        )}
      </View>
      
      <View style={styles.controlsContainer}>
        <SongInfo track={track} />
        <SongSlider />
        <ControlCenter />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 40,
    alignItems: 'center',
  },
  artworkWrapper: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#333',
    marginBottom: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  albumArtImg: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  noArtText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  controlsContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  artWorkContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: ITEM_WIDTH / 2,
    overflow: 'hidden',
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',  
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
});
