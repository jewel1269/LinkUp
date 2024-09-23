//import libraries
import ScreenWrapper from '@/components/screenWrapper';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons'; // Importing icons from Expo
import { useRouter } from 'expo-router';
import Avater from '@/components/Avater';
import AllPost from '@/components/AllPost';

// create a component
const Home = () => {
    const router = useRouter()
    const user = true

    const goProfile = ()=>{
        if(user){
            router.push("/profile")
        }else{
            Alert.alert("Please Login")
        }
    }


    return (
        <ScreenWrapper style={styles.container}>
           <View>

           <View style={styles.headerContainer}>
                <Text style={styles.logoText}>LinkUp</Text>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={()=>router.push("/notifications")} style={styles.icon}>
                        <Ionicons name="notifications-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>router.replace("/newPost")} style={styles.icon}>
                        <MaterialIcons name="post-add" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>goProfile()} style={styles.icon}>
                        <Avater/>
                    </TouchableOpacity>
                </View>


               
            </View>

                <View>
                    <AllPost/>
                </View>
           </View>
        </ScreenWrapper>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: 20,
        
    
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal:10
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight:10
    },
    icon: {
        marginLeft: 20, // Space between icons
    },
});

//make this component available to the app
export default Home;
