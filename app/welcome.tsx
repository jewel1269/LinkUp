//import liraries
import Button from '@/components/Button';
import ScreenWrapper from '@/components/screenWrapper';
import { hp, wp } from '@/helpers/common';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, Pressable } from 'react-native';

// create a component
const Welcome = () => {
    return (
        <ScreenWrapper bg="white">
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <Image style={styles.welcomeImagelogo} resizeMode='contain' source={require("../assets/images/255-2557878_businessman-icon-avatar-illustration-euclidean-vector-removebg-preview.png")} />

             <View style={{gap:20}}>
                <Text style={styles.title}>
                    LinkUp!

                </Text>
                <Text style={styles.punchline}>
                    Where every thought finds a home and every image tells a story.

                </Text>

             </View>
             {/* Footer */}
                <View style={styles.footer}>
                    <Button title={"Geting Started"} 
                    buttonStyle={{marginHorizontal: wp(3)}}
                    onPress={()=> router.push("/signin")}
                    />
                    <View style={styles.bottomTextContainer}>
                        <Text style={styles.loginText}>
                            Already Have an account?
                        </Text>
                        <Pressable onPress={()=>router.push("/login")}>
                            <Text style={styles.login}>
                                Login 
                            </Text>
                        </Pressable>

                    </View>

                </View>
            </View>
        </ScreenWrapper>
    );
};

// define styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: wp(4),
        marginTop: -150
    },

       
        bottomTextContainer:{
            flexDirection:"row",
            justifyContent:"center",
            gap: 5

        },
        login:{
            textAlign:"center",
            fontWeight:"bold",
            textDecorationLine:"underline",
            color:"green"
        },
        loginText:{
        fontSize: 16
        },

    welcomeImagelogo:{
        width: 400, 
        height: 400,
        alignSelf: "center",
        marginLeft: 70
      
    
     
    },
    title:{
        color: "black",
        fontSize: 25, 
        textAlign: "center", 
        fontWeight: "600"

    },
    punchline:{
        color: "black",
        fontSize: 18, 
        textAlign: "center", 
        fontWeight: "400",
        padding: 12

    },
    footer:{
        gap: 30,
        width: "90%"

    }
});

//make this component available to the app
export default Welcome;
