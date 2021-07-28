import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#aa80ff'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <HomeStack.Screen name='Home' component={HomeScreen} options={{
      headerLeft: () => (
        <Ionicons.Button name='ios-menu' size={35}
          backgroundColor='#aa80ff' onPress={() => { navigation.openDrawer() }}
        />
      )
    }} />
  </HomeStack.Navigator>
);

const DetailsStackScreen = ({ navigation }) => (
  <DetailsStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#aa80ff'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <DetailsStack.Screen name='Details' component={DetailsScreen} options={{
      headerLeft: () => (
        <Ionicons.Button name='ios-menu' size={35}
          backgroundColor='#aa80ff' onPress={() => { navigation.openDrawer() }}
        />
      )
    }} />
  </DetailsStack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name='Home' component={HomeStackScreen} />
        <Drawer.Screen name='Details' component={DetailsStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;