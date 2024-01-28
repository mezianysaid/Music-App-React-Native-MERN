import {StyleSheet, View, Text, Pressable} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import TrackPlayer, {
  useProgress,
  usePlaybackState,
  State,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {Dimensions} from 'react-native';
import {useCallback, useState, useEffect} from 'react';

const _AudioPlayer = () => {
  const {position, duration} = useProgress(100);
  const {state: playbackState} = usePlaybackState();

  const [isPlaying, setIsPlaying] = useState(playbackState === State.Playing);
  const [activeTrackData, setActiveTrackData] = useState();
  const [isPlayButtonDisabled, setIsPlayButtonDisabled] = useState(true);

  // Util for time format
  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(1, '0');
    const seconds = (Math.trunc(timeInSeconds) % 60)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;
  };

  const play = useCallback(async () => {
    await TrackPlayer.play();
    setIsPlayButtonDisabled(false);
  }, []);

  const pause = useCallback(async () => {
    await TrackPlayer.pause();
  }, []);

  const trackTimeProgress = formatTime(position);
  const trackTimeLeft = formatTime(duration - position);

  useEffect(() => {
    if (playbackState === State.Playing && !isPlaying) {
      setIsPlaying(true);
    }

    if (
      playbackState === State.Paused ||
      (playbackState === State.Stopped && isPlaying)
    ) {
      setIsPlaying(false);
    }
  }, [isPlaying, playbackState]);

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    if (
      event.type === Event.PlaybackActiveTrackChanged &&
      event.index != null
    ) {
      const activeTrackItem = await TrackPlayer.getActiveTrack();

      if (!activeTrackItem) {
        return;
      }

      setIsPlayButtonDisabled(false);

      setActiveTrackData({
        title: activeTrackItem.title,
        // playlist: activeTrackItem.headers.playlist,
      });
    }
  });

  return (
    <View style={styles.container}>
      {activeTrackData && (
        <View style={styles.activeTrack}>
          <Text style={styles.activeTrackTitle}>
            {activeTrackData ? activeTrackData.title : 'Music X'}
          </Text>
          {/* <Text style={styles.activeTrackDescription}>
            {activeTrackData.playlist}
          </Text> */}
        </View>
      )}
      <Slider
        style={styles.progressBar}
        trackStyle={{
          height: 4,
          width: Dimensions.get('window').width - 60,
        }}
        thumbTouchSize={{width: 4, height: 4}}
        animationType="timing"
        trackClickable
        value={position}
        minimumValue={0}
        maximumValue={duration}
        thumbTintColor={'black'}
        minimumTrackTintColor={'#1c2026'}
        maximumTrackTintColor={'grey'}
        onSlidingComplete={async value => {
          TrackPlayer.seekTo(Number(value));
        }}
      />
      <Text style={[styles.text, styles.timer]}>
        {trackTimeProgress} / {trackTimeLeft}
      </Text>
      <View style={styles.buttons}>
        <Pressable
          disabled={isPlayButtonDisabled}
          style={[styles.button, isPlayButtonDisabled && styles.buttonDisabled]}
          onPress={isPlaying ? pause : play}>
          <Text style={styles.buttonText}>{isPlaying ? 'PAUSE' : 'PLAY'}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default _AudioPlayer;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    width: '80%',
    // backgroundColor: 'yellow',
    paddingVertical: 32,
  },
  activeTrack: {
    marginBottom: 32,
  },
  activeTrackTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: 'black',
  },
  activeTrackDescription: {fontSize: 20, fontWeight: '700', color: 'black'},
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 12,
    width: '80%',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 16,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: '700',
    textAlign: 'center',
    color: '#f53340',
    fontSize: 18,
  },
  buttonDisabled: {
    opacity: 0,
  },
  progressBar: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  timer: {
    fontSize: 18,
    marginTop: 8,
    marginBottom: 20,
    fontWeight: '700',
  },
  text: {
    color: '#FFF',
  },
});
