import React, { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    View, Text, StatusBar, StyleSheet, Keyboard,
    TouchableWithoutFeedback, FlatList, Image,
    LogBox, ActivityIndicator, ScrollView, TouchableOpacity, Alert
} from 'react-native';
import { List, Modal, DefaultTheme, TextInput } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import Firebase from '../database/firebase';
import { AuthContext } from '../navigation/AuthProvider';
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

const CreateRoutine = ({navigation}) => {
    const { user } = React.useContext(AuthContext)
    const [isLoading, setLoading] = React.useState(true);
    const [visible, setVisible] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [exercises, setExercises] = React.useState({
        chest: null, triceps: null, shoulder: null,
        legs: null, glutes: null, abs: null, back: null, biceps: null
    });
    const [title, setTitle] = React.useState(null);
    const [routine, setRoutine] = React.useState([]);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);

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

    const submitRoutine = async () => {
        await db.collection('routines')
            .add({
                title: title,
                routine: routine,
                userId: user.uid
            })
            .then(() => {
                setRoutine([]);
                setTitle(null);
                Alert.alert('Routine succesfully created!');
                navigation.navigate('Home');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            fetchExercises();
        }, [])
    );

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const addExercise = (item) => {
        let check = routine.find(each => each.title === item.title);
        if (!check) {
            setRoutine([...routine, item]);
        }
        else { null; }
    }

    const renderItem = ({ item }) => {
        return (
            <>
                <View style={{ borderLeftWidth: 2, borderRightWidth: 2, borderBottomWidth: 1, borderTopWidth: 1, borderRadius: 3, borderColor: '#6e45e6' }}>
                    <List.Item title={item.title}
                        left={() => <Image style={styles.tinyLogo} source={{ uri: item.image }} />} onPress={() => { showModal(); setSelectedItem(item) }}
                        right={() =>
                            <Entypo.Button name='add-to-list' iconStyle={{ marginLeft: 10, marginTop: 8 }} color='white' backgroundColor='#3700b3' size={25} borderRadius={6}
                                onPress={() => addExercise(item)}
                                style={{ padding: 3 }} />
                        } />
                </View>
            </>
        )
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <StatusBar backgroundColor='transparent' barStyle='dark-content' />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TextInput placeholder='Add a Title' mode='outlined' style={{ marginBottom: 10, flex: 1, marginLeft: 10, marginRight: 5 }} onChangeText={(val) => setTitle(val)} />
                    {title == null || title == '' || routine.length == 0 ?
                        null
                        :
                        <TouchableOpacity onPress={() => submitRoutine()}>
                            <View style={{ backgroundColor: '#3700b3', marginHorizontal: 5, padding: 20, borderRadius: 10, marginTop: 5 }}>
                                <Text style={{ color: 'white' }}>Create Routine</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
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
        </TouchableWithoutFeedback>
    )
};

export default CreateRoutine;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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