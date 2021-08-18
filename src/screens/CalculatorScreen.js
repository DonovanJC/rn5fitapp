import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, StatusBar } from "react-native";
import { Picker } from '@react-native-picker/picker';

const CalculatorScreen = ({ navigation }) => {
    [height, setHeight] = React.useState(null);
    [weight, setWeight] = React.useState(null);
    [bmi, setBmi] = React.useState('');
    [bmiResult, setBmiResult] = React.useState('');
    [age, setAge] = React.useState(null);
    [bmrResult, setBmrResult] = React.useState('');
    [gender, setGender] = React.useState('Male')

    const handleHeight = (text) => {
        setHeight(text);
    }
    const handleWeight = (text) => {
        setWeight(text);
    }
    const handleAge = (text) => {
        setAge(text);
    }

    const calculateBmiBmr = (height, weight, age) => {
        //calculation
        var resultBmi = (parseFloat(weight) * 10000) / (parseFloat(height) * parseFloat(height));
        var resultBmr = 66.473 + (13.751 * weight) + (5.0033 * height) - (6.7550 * age);
        resultBmr = resultBmr.toFixed(0);
        resultBmi = resultBmi.toFixed(2);
        //display result
        setBmi(resultBmi);
        setBmrResult('Calories: ' + resultBmr);
        if (resultBmi < 18.5) {
            setBmiResult('Your BMI RESULT is: Underweight')
        }
        else if (resultBmi >= 18.5 && resultBmi < 25) {
            setBmiResult('Your BMI RESULT is: Normal weight')
        }
        else if (resultBmi >= 25 && resultBmi < 30) {
            setBmiResult('Your BMI RESULT is: Overweight')
        }
        else if (resultBmi >= 30) {
            setBmiResult('Your BMI RESULT is: Obese')
        }
        else {
            alert('Incorrect Input!');
            setBmiResult('')
        }
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='white' barStyle='dark-content' />
            <ScrollView>
                <View>
                    <Text style={styles.title}>BMI | BMR </Text>
                    <Text style={styles.title2}>Calculator</Text>
                    <Text style={styles.label}>Height</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Height (cm)"
                        autoCapitalize="none"
                        onChangeText={handleHeight} />
                    <Text style={styles.label}>Weight</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Weight (Kg)"
                        autoCapitalize="none"
                        onChangeText={handleWeight} />
                    <Text style={styles.label}>Age</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Age"
                        autoCapitalize="none"
                        onChangeText={handleAge} />
                    <View >
                        <Text style={styles.label}>Gender</Text>
                        <View style={{borderWidth:1, width:150, marginLeft:15, marginTop:10}}>
                            <Picker
                                style={{ width: 150, marginLeft: 8, borderWidth: 3, paddingTop: 40 }}
                                selectedValue={gender}
                                onValueChange={(itemValue, itemIndex) =>
                                    setGender(itemValue)
                                }>
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                            </Picker>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={
                            () => calculateBmiBmr(height, weight, age)
                        }>
                        <Text style={styles.submitButtonText}> Calculate </Text>
                    </TouchableOpacity>
                    <Text style={styles.output}>{bmi}</Text>
                    <Text style={styles.resultText}>{bmiResult}</Text>
                    <Text style={styles.resultText}>{bmrResult}</Text>

                </View>
            </ScrollView>
        </View>
    );
};

export default CalculatorScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 70,

    },
    input: {
        margin: 15,
        height: 40,
        borderWidth: 1,
        padding: 10,
    },
    submitButton: {
        backgroundColor: '#6e45e6',
        padding: 20,
        margin: 15,
        borderRadius:20
    },
    submitButtonText: {
        textAlign: "center",
        color: 'white',
        fontSize: 18,
    },
    output: {
        textAlign: "center",
        fontSize: 30,
    },
    title: {
        paddingTop: 30,
        paddingBottom: 10,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
    },
    title2: {
        paddingBottom: 10,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
    },
    resultText: {
        paddingTop: 20,
        paddingBottom: 10,
        textAlign: "center",
        fontSize: 30,
        color: 'blue'
    },
    label: {
        marginLeft: 15,
        fontWeight: 'bold'
    }
})