import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
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
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
const {height, width} = Dimensions.get('screen');
const _AudioPlayerModel = ({item}) => {
  const {position, duration} = useProgress(100);
  const {state: playbackState} = usePlaybackState();

  const [isPlaying, setIsPlaying] = useState(playbackState === State.Playing);
  // const [activeTrackData, setActiveTrackData] = useState();
  // const [isPlayButtonDisabled, setIsPlayButtonDisabled] = useState(true);

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
      console.log(activeTrackItem);
      if (!activeTrackItem) {
        return;
      }

      setActiveTrackData({
        title: activeTrackItem.title,
        // playlist: activeTrackItem.headers.playlist,
      });
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.wrapperContent}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title ? item.title : 'Music X'}
        </Text>
        <Text style={styles.timer} numberOfLines={1}>
          {trackTimeProgress}/ {trackTimeLeft}
        </Text>
      </View>

      <TouchableOpacity>
        <MaterialIcons
          name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
          color={isPlaying ? 'red' : '#1c2026'}
          size={45}
          onPress={isPlaying ? pause : play}
        />
      </TouchableOpacity>
    </View>
  );
};

export default _AudioPlayerModel;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  progressBar: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  timer: {
    fontSize: 18,
    fontWeight: '700',
  },

  title: {
    color: '#1c2026',
    fontSize: 16,
    fontWeight: '500',
    maxWidth: width - 200,
  },
  wrapperContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 100,
  },
});
