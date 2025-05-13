import React, { PropsWithChildren } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Track } from 'react-native-track-player'

type SongInfoProps = PropsWithChildren<{
    track: Track | null | undefined
}>

function SongInfo({track}: SongInfoProps) {
  return (
   <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {track?.title || 'Unknown Title'}
        </Text>
        <Text style={styles.artist} numberOfLines={1} ellipsizeMode="tail">
          {track?.artist || 'Unknown Artist'}{track?.album ? ` • ${track.album}` : ''}
        </Text>
      </View>
   </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
        backgroundColor: '#121212',
    },
    infoContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 6,
        textAlign: 'center',
    },
    artist: {
        fontSize: 16,
        color: '#B3B3B3',
        textAlign: 'center',
    },
})

export default SongInfo
