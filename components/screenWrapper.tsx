//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// create a component
const ScreenWrapper = ({children, bg}:any) => {
    const {top} = useSafeAreaInsets()
    const paddingTop = top>0? top+5 : 50; 
    return (
        <View style={{flex:1, paddingTop, backgroundColor: bg}}>
           {children}
        </View>
    );
};

//make this component available to the app
export default ScreenWrapper;
