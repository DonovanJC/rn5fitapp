import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { List, Modal } from 'react-native-paper';
import {
    View, Text, ActivityIndicator, ScrollView,
    StyleSheet, FlatList, TouchableOpacity, Image
} from 'react-native';
import Firebase from '../database/firebase';

const db = Firebase.firestore();

const ExercisesList = () => {
    const [exercises, setExercises] = React.useState(null);
    const [isLoading, setLoading] = React.useState(true);
    const [visible, setVisible] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);


    const fetchExercises = async () => {
        try {
            const list = [];

            await Firebase.firestore().
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
                    setExercises(list);
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
                <List.Item title={item.title} style={{marginLeft:0}} left={props => <Image style={styles.tinyLogo} source={{uri:exercises[2].image}} />} onPress={() => { showModal(); setSelectedItem(item) }} />
            </>
        )
    };


    return (
        <View style={styles.container}>
            {isLoading ?
                <ActivityIndicator size='large' color="#0000ff" />
                :
                <View>
                    {/* {console.log(exercises)} */}
                    <Text>Toma esta</Text>
                    <List.Accordion
                        title="Uncontrolled Accordion"
                        left={props => <List.Icon {...props} icon="equal" />}>
                        <FlatList data={exercises} renderItem={renderItem} keyExtractor={(item, index) => { return item.id }} contentContainerStyle={{ paddingBottom: 180 }} />
                    </List.Accordion>
                    {selectedItem ? <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                        <Text>{selectedItem.description}</Text>
                    </Modal> : null}
                </View>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20
    },
    tinyLogo: {
        width: 30,
        height: 30,
      }
})

export default ExercisesList;