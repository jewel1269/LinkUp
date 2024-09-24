// Import libraries
import { useNavigation, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
  ToastAndroid,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/components/Firebase/Firebase";
import ScreenWrapper from "@/components/screenWrapper";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

// Create a component
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
  const router = useRouter();
  const navigation = useNavigation();

  // Fade in animation
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; // Adjusted for a 10-digit phone number

    if (name.trim() === "") {
      ToastAndroid.show("Name is required", ToastAndroid.SHORT);
      return false;
    }
    if (email.trim() === "") {
      ToastAndroid.show("Email is required", ToastAndroid.SHORT);
      return false;
    }
    if (!emailRegex.test(email)) {
      ToastAndroid.show("Enter a valid email address", ToastAndroid.SHORT);
      return false;
    }
    if (phone.trim() === "") {
      ToastAndroid.show("Phone number is required", ToastAndroid.SHORT);
      return false;
    }
    if (!phoneRegex.test(phone)) {
      ToastAndroid.show("Enter a valid 10-digit phone number", ToastAndroid.SHORT);
      return false;
    }
    if (username.trim() === "") {
      ToastAndroid.show("Username is required", ToastAndroid.SHORT);
      return false;
    }
    if (password.trim() === "") {
      ToastAndroid.show("Password is required", ToastAndroid.SHORT);
      return false;
    }
    if (password.length < 6) {
      ToastAndroid.show("Password must be at least 6 characters long", ToastAndroid.SHORT);
      return false;
    }
    return true;
  };

  const userData = {
    name, username, email, phone, password
  }


  const doUserRegistration = async () => {
    if (!validateInputs()) return;
  
    try {
      const response = await axios.post("http://10.0.2.2:5000/user/create", userData); 
      console.log(response.data); 
    } catch (error) {
      console.error("Error creating user on server:", error);
      ToastAndroid.show("Failed to create user on the server", ToastAndroid.SHORT);
      return;
    }
  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      ToastAndroid.show(`User ${username} was successfully created!`, ToastAndroid.SHORT);
      router.replace('/login');
    } catch (error) {
      console.error(error);
      ToastAndroid.show("Failed to create user: " ,ToastAndroid.SHORT);
    }
  };
  

  return (
    <ScreenWrapper>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <AntDesign name="left" size={26} color="black" />
      </TouchableOpacity>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Text style={styles.introText}>Let's,</Text>
        <Text style={styles.subText}>Get Started</Text>
        <Text style={styles.headerText}>Sign Up fill up the form</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.inputLeft]}
            value={name}
            placeholder="Name"
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, styles.inputRight]}
            value={email}
            placeholder="Email"
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.inputLeft]}
            value={phone}
            placeholder="Phone Number"
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TextInput
            style={[styles.input, styles.inputRight]}
            value={username}
            placeholder="address"
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={doUserRegistration}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.footerText}>
            If you have an account then{" "}
            <Text onPress={() => router.replace("/login")} style={styles.loginLink}>
              Log-In
            </Text>
          </Text>
        </View>
      </Animated.View>
    </ScreenWrapper>
  );
};

// Define your styles
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  backButton: {
    paddingTop: 50,
    paddingLeft: 20,
  },
  introText: {
    fontSize: 32,
    marginLeft: -260,
  },
  subText: {
    fontSize: 22,
    color: "gray",
    marginLeft: -225
  },
  headerText: {
    fontSize: 18,
    marginBottom: 20,
    color: "black",
    marginLeft: -160,
    marginTop: 10,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    height: 50,
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
  },
  inputLeft: {
    marginRight: 10,
    flex: 1,
  },
  inputRight: {
    marginLeft: 10,
    flex: 1,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "outfit-bold",
  },
  footerText: {
    fontFamily: "outfit",
    fontSize: 16,
    marginTop: 15,
  },
  loginLink: {
    color: "green",
  },
});

export default SignUp;
