import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Card, Button} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import {useNavigation} from '@react-navigation/native';
import logo from '../assets/category/logo.png';

const {height, width} = Dimensions.get('screen');
const myColor = 'white';

const Profile = () => {
  const navigation = useNavigation();
  const navigateTo = path => {
    navigation.navigate(`${path}`);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}></Text>
        <View style={styles.logoWrapper}>
          <Image source={logo} style={styles.userLogo} />
        </View>
        <View style={styles.wrapper}>
          <Card style={styles.card}>
            <TouchableOpacity
              style={styles.cardWrapper}
              onPress={() => navigateTo('List')}>
              <View style={styles.cardHead}>
                <MaterialCommunityIcons
                  name="music"
                  size={40}
                  color={myColor}
                />

                <Text style={styles.name} numberOfLines={1}>
                  All Songs
                </Text>
              </View>
              <TouchableOpacity style={styles.Icon}>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={40}
                  color={myColor}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </Card>

          <Card style={styles.card}>
            <TouchableOpacity
              style={styles.cardWrapper}
              onPress={() => navigateTo('Playlists')}>
              <View style={styles.cardHead}>
                <MaterialIcons name="list" size={40} color={myColor} />

                <Text style={styles.name} numberOfLines={1}>
                  Playlists
                </Text>
              </View>
              <TouchableOpacity style={styles.Icon}>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={40}
                  color={myColor}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </Card>

          <Card style={styles.card}>
            <TouchableOpacity
              style={styles.cardWrapper}
              onPress={() => navigateTo('Albums')}>
              <View style={styles.cardHead}>
                <MaterialIcons name="album" size={40} color={myColor} />

                <Text style={styles.name} numberOfLines={1}>
                  Albums
                </Text>
              </View>
              <TouchableOpacity style={styles.Icon}>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={40}
                  color={myColor}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </Card>

          <Card style={styles.card}>
            <TouchableOpacity
              style={styles.cardWrapper}
              onPress={() => navigateTo('Favorites')}>
              <View style={styles.cardHead}>
                <MaterialIcons name="favorite" size={40} color={myColor} />

                <Text style={styles.name} numberOfLines={1}>
                  Favorites
                </Text>
              </View>
              <TouchableOpacity style={styles.Icon}>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={40}
                  color={myColor}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </Card>

          <Card style={styles.card}>
            <TouchableOpacity
              style={styles.cardWrapper}
              onPress={() => navigateTo('Downloads')}>
              <View style={styles.cardHead}>
                <MaterialIcons
                  name="download-for-offline"
                  size={40}
                  color={myColor}
                />

                <Text style={styles.name} numberOfLines={1}>
                  Downloads
                </Text>
              </View>
              <TouchableOpacity style={styles.Icon}>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={40}
                  color={myColor}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </Card>

          <Card style={styles.card}>
            <TouchableOpacity style={styles.cardWrapper}>
              <View style={styles.cardHead}>
                <MaterialCommunityIcons
                  name="progress-clock"
                  size={40}
                  color={myColor}
                />

                <Text style={styles.name} numberOfLines={1}>
                  Recently played
                </Text>
              </View>
              <TouchableOpacity style={styles.Icon}>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={40}
                  color={myColor}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c2026',
    minHeight: height,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: myColor,
  },
  card: {
    borderWidth: 1,
    // borderColor: myColor,
    backgroundColor: '#464f5c',
    borderRadius: 50,
    paddingHorizontal: 7,
    marginTop: 10,
    elevation: 20,
    shadowColor: 'white',
    shadowOffset: {width: 10, height: 10},
  },
  cardHead: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
  },
  wrapper: {
    margin: 10,
  },
  userLogo: {
    width: 100,
    height: 100,
    backgroundColor: myColor,
    borderRadius: 50,
    // flex: 1,
    alignSelf: 'center',
  },
  logoWrapper: {
    backgroundColor: '#1c2026',
    height: 100,
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '900',
    color: myColor,
    marginLeft: 13,
    // justifyContent: 'flex-start',
  },
  Icon: {
    // marginLeft: 10,
  },
});
