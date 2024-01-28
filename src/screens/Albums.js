import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
} from 'react-native';
import React from 'react';
import {_ListCard} from '../components/index';
import {_CategoryCard, albums, _AlbumCard} from '../components/index';
const data = [1, 2, 3, 4, 5, 6];
const {height} = Dimensions.get('screen');
const Albums = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>Albums</Text>
      </View>
      <FlatList
        data={albums}
        renderItem={({item}) => <_AlbumCard item={item} />}
        keyExtractor={item => item.name}
        // numColumns={2}
        contentContainerStyle={{columnGap: 10}}
        key={item => item.name}
      />
    </SafeAreaView>
  );
};

export default Albums;

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
});
