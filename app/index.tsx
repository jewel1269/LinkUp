//import liraries
import ScreenWrapper from '@/components/screenWrapper';
import { useRouter } from 'expo-router';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Welcome from './welcome';

// create a component
const index = () => {

    const router = useRouter()
    return (
        <ScreenWrapper style={styles.container}>
            <Welcome/>
        </ScreenWrapper>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

//make this component available to the app
export default index;

