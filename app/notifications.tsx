//import liraries
import AllNotification from '@/components/AllNotification';
import ScreenWrapper from '@/components/screenWrapper';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Notifications = () => {
    return (
        <ScreenWrapper >
            <AllNotification/>
        </ScreenWrapper>
    );
};



//make this component available to the app
export default Notifications;
