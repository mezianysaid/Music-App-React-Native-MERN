import React, {useEffect} from 'react';
import TrackPlayer, {
  Capability,
  Event,
  usePlaybackState,
  RepeatMode,
  State,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const playerHook = () => {
  const setUpPlayerBack = async dataList => {
    try {
      let isPlayerInitialized = false;
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
      });
      await TrackPlayer.add(dataList);
      await TrackPlayer.play();
      isPlayerInitialized = true;
    } catch (error) {
      console.error(error);
    }
  };
  const togglePlayback = async (playBackState, dataList) => {
    try {
      let currentTrack = await TrackPlayer.getCurrentTrack();
      if (currentTrack == null) {
        await TrackPlayer.reset();
        await TrackPlayer.add(dataList); //this was never adding and die silently
        await TrackPlayer.play();
      } else {
        if (playBackState.state === State.Paused) {
          await TrackPlayer.play();
        } else {
          await TrackPlayer.pause();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // setUpPlayerBack();
  }, []);

  return {setUpPlayerBack, togglePlayback};
};

export default playerHook;
