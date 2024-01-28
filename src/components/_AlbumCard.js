import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
const _AlbumCard = ({item}) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <TouchableOpacity>
          <View style={{height: 70}}>
            <Text style={styles.title} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.subtitle}>{item.artist}</Text>
          </View>
          <Card.Cover source={item.image} style={styles.image} />
        </TouchableOpacity>
      </Card>
    </View>
  );
};

export default _AlbumCard;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: '800',
    marginLeft: 3,
  },
  card: {
    backgroundColor: '#1c2026',
    borderWidth: 1,
    borderColor: 'white',
    height: 240,
  },
  subtitle: {
    color: 'white',
    margin: 3,
  },
  image: {
    height: 168,
  },
});
