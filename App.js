import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabScreen from './src/screensFlow/MainTabScreen';
import { DrawerContent } from './src/screensFlow/DrawerContent';
import SupportScreen from './src/screens/SupportScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import BookmarkScreen from './src/screens/BookmarkScreen';
import SignStackScreen from './src/screensFlow/SignStackScreen';

const Drawer = createDrawerNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <SignStackScreen />
      {/* <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name='HomeDrawer' component={MainTabScreen} />
        <Drawer.Screen name='Support' component={SupportScreen} />
        <Drawer.Screen name='Settings' component={SettingsScreen} />
        <Drawer.Screen name='Bookmark' component={BookmarkScreen} />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
};

export default App;