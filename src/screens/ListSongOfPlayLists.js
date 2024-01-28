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
const data = [1, 2, 3, 4, 5, 6, 7, 14];
const {height} = Dimensions.get('screen');
const ListSongOfPlayLists = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}></View>
      <FlatList
        data={data}
        renderItem={({item}) => <_ListCard item={item} />}
        keyExtractor={item => item}
        key={item => item}
      />
    </SafeAreaView>
  );
};

export default ListSongOfPlayLists;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c2026',
    minHeight: height,
  },
  head: {
    height: 15,
    backgroundColor: 'white',
    margin: 0,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
});
