import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
  AppState,
  FlatList,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Card} from 'react-native-paper';
import song from '../assets/category/music.png';
import FontAwesome6 from 'react-native-vector-icons/dist/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
// import Slider from '@react-native-community/slider';
import {Slider} from '@miblanchard/react-native-slider';
import {useRoute} from '@react-navigation/native';
import songs from '../model/Data';
// import playerHook from '../hooks/playerHook';
import TrackPlayer, {
  Event,
  usePlaybackState,
  RepeatMode,
  State,
  useProgress,
  useTrackPlayerEvents,
  Capability,
  AppKilledPlaybackBehavior,
} from 'react-native-track-player';
const {height, width} = Dimensions.get('screen');
// *********************************************************************

// *********************************************************************
const SongDetails = () => {
  const playBackState = usePlaybackState();
  const route = useRoute();
  const {item} = route.params;
  const [songIndex, setSongIndex] = useState(0);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const progress = useProgress();
  const [trackTitle, setTrackTitle] = useState();
  const [artWork, setArtWork] = useState(song);
  const [repeatMode, setRepeatMode] = useState('off');
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef(null); // flatlist reference
  const navigation = useNavigation();
  // *********************************************************
  // console.log('item', item);
  //  **************************************************************
  const onTrackPress = async id => {
    const currentTrackIndex = songs.findIndex(elem => elem.id === id);
    const trackPlayerQueue = await TrackPlayer.getQueue();
    const sameTrackFromQueue = trackPlayerQueue[currentTrackIndex];
    const currentTrack = songs[currentTrackIndex];
    setArtWork(currentTrack.artwork);
    if (currentTrack.id !== sameTrackFromQueue?.id) {
      const newQueue = songs.map(elem => ({
        id: elem.id,
        url: elem.url,
        title: elem.title,
        artwork: elem.artwork,
      }));

      await TrackPlayer.reset();
      await TrackPlayer.add(newQueue[currentTrackIndex]);
      await TrackPlayer.add(newQueue);
      await TrackPlayer.skip(currentTrackIndex + 1);
      await TrackPlayer.play();
      await TrackPlayer.remove(0);
    } else {
      await TrackPlayer.skip(currentTrackIndex);
      await TrackPlayer.play();
    }
  };
  //  **************************************************************
  //  **************************************************************
  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    if (event.index === undefined) {
      setActiveTrackIndex(0);
      return;
    }

    if (
      event.type === Event.PlaybackActiveTrackChanged &&
      event.index != null
    ) {
      const activeTrackItem = await TrackPlayer.getActiveTrack();

      if (!activeTrackItem) {
        return;
      }

      setActiveTrackIndex(activeTrackItem.id);
    }
  });
  //  **************************************************************

  useTrackPlayerEvents([Event.PlaybackQueueEnded], async () => {
    const repeatMode = await TrackPlayer.getRepeatMode();
    TrackPlayer.seekTo(0);

    if (repeatMode === 0) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  });

  // **********************************************************************
  const skipTo = async trackId => {
    await TrackPlayer.skip(trackId);
  };
  //  **************************************************************

  const repeatIcon = () => {
    if (repeatMode == 'off') {
      return 'repeat-off';
    }
    if (repeatMode == 'track') {
      return 'repeat-once';
    }
    if (repeatMode == 'repeat') {
      return 'repeat';
    }
  };
  //  **************************************************************

  const ChangeRepeatMode = () => {
    if (repeatMode == 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    }
    if (repeatMode == 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);

      setRepeatMode('repeat');
    }
    if (repeatMode == 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);

      setRepeatMode('off');
    }
  };
  //  **************************************************************

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
    scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      skipTo(index);
      setSongIndex(index);
    });
  }, [isPlaying, playbackState]);

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
    if (
      event.type === Event.PlaybackActiveTrackChanged &&
      event.index != null
    ) {
      const activeTrackItem = await TrackPlayer.getActiveTrack();
      console.log(activeTrackItem.artwork);
      setTrackTitle(activeTrackItem.title);
      setArtWork(activeTrackItem.artwork);
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

  const skipToNext = async () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
    const trackPlayerQueue = await TrackPlayer.getQueue();
    const newTrack = trackPlayerQueue[songIndex + 1];
    onTrackPress(newTrack.id);
  };
  const skipToPrevius = async () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
    const trackPlayerQueue = await TrackPlayer.getQueue();
    const newTrack = trackPlayerQueue[songIndex - 1];
    onTrackPress(newTrack.id);
  };
  const renderSongs = ({item, index}) => {
    return (
      <Animated.View style={styles.SongimageWrapper}>
        <Card style={styles.card}>
          <Card.Cover
            style={[styles.card, styles.elevation]}
            source={artWork ? artWork : song}
            resizeMode="contain"
          />
        </Card>
      </Animated.View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.songWrapper}>
        <Animated.FlatList
          ref={songSlider}
          data={songs}
          renderItem={renderSongs}
          keyExtractor={item => item.id}
          key={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: scrollX},
                },
              },
            ],
            {useNativeDriver: true},
          )}
        />
      </View>

      <View style={styles.contenent}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title} numberOfLines={1}>
            {trackTitle ? trackTitle : ''}
          </Text>
        </View>
        <View style={styles.slider}>
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
          <View style={styles.progessLevelDuration}>
            <Text style={styles.progessLabelText}>{trackTimeProgress}</Text>
            <Text style={styles.progessLabelText}>{trackTimeLeft}</Text>
          </View>
        </View>
        <View style={styles.controllerWrapper}>
          <TouchableOpacity style={styles.Ta} onPress={() => skipToPrevius()}>
            <FontAwesome6 name="backward" size={30} color="#1c2026" />
          </TouchableOpacity>
          <TouchableOpacity onPress={isPlaying ? pause : play}>
            <MaterialIcons
              name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
              size={60}
              color="#1c2026"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.Ta} onPress={() => skipToNext()}>
            <FontAwesome6 name="forward" size={30} color="#1c2026" />
          </TouchableOpacity>
        </View>
        <View style={styles.optionWrapper}>
          <TouchableOpacity
            style={styles.Tab}
            onPress={() => {
              navigation.navigate('List');
            }}>
            <MaterialIcons name="view-list" size={30} color="#1c2026" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.Tab} onPress={ChangeRepeatMode}>
            <MaterialCommunityIcons
              name={`${repeatIcon()}`}
              size={30}
              color={repeatMode != 'off' ? '#1c2026' : 'gray'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Tab}
            onPress={() => {
              navigation.navigate('Favorites');
            }}>
            <MaterialIcons name="favorite" size={30} color="#1c2026" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Tab}
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <MaterialIcons name="home" size={30} color="#1c2026" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SongDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c2026',
    minHeight: height,
  },
  songWrapper: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: width - 80,
    height: height / 2 - 80,
    borderRadius: 40,
  },
  optionWrapper: {
    marginTop: 5,
    marginHorizontal: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Tab: {
    borderWidth: 1,
    borderColor: 'black',
    height: 40,
    borderRadius: 10,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    marginTop: 15,
    marginHorizontal: 20,
  },
  titleWrapper: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
  controllerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
  },
  contenent: {
    backgroundColor: 'white',
    height: height / 2,
    borderTopRightRadius: 100,
    marginTop: 10,
    marginRight: 15,
    elevation: 20,
    shadowColor: 'white',
    shadowOffset: {width: 10, height: 10},
    borderWidth: 1,
    borderColor: 'aqua',
  },
  elevation: {
    elevation: 20,
    shadowColor: 'white',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  progressBar: {},
  progessLevelDuration: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progessLabelText: {
    fontWeight: '500',
    color: 'black',
  },
  SongimageWrapper: {
    width: width,
    height: height / 2 - 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});
