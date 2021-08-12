import React from "react";
import {
    View, Text, TextInput, Button, StyleSheet, Alert,
    Platform, ActivityIndicator, Image
} from "react-native";
import Firebase from "../database/firebase";
import Geocoder from "react-native-geocoding";
// import ImagePicker from 'react-native-image-crop-picker';
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@expo/vector-icons/Ionicons'
import { AuthContext } from '../navigation/AuthProvider';

import * as ImagePicker from 'expo-image-picker';

const db = Firebase.firestore();
Geocoder.init("AIzaSyASYLMRcWSSxC_QbznjGA0hNRkl4-OjE_A");

const AddPlaceScreen = ({ navigation }) => {

    const { user, logout } = React.useContext(AuthContext);

    const [data, setData] = React.useState({
        street: "",
        number: "",
        postCode: ""
    });

    const [image, setImage] = React.useState(null);
    const [uploading, setUploading] = React.useState(false);
    const [place, setPlace] = React.useState(null);

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 1200,
            height: 780,
            cropping: true,
        }).then((image) => {
            console.log(image);
            const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
            setImage(imageUri);
        });
    };

    ///Select Image from library
    const choosePhotoFromLibrary = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled == true) {
            return;
        }
        setImage(pickerResult.uri);
    };

    ///Add a new place to our common FIRESTORE Database
    const submitPlace = async () => {
        console.log(image);
        const imageUrl = await uploadImage();
        console.log('Image Url: ', imageUrl);

        let fulladdress = data.street + " " + data.number + " " + data.postCode
        Geocoder.from(fulladdress)
            .then(json => {
                let location = json.results[0].geometry.location;
                setPlace(location);
            })
            .catch(error => console.warn(error));

        console.log(place);
        db.collection('places')
            .add({
                userId: user.uid,
                latitude: place.lat,
                longitude: place.lng,
                url: imageUrl
            })
            .then(() => {
                console.log('Place Added!!!');
                Alert.alert(
                    'Place published',
                    'Your place has been published succesfully!!!');
                setPlace(null);
            })
            .catch((error) => {
                console.log('Something went wrong with added post to firestore.', error);
            });
    }

    ///Upload place's Image to FIrebase Cloud and get Url

    const uploadImage = async () => {
        if (image == null) {
            return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        setUploading(true);

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open("GET", uploadUri, true);
            xhr.send(null);
        });

        const ref = Firebase.storage().ref().child(filename);
        const snapshot = await ref.put(blob);

        blob.close();

        url = await snapshot.ref.getDownloadURL();

        setUploading(false);
        setImage(null);

        return url;
    };

    return (
        <View>
            <Text>Add a New Place</Text>
            <Text>Street</Text>
            <TextInput
                placeholder="Enter the street"
                style={styles.textInput}
                onChangeText={(val) => setData({ ...data, street: val })}
            />

            <Text>Number</Text>
            <TextInput
                placeholder="Enter the street number"
                style={styles.textInput}
                onChangeText={(val) => setData({ ...data, number: val })}
            />

            <Text>PostCode</Text>
            <TextInput
                placeholder="Enter the postcode"
                style={styles.textInput}
                onChangeText={(val) => setData({ ...data, postCode: val })}
            />

            {uploading ? (
                <View>
                    <Text>Completed!</Text>
                </View>
            ) : (
                <Button onPress={submitPlace} title='Post Place' />
            )}

            {/* <Button title="GET COORDINATES" onPress={() => {
                let fulladdress = data.street + " " + data.number + " " + data.postCode
                Geocoder.from(fulladdress)
                    .then(json => {
                        var location = json.results[0].geometry.location;
                        console.log(location);
                    })
                    .catch(error => console.warn(error));
            }
            } /> */}
            <Button
                title='Take Photo'
                onPress={takePhotoFromCamera}
            />
            <Button title='test'
                onPress={choosePhotoFromLibrary} />
            {image == null ? <View></View>
                : <Image source={{ uri: image }}
                    style={styles.thumbnail} />}
        </View>
    )
}

export default AddPlaceScreen;

const styles = StyleSheet.create({
    // textInput: {
    //     flex: 1,
    //     marginTop: Platform.OS === 'ios' ? 0 : -12,
    //     paddingLeft: 10,
    //     color: '#05375a',
    // }
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    }
})