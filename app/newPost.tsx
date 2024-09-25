// Import libraries
import ScreenWrapper from '@/components/screenWrapper';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import useAuth from '@/components/useAuth';
import TextEditor from '@/components/TextEditor';

// Create a component
const NewPost = () => {
    const router = useRouter();
    const {user}= useAuth()
    const [userInfo, setUserInfo] = useState<any>({});

    useEffect(() => {
        if (user?.email) {
          fetchDataUser(user.email);
        } else {
          // Stop loading if user email is not available
        }
      }, [user]);
    
      const fetchDataUser = async (email: string) => {
        try {
          const response = await fetch(`http://10.0.2.2:5000/user/create/${email}`);
          const data = await response.json();
          setUserInfo(data);
        } catch (error) {
          console.error("Error fetching user data: ", error);
        } finally {
          
        }
      };
    

    return (
        <ScreenWrapper >
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.replace("/home")}>
                        <AntDesign style={styles.back} name="left" size={26} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Create Post</Text>
                </View>

                <View style={styles.userInfo}>
                    
                    <Image 
                        source={require('../assets/images/4113045-removebg-preview.png')}
                        style={styles.Image}
                    />
                    
                    <Text style={styles.userName}>{userInfo?.name}</Text>
                </View>

                <View style={styles.textEditor}>
                <TextEditor/>


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
    icon: {
        marginLeft: 20, 
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center", // Align vertically in the center
        padding: 10,
        marginTop:20 // Optional padding for better spacing
    },
    userName: {
        marginLeft: 10, // Add some space between avatar and username
        fontSize: 20, // Optional: Adjust font size for username
    },
    Image:{
        height:45,
        width:45
    },
    textEditor:{

    }
});

// Make this component available to the app
export default NewPost;
