import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, Card, Modal, Portal, TextInput} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const {height} = Dimensions.get('screen');
const icon = () => {
  return <MaterialIcons name="playlist-add" size={26} color="#1c2026" />;
};

const PlayLists = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  };
  const [text, setText] = useState('');

  const onChangeText = text => setText(text);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>My Playlists</Text>
      </View>
      <View style={styles.playlist}>
        <View>
          <TouchableOpacity onPress={() => showModal()}>
            <Button
              mode="elevated"
              icon={icon}
              style={{
                marginHorizontal: 30,
              }}>
              <Text style={{color: '#1c2026', fontWeight: '800', fontSize: 16}}>
                Create new Playlist
              </Text>
            </Button>
          </TouchableOpacity>
        </View>

        <View style={styles.playlistWrapper}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Listsongplaylist')}>
            <Card style={styles.card}>
              <View style={styles.cardWrapper}>
                <View style={styles.imgView}>
                  <Image
                    source={require('../assets/category/music.png')}
                    style={styles.img}
                  />
                </View>
                <View style={styles.contenentWrapper}>
                  <Text style={styles.playContenent}>PlayList 01</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        </View>

        <View style={styles.playlistWrapper}>
          <TouchableOpacity>
            <Card style={styles.card}>
              <View style={styles.cardWrapper}>
                <View style={styles.imgView}>
                  <Image
                    source={require('../assets/category/music.png')}
                    style={styles.img}
                  />
                </View>
                <View style={styles.contenentWrapper}>
                  <Text style={styles.playContenent}>PlayList 01</Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <Text>Create new PlayList</Text>
            <TextInput
              label="Name :"
              placeholder="my playlist 1"
              value={text}
              onChangeText={onChangeText}
            />
            <Button
              mode="elevated"
              icon={icon}
              style={{marginTop: 10, width: 100, alignSelf: 'flex-end'}}>
              <Text>Add</Text>
            </Button>
          </Modal>
        </Portal>
      </View>
    </SafeAreaView>
  );
};

export default PlayLists;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c2026',
    minHeight: height,
  },
  head: {
    height: 40,
    backgroundColor: 'white',
    margin: 0,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#1c2026',
    alignSelf: 'center',
  },
  playlist: {
    marginVertical: 20,
  },
  playIcon: {
    marginTop: 10,
    paddingTop: 6,
  },
  playlistWrapper: {
    marginTop: 16,
    marginHorizontal: 10,
  },
  playContenent: {
    color: '#1c2026',
    fontSize: 20,
    fontWeight: '600',
  },
  contenentWrapper: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    // flex: 1,
    flexDirection: 'row',
  },
  imgView: {
    height: 100,
    width: '40%',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
