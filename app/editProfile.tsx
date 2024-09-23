// Import libraries
import Button from "@/components/Button";
import ScreenWrapper from "@/components/screenWrapper";
import { AntDesign, EvilIcons, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, TextInput, Text } from "react-native";
import * as ImagePicker from 'expo-image-picker';

// Create a component
const EditProfile = () => {
    const router = useRouter();
    const [profileImage, setProfileImage] = useState(null);

    const handleUpdate = () => {
        console.log("Profile updated!");
    };

    const pickImage = async () => {
        // Request permission to access the camera roll
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        // Open the image picker
        const result = await ImagePicker.launchImageLibraryAsync();

     
    };

    return (
        <ScreenWrapper>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <AntDesign style={styles.back} name="left" size={26} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Edit Profile</Text>
                </View>

                <View>
                    <TouchableOpacity onPress={pickImage}>
                        <Image 
                            source={profileImage ? {  profileImage } : require('../assets/images/4113045-removebg-preview.png')}
                            style={styles.image}
                        />
                        <Ionicons style={styles.cameraIcon} name="camera-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.infoText}>
                    <EvilIcons name="star" size={24} color="black" /> 
                    Please fill your profile details
                </Text>

                {/* Input Fields for Profile Details */}
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <MaterialIcons style={styles.bioIcon} name="person" size={20} color="gray" />
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            placeholderTextColor="gray"
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <MaterialIcons style={styles.bioIcon} name="phone" size={20} color="gray" />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone"
                            placeholderTextColor="gray"
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="location-outline" size={24} color="black" />
                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            placeholderTextColor="gray"
                        />
                    </View>
                    <View style={styles.inputWrapper}>
                        <MaterialIcons style={styles.bioIconTwo} name="info" size={20} color="gray" />
                        <TextInput
                            style={styles.inputBio}
                            placeholder="Bio"
                            placeholderTextColor="gray"
                        />
                    </View>
                </View>

                {/* Update Button */}
                <View style={styles.buttonContainer}>
                    <Button title="Update" onPress={handleUpdate} />
                </View>
            </View>
        </ScreenWrapper>
    );
};

// Define your styles
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    headerText: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
    },
    back: {
        marginRight: 10,
        backgroundColor: '#D3D3D3',
        borderRadius: 10,
        padding: 2,
    },
    image: {
        alignSelf: "center",
        height: 100,
        width: 100,
        borderRadius: 50,
        marginVertical: 20,
    },
    cameraIcon: {
      alignSelf:"center",
        color: "red",
        marginTop:-40,
        marginLeft:50
    },
    infoText: {
        marginLeft: 16,
        padding: 5,
        marginBottom: 3,
        flexDirection: "row",
        alignItems: "center",
    },
    inputContainer: {
        paddingHorizontal: 20,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#D3D3D3",
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: "#F9F9F9",
        marginBottom: 15,
    },
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 15,
        borderRadius: 30,
    },
    inputBio: {
        height: 120,
        borderColor: "#D3D3D3",
        borderRadius: 30,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: "#F9F9F9",
    },
    buttonContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    bioIcon: {
        marginLeft: 5,
    },
    bioIconTwo: {
        marginTop: -13,
        marginLeft: 5,
    },
});

// Make this component available to the app
export default EditProfile;
