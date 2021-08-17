import React, { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { List, Modal, DefaultTheme } from 'react-native-paper';
import {
    View, Text, ActivityIndicator, ScrollView,
    StyleSheet, FlatList, TouchableOpacity, Image, LogBox, StatusBar
} from 'react-native';

import Firebase from '../database/firebase';
const db = Firebase.firestore();
const theme = {
    ...DefaultTheme,
    roundness: 8,
    colors: {
        ...DefaultTheme.colors,
        primary: 'white',
        accent: 'black',
        background: '#6e45e6',
        text: 'white'
    },
};
const theme2 = {
    ...DefaultTheme,
    roundness: 8,
    colors: {
        ...DefaultTheme.colors,
        primary: '#6e45e6',
        accent: '#6e45e6',
        background: 'white',
        text: '#6e45e6'
    },
};

const ExercisesList = () => {
    const [isLoading, setLoading] = React.useState(true);
    const [visible, setVisible] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [exercises, setExercises] = React.useState({
        chest: null, triceps: null, shoulder: null,
        legs: null, glutes: null, abs: null, back: null, biceps: null
    });

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])


    const fetchExercises = async () => {
        try {
            const list = [];

            await db.
                collection('exercises')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const { title, description, level,
                            muscles, image } = doc.data();
                        const id = doc.id;
                        list.push({
                            title,
                            description,
                            image,
                            level,
                            muscles,
                            id
                        })
                    })
                    let chest = [], triceps = [], biceps = [], shoulder = [], glutes = [], back = [], abs = [], legs = []
                    list.map(function (exercise) {
                        if (exercise.muscles.includes('Chest')) chest.push(exercise);
                        if (exercise.muscles.includes('Shoulder')) shoulder.push(exercise);
                        if (exercise.muscles.includes('Triceps')) triceps.push(exercise);
                        if (exercise.muscles.includes('Biceps')) biceps.push(exercise);
                        if (exercise.muscles.includes('Glutes')) glutes.push(exercise);
                        if (exercise.muscles.includes('Back')) back.push(exercise);
                        if (exercise.muscles.includes('Abs')) abs.push(exercise);
                        if (exercise.muscles.includes('Legs')) legs.push(exercise);
                    });
                    setExercises({ chest, shoulder, triceps, biceps, glutes, back, abs, legs });
                    setLoading(false);
                })
        } catch (e) {
            console.log(e);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            fetchExercises();
        }, [])
    );


    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const renderItem = ({ item }) => {
        return (
            <>
                <View style={{ borderLeftWidth: 2, borderRightWidth: 2, borderBottomWidth: 1, borderTopWidth: 1, borderRadius: 3, borderColor: '#6e45e6' }}>
                    <List.Item title={item.title} left={props => <Image style={styles.tinyLogo} source={{ uri: item.image }} />} onPress={() => { showModal(); setSelectedItem(item) }} />
                </View>
            </>
        )
    };


    return (
        <View style={styles.container}>
            {isLoading ?
                <View >
                    <StatusBar backgroundColor='transparent' barStyle='dark-content' />
                    <ActivityIndicator size='large' color="#0000ff" />
                </View>
                :
                <View>
                    {/* {console.log(exercises.chest)} */}
                    <ScrollView>
                        <List.AccordionGroup>
                            <List.Accordion
                                title="Chest"
                                left={props => <List.Icon {...props} icon="equal" />}
                                theme={theme} id='1'>
                                <FlatList data={exercises.chest} renderItem={renderItem} keyExtractor={(item, index) => { return item.id }} />
                            </List.Accordion>
                            <List.Accordion
                                title="Back"
                                left={props => <List.Icon {...props} icon="equal" />}
                                theme={theme2} id='2'>
                                <FlatList data={exercises.back} renderItem={renderItem} keyExtractor={(item, index) => { return item.id }} />
                            </List.Accordion>
                            <List.Accordion
                                title="Legs"
                                left={props => <List.Icon {...props} icon="equal" />}
                                theme={theme} id='3'>
                                <FlatList data={exercises.legs} renderItem={renderItem} keyExtractor={(item, index) => { return item.id }} />
                            </List.Accordion>
                            <List.Accordion
                                title="Shoulder"
                                left={props => <List.Icon {...props} icon="equal" />}
                                theme={theme2} id='4'>
                                <FlatList data={exercises.shoulder} renderItem={renderItem} keyExtractor={(item, index) => { return item.id }} />
                            </List.Accordion>
                            <List.Accordion
                                title="Abs"
                                left={props => <List.Icon {...props} icon="equal" />}
                                theme={theme} id='5'>
                                <FlatList data={exercises.abs} renderItem={renderItem} keyExtractor={(item, index) => { return item.id }} />
                            </List.Accordion>
                            <List.Accordion
                                title="Glutes"
                                left={props => <List.Icon {...props} icon="equal" />}
                                theme={theme2} id='6'>
                                <FlatList data={exercises.glutes} renderItem={renderItem} keyExtractor={(item, index) => { return item.id }} />
                            </List.Accordion>
                            <List.Accordion
                                title="Biceps"
                                left={props => <List.Icon {...props} icon="equal" />}
                                theme={theme} id='7'>
                                <FlatList data={exercises.biceps} renderItem={renderItem} keyExtractor={(item, index) => { return item.id }} />
                            </List.Accordion>
                            <List.Accordion
                                title="Triceps"
                                left={props => <List.Icon {...props} icon="equal" />}
                                theme={theme2} id='8'>
                                <FlatList data={exercises.triceps} renderItem={renderItem} keyExtractor={(item, index) => { return item.id }} />
                            </List.Accordion>
                        </List.AccordionGroup>
                    </ScrollView>
                    {selectedItem ?
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: selectedItem.image }} style={styles.bigLogo} />
                                <View style={styles.modalText}>
                                    <Text>{selectedItem.description}</Text>
                                </View>
                            </View>
                        </Modal>
                        : null}

                </View>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    modal: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 5

    },
    tinyLogo: {
        width: 50,
        height: 50,
        backgroundColor: 'white'
    },
    bigLogo: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        margin: 30,
    },
    modalText: {
        borderRadius: 5,
        padding: 20,
        backgroundColor: '#6e45e6'
    }
})

export default ExercisesList;