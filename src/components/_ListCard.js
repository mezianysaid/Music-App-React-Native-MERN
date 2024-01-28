import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {Card, Button, Menu} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import songs from '../model/Data';
import songalt from '../assets/img1.jpg';
const _ListCard = ({item}) => {
  const [clicked, setClicked] = useState(false);
  const [play, setPlay] = useState(false);
  const handlePlay = e => {
    e.preventDefault();
    setClicked(!clicked);
  };

  const [showMenu, setShowMenu] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState({x: 0, y: 0});
  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

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

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.cardWrapper}>
          <TouchableOpacity style={styles.playBtn}>
            <Image
              source={item.artwork ? item.artwork : songalt}
              style={styles.imageSong}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.playBtn}
            onPressIn={() => navigation.navigate('SongDetails', {item})}>
            {clicked == false ? (
              <MaterialIcons
                name="play-circle-outline"
                size={40}
                color={clicked == true ? '#fafa11' : 'white'}
              />
            ) : (
              <MaterialIcons
                name="pause-circle-outline"
                size={40}
                color={clicked == true ? '#fafa11' : 'white'}
              />
            )}
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{width: '70%'}}
            onPress={() => navigation.navigate('SongDetails', {item})}>
            <Text style={styles.name} numberOfLines={1}>
              {item.title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons
              name="more-vert"
              size={35}
              color="white"
              onPress={onIconPress}
              //   onCick={onIconPress}
            />
          </TouchableOpacity>
        </View>
      </Card>

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
    </View>
  );
};

export default _ListCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 2,
    paddingHorizontal: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#383e47',
    borderRadius: 10,
    // borderTopRightRadius: 20,
    // borderBottomLeftRadius: 20,
    // borderTopLeftRadius: 0,
    // borderBottomRightRadius: 0,
  },
  title: {
    color: '#07d9c4',
  },
  cardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
  },
  name: {
    color: 'white',
    // width: '60%',
    alignSelf: 'center',
    // flex: 1,
    fontWeight: '600',
  },
  playBtn: {
    paddingLeft: 10,
  },
  items: {
    flexDirection: 'row',
  },
  imageSong: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
});
