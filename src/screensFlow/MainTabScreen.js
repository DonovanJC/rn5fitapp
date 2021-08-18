import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import ExploreScreen from '../screens/ExploreScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AddPlaceScreen from '../screens/AddPlaceScreen';
import ExercisesList from '../screens/ExercisesListScreen';
import CreateRoutine from '../screens/CreateRoutineScreen';
import RoutinesScreen from '../screens/RoutinesScreen';

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
        initialRouteName="Feed"
        activeColor='white'
        barStyle={{ backgroundColor: '#6e45e6' }}
        shifting={true}
    >
        <Tab.Screen
            name="Homeee"
            component={HomeStackScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Exploreee"
            component={ExploreStackScreen}
            options={{
                tabBarLabel: 'Explore',
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="park" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Profileee"
            component={ProfileStackScreen}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />
                ),
            }}
        />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: 'white',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name='Home' component={HomeScreen} options={{
            headerTintColor: '#6e45e6',
            headerTransparent:true,
            headerLeft: () => (
                <Ionicons.Button name='ios-menu' size={45} color='#6e45e6'
                    backgroundColor='transparent' underlayColor='transparent' onPress={() => { navigation.openDrawer() }}
                />
            )
        }} />
        <HomeStack.Screen name='Exercises List' component={ExercisesList} options={{ title: '', headerTintColor: '#6e45e6' }} />
        <HomeStack.Screen name='Create Routine' component={CreateRoutine} options={{ title: '', headerTintColor: '#6e45e6' }} />
        <HomeStack.Screen name='My Routines' component={RoutinesScreen} options={{ title: '', headerTintColor: '#6e45e6' }} />
    </HomeStack.Navigator>
);

const ExploreStackScreen = ({ navigation }) => (
    <ExploreStack.Navigator screenOptions={{
        // headerStyle: {
        //     backgroundColor: '#6e45e6'
        // },
        headerTransparent: true,
        headerTintColor: '#6e45e6',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <ExploreStack.Screen name='Explore' component={ExploreScreen} options={{
            headerLeft: () => (
                <Ionicons.Button name='ios-menu' size={45} color='#6e45e6' backgroundColor='transparent' underlayColor='transparent'
                    onPress={() => { navigation.openDrawer() }}
                />
            )
        }} />
        <ExploreStack.Screen name="Add Place" component={AddPlaceScreen} options={{ title: '', headerTransparent:true }} />
    </ExploreStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => (
    <ProfileStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#6e45e6'
        },
        headerTransparent:true,
        headerTintColor:'#6e45e6',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <ProfileStack.Screen name='Profile' component={ProfileScreen} options={{
            headerLeft: () => (
                <Ionicons.Button name='ios-menu' size={45}
                    backgroundColor='transparent' underlayColor='transparent' color='#6e45e6'  onPress={() => { navigation.openDrawer() }}
                />
            )
        }} />
    </ProfileStack.Navigator>
);


