import React from "react";
import { View, Text, StatusBar, Dimensions, InteractionManager, Button, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../navigation/AuthProvider";
import { LineChart } from "react-native-chart-kit";
import { useFocusEffect } from "@react-navigation/native";
import Moment from "moment";
import Firebase from "../database/firebase";
import { Ionicons } from "@expo/vector-icons";

const db = Firebase.firestore();

const ProgressScreen = ({ navigation }) => {
    const { userInfo } = React.useContext(AuthContext);
    const { fetchUserInfo } = React.useContext(AuthContext);
    const { user } = React.useContext(AuthContext);
    const [newWeight, setNewWeight] = React.useState(null);

    useFocusEffect(
        React.useCallback(() => {
            fetchUserInfo();
        }, [])
    );

    ///Gets User's weight Array from database and uses it to Plot a Progress Graph
    const setGraphData = () => {
        let labels = []
        let data = []
        userInfo.weight.map((item) => {
            labels.push(item.postTime);
            data.push(Math.floor(item.weight));
        });

        return {
            labels: [labels],
            datasets: [
                {
                    data: data,
                    strokeWidth: 2,
                }
            ]
        }
    }

    ///Adds current weight to the weight Array in the database, along with the date the weight has been added

    const addWeigth = async () => {
        let updatedWeight = userInfo.weight
        let date = new Date()
        date = Moment(date).format('d MMM')
        updatedWeight.push({ weight: newWeight, postTime: date });
        console.log(updatedWeight)

        try {
            await db.collection('usersInfo')
                .doc(user.uid)
                .set({
                    weight: updatedWeight
                }, { merge: true });
            navigation.goBack();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <StatusBar backgroundColor='transparent' barStyle='dark-content' />
            <Text style={styles.text}>Add Your Current Weight</Text>
            <TextInput style={styles.input} placeholder='Weight' keyboardType='numeric' onChangeText={(val) => setNewWeight(val)} />
            {newWeight!=null ?
                <TouchableOpacity onPress={() => addWeigth()}>
                    <View style={styles.button}>
                        <Text style={styles.text}>Add Weight</Text>
                        <Ionicons name='create-outline' size={60} color='white' />
                    </View>
                </TouchableOpacity>
                : null
            }

            <View>
                <LineChart
                    data={setGraphData()}
                    width={Dimensions.get('window').width} // from react-native
                    height={320}
                    yAxisLabel={'(kg)'}
                    chartConfig={{
                        backgroundColor: '#4284f5',
                        backgroundGradientFrom: '#4284f5',
                        backgroundGradientTo: '#6012e6',
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
        </View>
    );
};

export default ProgressScreen;

const styles = StyleSheet.create({
    button: {
        height: 60,
        width: '40%',
        backgroundColor: '#6e45e6',
        padding: 20,
        marginBottom: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    input: {
        margin: 15,
        height: 40,
        borderWidth: 1,
        padding: 10,
        width: '30%'
    }
})