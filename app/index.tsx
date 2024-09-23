// import libraries
import ScreenWrapper from '@/components/screenWrapper';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import Welcome from './welcome';
import useAuth from '@/components/useAuth';
import Home from './home';

// create a component
const Index = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <ScreenWrapper style={styles.container}>
      {user ? <Home /> : <Welcome />}
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

// make this component available to the app
export default Index;
