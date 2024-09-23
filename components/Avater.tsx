//import libraries
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

// create a component
const Avatar = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/4113045-removebg-preview.png')}
                style={styles.image}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',    
        borderWidth: 1,         
        borderRadius: 50,        
              
    },
    image: {
        width: 30,
        height: 30, 
        resizeMode: 'contain', 
    },
});

//make this component available to the app
export default Avatar;
