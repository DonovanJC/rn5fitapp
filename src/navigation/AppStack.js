import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {DrawerContent} from '../screensFlow/DrawerContent';

import MainTabScreen from '../screensFlow/MainTabScreen';
import SupportScreen from '../screens/SupportScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BookmarkScreen from '../screens/BookmarkScreen';

const Drawer = createDrawerNavigator();

const AppStack = ({ navigation }) => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name='HomeDrawer' component={MainTabScreen} />
            <Drawer.Screen name='Support' component={SupportScreen} />
            <Drawer.Screen name='Settings' component={SettingsScreen} />
            <Drawer.Screen name='Bookmark' component={BookmarkScreen} />
        </Drawer.Navigator>
    )
}

export default AppStack;