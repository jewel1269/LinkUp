//import libraries
import { auth } from '@/components/Firebase/Firebase';
import ScreenWrapper from '@/components/screenWrapper';
import { hp, wp } from '@/helpers/common';
import { AntDesign, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, Alert, Image } from 'react-native';

// create a component
const Profile = () => {
    const router = useRouter();
    const user = true; 

    const handleLogOut = () => {
        if (user) {
            Alert.alert(
                "Logout",
                "Are you sure you want to log out?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Logout cancelled"),
                        style: "cancel" 
                    },
                    {
                        text: "OK", 
                        onPress: () => {
                            signOut(auth)
                                .then(() => {
                                    ToastAndroid.show("Logout success", ToastAndroid.SHORT);
                                    router.replace('/login'); 
                                })
                                .catch((error) => {
                                    ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.SHORT);
                                });
                        }
                    }
                ],
                { cancelable: true } 
            );
        }
    };
   
    return (
        <ScreenWrapper>
            <View>
                
                <View style={styles.container}>
                    <View>
                        <TouchableOpacity onPress={() => router.back()}>
                            <AntDesign style={styles.back} name="left" size={26} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.header}>Profile</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={handleLogOut}>
                            <AntDesign style={styles.logout} name="logout" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* User Image and Edit Options */}
                <View>
                    <Image 
                        source={require('../assets/images/4113045-removebg-preview.png')}
                        style={styles.Image}
                    />
                    <TouchableOpacity onPress={() => router.replace("/editProfile")}>
                        <MaterialCommunityIcons style={styles.edit} name="account-edit-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {/* User Information */}
                <View style={styles.userInfo}>
                    <Text style={styles.name}>Jewel Mia</Text>
                </View>
                <View style={styles.address}>
                    <View style={styles.userRow}>
                        <MaterialCommunityIcons name="email-search-outline" size={24} color="black" />
                        <Text style={styles.userText}>Jewel@gmail.com</Text>
                    </View>
                    <View style={styles.userRow}>
                        <FontAwesome5 name="address-card" size={24} color="black" />
                        <Text style={styles.userText}>Uttara Sector-10, Dhaka, Bangladesh</Text>
                    </View>
                    <View style={styles.userRow}>
                        <Feather name="phone" size={24} color="black" />
                        <Text style={styles.userText}>+8801684321082</Text>
                    </View>
                </View>

            </View>
        </ScreenWrapper>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: wp(20),
        marginLeft: 10,
        marginRight: 10,
    },
    back: {
        backgroundColor: '#D3D3D3',
        borderRadius: 10,
        padding: 3,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    logout: {
        color: 'red',
    },
    Image: {
        alignSelf: "center",
        height: 100,
        width: 100,
    },
    edit: {
        alignSelf: "center",
        marginTop: -18,
        marginLeft: 70,
        color: "red",
        borderRadius: 30,
        backgroundColor: "#D3D3D3",
    },
    userInfo: {
        alignItems: "center",
        marginVertical: 15, // Add some spacing below the image
    },
    name: {
        fontSize: 20,
        fontWeight: "400",
    },
    address: {
        padding: hp(20),
        marginTop: 25,
    },
    userRow: {
        flexDirection: "row",
        alignItems: "center", // Align icon and text vertically
        marginVertical: 5,
    },
    userText: {
        marginLeft: 10,
        fontSize: 16,
    },
});

//make this component available to the app
export default Profile;
