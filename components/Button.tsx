//import libraries
import { wp } from '@/helpers/common';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Loading from './Loading';

// create a component
const Button = ({
    buttonStyle,
    textStyle, 
    title, 
    onPress = () => {},
    loading = false,
    hasShadow = true
}: any) => {
    const shadowStyle = {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
    };

    if (loading) {
        return (
            <View style={[styles.button, buttonStyle, { backgroundColor: "white", marginTop: 20 }]}>
                <Loading />
            </View>
        );
    }

    return (
        <Pressable 
            onPress={onPress} 
            style={[styles.button, buttonStyle, hasShadow && shadowStyle]}
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </Pressable>
    );
};

//make this component available to the app
export default Button;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
