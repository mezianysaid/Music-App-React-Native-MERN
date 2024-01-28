import { StyleSheet, Text, View ,FlatList} from 'react-native'
import React from 'react'
const data=[1,2,3,4]
import {_CategoryCard,categories} from './index'

const _Categories = () => {
  return (
    <View style={styles.container}>      
    <FlatList
        data={categories}
        renderItem={({item}) => <_CategoryCard item={item}/>}
        keyExtractor={item => item.name}    
        numColumns={2}
        contentContainerStyle={{columnGap:10}}
        key={item => item.name}
      />
    </View>
  )
}

export default _Categories

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        marginHorizontal:5
    }
})