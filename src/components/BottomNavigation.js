import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, List, Favorites, Profile} from '../screens/index';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/dist/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const ScreenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 8,
    height: 50,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
};
const BottomNavigation = () => {
  return (
    <>
      <Tab.Navigator screenOptions={ScreenOptions}>
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <MaterialCommunityIcons
                  name="home-circle-outline"
                  size={40}
                  color={focused ? 'black' : 'grey'}
                />
              );
            },
          }}
        />

        <Tab.Screen
          name="List"
          component={List}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <MaterialIcons
                  name="view-list"
                  size={30}
                  color={focused ? 'black' : 'grey'}
                />
              );
            },
          }}
        />

        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <MaterialIcons
                  name="favorite-border"
                  size={30}
                  color={focused ? 'black' : 'grey'}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <FontAwesome6
                  name="building-user"
                  size={30}
                  color={focused ? 'black' : 'gray'}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
