import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/AntDesign';

function ControlCenter() {
  const playback = usePlaybackState(); 

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const togglePlayBack = async (playbackState: State) => {
    const currentTrack = await TrackPlayer.getActiveTrackIndex();
    if (currentTrack !== null) {
      if (playbackState === State.Paused || playbackState === State.Ready) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const currentState = playback?.state;

  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious} style={styles.controlButton}>
        <Icon name="stepbackward" size={40} color="#fff" />
      </Pressable>

      <Pressable
        onPress={() => {
          if (currentState !== undefined) {
            togglePlayBack(currentState);
          }
        }}
        style={styles.playButton}
      >
        <Icon
          name={currentState === State.Playing ? 'pause' : 'play'}
          size={75}
          color="#1DB954" 
        />
      </Pressable>

      <Pressable onPress={skipToNext} style={styles.controlButton}>
        <Icon name="stepforward" size={40} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#121212',
    width: '100%',
  },
  controlButton: {
    padding: 15,
  },
  playButton: {
    padding: 10,
    marginHorizontal: 20,
  }
});

export default ControlCenter;
