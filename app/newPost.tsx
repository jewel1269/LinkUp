// Import libraries
import ScreenWrapper from '@/components/screenWrapper';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Avater  from '@/components/Avater';

import useAuth from '@/components/useAuth';

// Create a component
const NewPost = () => {
    const router = useRouter();
    const {user}= useAuth()
    const bodyRef = useRef("")
    const [Loading, setLoading] =useState(false)
    const editorRef = useRef(null);

    const handleEditorChange = (body:any) => {
        console.log(body); 
    };
    

  
    return (
        <ScreenWrapper>
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
                    
                    <Text style={styles.userName}>Jewel Mia</Text>
                </View>

                <View style={styles.textEditor}>
                <RichtextEditor editorRef={editorRef} onChange={handleEditorChange} />


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
