import React, { useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, ActivityIndicator, StatusBar } from 'react-native'

import { setupPlayer, addTracks } from '../musicPlayerServices'
import MusicPlayer from './screens/MusicPlayer';

export default function App() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  async function setup() {
    const isReady = await setupPlayer();
    setIsPlayerReady(isReady);

    if (isReady) {
      await addTracks();
    }
  } 

  useEffect(() => {
    setup();
  }, [])

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#121212" />
        <ActivityIndicator size="large" color="#1DB954" />
      </SafeAreaView>
    )
  }
 
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <MusicPlayer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  }
})
