import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import React from 'react';
import {_ListCard, _songCard} from '../components/index';
import songs from '../model/Data';
import {Card} from 'react-native-paper';
const data = [1, 2, 3, 4, 5, 6];
const {height} = Dimensions.get('screen');
const Favorites = () => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.title}>Favorites</Text>
        </View>
        <Card style={styles.card}>
          <FlatList
            data={songs}
            renderItem={({item}) => <_songCard item={item} />}
            keyExtractor={item => item.id}
            key={item => item.id}
            alwaysBounceVertical={true}
          />
        </Card>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c2026',
    minHeight: height,
    marginBottom: 40,
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
  card: {
    margin: 8,
    backgroundColor: '#2b3038',
    elevation: 20,
    shadowColor: 'white',
    shadowOffset: {width: 10, height: 10},
  },
});
