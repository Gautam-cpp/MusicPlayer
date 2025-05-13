import Slider from '@react-native-community/slider';
import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import TrackPlayer, { useProgress } from 'react-native-track-player'

export default function SongSlider() {
    const { position, duration } = useProgress(1000);
   
    // Format time as mm:ss
    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
      <View style={styles.container}>
        <Slider
            value={position}
            minimumValue={0}
            maximumValue={duration}
            minimumTrackTintColor="#1DB954" // Spotify green
            maximumTrackTintColor="#555555"
            thumbTintColor="#FFFFFF"
            style={styles.sliderContainer}
            onSlidingComplete={async (value) => {
                await TrackPlayer.seekTo(value);
            }}
        />
        <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(position)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
    },
    sliderContainer: {
        width: '100%',
        height: 40,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    timeText: {
        color: '#B3B3B3',
        fontSize: 12,
    }
})
