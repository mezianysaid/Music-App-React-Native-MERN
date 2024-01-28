import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {_Categories} from '../components/index';
const {height, width} = Dimensions.get('screen');
const Home = () => {
  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <_Categories />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c2026',
    minHeight: height,
  },
  title: {
    color: '#fafa11',
  },
});
