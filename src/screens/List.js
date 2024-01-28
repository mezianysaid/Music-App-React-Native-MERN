import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {_ListCard, _songCard} from '../components/index';
import songs from '../model/Data';
import {Card} from 'react-native-paper';
const {height} = Dimensions.get('screen');
const List = () => {
  return (
    // <ScrollView>
    <SafeAreaView style={styles.container}>
      <View style={styles.head}></View>

      <Card style={styles.card}>
        {/* <ScrollView> */}
        <FlatList
          data={songs}
          renderItem={({item}) => <_songCard item={item} />}
          keyExtractor={item => item.id}
          key={item => item.id}
          horizontal={false}
        />
        {/* </ScrollView> */}
      </Card>
    </SafeAreaView>
    // </ScrollView>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c2026',
    minHeight: height,
    marginBottom: 40,
  },
  head: {
    height: 15,
    backgroundColor: 'white',
    margin: 0,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  card: {
    margin: 8,
    backgroundColor: '#2b3038',
    elevation: 20,
    shadowColor: 'white',
    shadowOffset: {width: 10, height: 10},
  },
});
