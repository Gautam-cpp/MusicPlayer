import TrackPlayer, { RepeatMode } from "react-native-track-player";

import { Event } from 'react-native-track-player';

import { playListData } from "./src/constant";

export async function setupPlayer() {
   let isSetup =false;

    try {
        await TrackPlayer.getActiveTrackIndex();
        isSetup = true;
    }
    catch (error) {
        await TrackPlayer.setupPlayer();
        isSetup = true;
        console.log("Error setting up player: ", error);
    } 
    finally {
        return isSetup;
    }
}

export async function addTracks() {
    try {
        await TrackPlayer.add(playListData);
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
        console.log("Tracks added successfully");
    } catch (error) {
        console.log("Error adding tracks: ", error);
    }
}


export async function playbackService() {
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause();
    });

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play();
    });
    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        TrackPlayer.skipToPrevious();
    });

    

}