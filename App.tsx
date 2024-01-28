/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomNavigation} from './src/components/index';
import {
  SongDetails,
  PlayLists,
  Albums,
  Downloads,
  ListSongOfPlayLists,
} from './src/screens/index';

const StackNavigation = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <StackNavigation.Navigator>
            <StackNavigation.Screen
              name="Bottom Navigation"
              component={BottomNavigation}
              options={{headerShown: false}}
            />
            <StackNavigation.Screen
              name="SongDetails"
              component={SongDetails}
              options={{headerShown: false}}
            />
            <StackNavigation.Screen
              name="Playlists"
              component={PlayLists}
              options={{headerShown: false}}
            />
            <StackNavigation.Screen
              name="Albums"
              component={Albums}
              options={{headerShown: false}}
            />
            <StackNavigation.Screen
              name="Downloads"
              component={Downloads}
              options={{headerShown: false}}
            />
            <StackNavigation.Screen
              name="Listsongplaylist"
              component={ListSongOfPlayLists}
              options={{headerShown: false}}
            />
          </StackNavigation.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}

export default App;
