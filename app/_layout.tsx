//import liraries
import { Stack } from 'expo-router';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class _layout extends Component {
    render() {
        return (
           <Stack screenOptions={{
            headerShown: false
           }}/>
        );
    }
}


//make this component available to the app
export default _layout;
