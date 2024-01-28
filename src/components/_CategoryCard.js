import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
import song from '../assets/dev3.jpeg';

const _CategoryCard = ({item}) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <TouchableOpacity>
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.subtitle}>Categ</Text>
          <Card.Cover source={item.image} />
        </TouchableOpacity>
      </Card>
    </View>
  );
};

export default _CategoryCard;

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
  },
  subtitle: {
    color: 'white',
  },
});
