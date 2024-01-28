import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Card, Button, Menu, Divider} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import songs from '../model/Data';
import songalt from '../assets/img1.jpg';
import _AudioPlayerModel from './_AudioPlayerModel';
import TrackPlayer, {
  useProgress,
  usePlaybackState,
  State,
  Event,
  useTrackPlayerEvents,
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';

const {height, width} = Dimensions.get('screen');
const _songCard = ({item}) => {
  const [clicked, setClicked] = useState(false);
  const [play, setPlay] = useState(false);
  const handlePlay = e => {
    e.preventDefault();
    setClicked(!clicked);
  };

  const [showMenu, setShowMenu] = useState(false);

  const [menuAnchor, setMenuAnchor] = useState({x: 0, y: 0});
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);
  const [showPlayMenu, setShowPlayMenu] = useState(false);
  const [menuPlayAnchor, setMenuPlayAnchor] = useState({
    x: 10,
    y: height - 185,
  });
  const openPlayMenu = () => {
    // setPlyColor('red');
    setShowPlayMenu(true);
    onTrackPress(item.id);
  };
  const closePlayMenu = () => setShowPlayMenu(false);
  const navigation = useNavigation();

  const onIconPress = event => {
    const {nativeEvent} = event;
    const anchor = {
      x: nativeEvent.pageX,
      y: nativeEvent.pageY,
    };

    setMenuAnchor(anchor);
    openMenu();
  };
  // getPermission = async () => {
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
  // ********************************************
  useTrackPlayerEvents([Event.PlaybackQueueEnded], async () => {
    const repeatMode = await TrackPlayer.getRepeatMode();
    TrackPlayer.seekTo(0);

    if (repeatMode === 0) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  });
  // ********************************************
  const onTrackPress = async id => {
    const currentTrackIndex = songs.findIndex(elem => elem.id === id);
    const trackPlayerQueue = await TrackPlayer.getQueue();
    const sameTrackFromQueue = trackPlayerQueue[currentTrackIndex];
    const currentTrack = songs[currentTrackIndex];

    if (currentTrack.id !== sameTrackFromQueue?.id) {
      const newQueue = songs.map(elem => ({
        id: elem.id,
        url: elem.url,
        title: elem.title,
        // headers: {
        //   playlist: item.playlistName,
        // },
        // playlistId: item.playlistId,
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
  const goSongDetails = () => {
    navigation.navigate('SongDetails', {item});
    onTrackPress(item.id);
  };
  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();

      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
          alwaysPauseOnInterruption: true,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
        progressUpdateEventInterval: 1,
      });
    };

    setupPlayer();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardWrapper}>
          <TouchableOpacity style={styles.playBtn}>
            <Image
              source={item.artwork ? item.artwork : songalt}
              style={styles.imageSong}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{width: '70%'}}
            onPress={() => goSongDetails()}>
            <Text style={styles.name} numberOfLines={1}>
              {item.title}
            </Text>
          </TouchableOpacity>
          <View style={styles.controllersWrapper}>
            <TouchableOpacity style={{marginRight: 3}}>
              <MaterialIcons
                name="play-circle-outline"
                size={35}
                color="white"
                onPress={openPlayMenu}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons
                name="more-vert"
                size={35}
                color="white"
                onPress={onIconPress}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Divider />
      <Menu visible={showMenu} onDismiss={closeMenu} anchor={menuAnchor}>
        <Menu.Item
          onPress={() => {}}
          leadingIcon="heart-plus-outline"
          title="Add to Favorites"
        />
        <Menu.Item
          onPress={() => {}}
          leadingIcon="view-list"
          title="Add to Playlist"
        />
        <Menu.Item
          onPress={() => {}}
          leadingIcon="chevron-right"
          title="Play next"
        />
        <Menu.Item onPress={() => {}} leadingIcon="share" title="Share" />
        <Menu.Item onPress={() => {}} leadingIcon="eye" title="View Album" />
        <Menu.Item
          onPress={() => {}}
          leadingIcon="account"
          title="View Artist"
        />
        <Menu.Item onPress={() => {}} leadingIcon="delete" title="Delete" />
      </Menu>
      {/* ;;;;;;;;;;;;;;;;;;; */}
      <Menu
        style={styles.menu}
        visible={showPlayMenu}
        onDismiss={closePlayMenu}
        anchor={menuPlayAnchor}>
        <_AudioPlayerModel item={item} />
      </Menu>
    </View>
  );
};

export default _songCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    paddingLeft: 5,
    paddingRight: 15,
  },

  title: {
    color: '#07d9c4',
    alignSelf: 'flex-start',
  },
  cardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
  },
  name: {
    color: 'white',
    alignSelf: 'flex-start',
    paddingLeft: 10,
    fontWeight: '600',
  },
  playBtn: {
    paddingLeft: 2,
  },
  items: {
    flexDirection: 'row',
  },
  imageSong: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  controllersWrapper: {
    flexDirection: 'row',
  },
  modelContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  menu: {
    width: width - 20,
  },
});
