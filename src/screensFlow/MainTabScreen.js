import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import ExploreScreen from '../screens/ExploreScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AddPlaceScreen from '../screens/AddPlaceScreen';
import ExercisesList from '../screens/ExercisesListScreen';
import CreateRoutine from '../screens/CreateRoutineScreen';

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
        initialRouteName="Feed"
        activeColor='white'
        barStyle={{ backgroundColor: '#aa80ff' }}
    >
        <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Explore"
            component={ExploreStackScreen}
            options={{
                tabBarLabel: 'Explore',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Profile"
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
        <HomeStack.Screen name='Exercises List' component={ExercisesList} options={{ title: '' }}/> 
        <HomeStack.Screen name='Create Routine' component={CreateRoutine} options={{ title: '' }}/>
    </HomeStack.Navigator>
);

const ExploreStackScreen = ({ navigation }) => (
    <ExploreStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#aa80ff'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <ExploreStack.Screen name='Explore' component={ExploreScreen} options={{
            headerLeft: () => (
                <Ionicons.Button name='ios-menu' size={35}
                    backgroundColor='#aa80ff' onPress={() => { navigation.openDrawer() }}
                />
            )
        }} />
        <ExploreStack.Screen name="Add Place" component={AddPlaceScreen} options={{ title: '' }} />
    </ExploreStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => (
    <ProfileStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#aa80ff'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }}>
        <ProfileStack.Screen name='Profile' component={ProfileScreen} options={{
            headerLeft: () => (
                <Ionicons.Button name='ios-menu' size={35}
                    backgroundColor='#aa80ff' onPress={() => { navigation.openDrawer() }}
                />
            )
        }} />
    </ProfileStack.Navigator>
);


