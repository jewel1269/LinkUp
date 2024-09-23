//import libraries
import { auth } from "@/components/Firebase/Firebase";
import ScreenWrapper from "@/components/screenWrapper";
import useAuth from "@/components/useAuth";
import { hp, wp } from "@/helpers/common";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Image,
  ScrollView,
} from "react-native";

// create a component
const Profile = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false); // Also set loading to false on error
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogOut = () => {
    if (user) {
      Alert.alert(
        "Logout",
        "Are you sure you want to log out?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Logout cancelled"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              signOut(auth)
                .then(() => {
                  ToastAndroid.show("Logout success", ToastAndroid.SHORT);
                  router.replace("/login");
                })
                .catch((error) => {
                  ToastAndroid.show(
                    `Error: ${error.message}`,
                    ToastAndroid.SHORT
                  );
                });
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <ScreenWrapper>
      <View>
        <View style={styles.container}>
          <View>
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign
                style={styles.back}
                name="left"
                size={26}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.header}>Profile</Text>
          </View>
          <View>
            <TouchableOpacity onPress={handleLogOut}>
              <AntDesign
                style={styles.logout}
                name="logout"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* User Image and Edit Options */}
        <View>
          <Image
            source={require("../assets/images/4113045-removebg-preview.png")}
            style={styles.Image}
          />
          <TouchableOpacity onPress={() => router.replace("/editProfile")}>
            <MaterialCommunityIcons
              style={styles.edit}
              name="account-edit-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* User Information */}
        <View style={styles.userInfo}>
          <Text style={styles.name}>Jewel Mia</Text>
        </View>
        <View style={styles.address}>
          <View style={styles.userRow}>
            <MaterialCommunityIcons
              name="email-search-outline"
              size={24}
              color="black"
            />
            <Text style={styles.userText}>{user?.email}</Text>
          </View>
          <View style={styles.userRow}>
            <FontAwesome5 name="address-card" size={24} color="black" />
            <Text style={styles.userText}>
              Uttara Sector-10, Dhaka, Bangladesh
            </Text>
          </View>
          <View style={styles.userRow}>
            <Feather name="phone" size={24} color="black" />
            <Text style={styles.userText}>+8801684321082</Text>
          </View>
        </View>

        {/* Your Post */}

        <Text style={{ fontSize: 20, marginLeft: 10 }}>
          Your Post <FontAwesome6 name="turn-down" size={18} color="red" />
        </Text>

        <ScrollView style={{ paddingHorizontal: 10, gap: 10, marginTop: 20 }}>
          {posts.slice(0, 10).map((post: any) => (
            <View key={post.id}>
              <View style={styles.containerOne}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.userDetails}>
                    <Image
                      source={require("../assets/images/4113045-removebg-preview.png")}
                      style={styles.image}
                    />
                    <View>
                      <Text>Jewel Mia</Text>
                      <Text>10-11-24</Text>
                    </View>
                  </View>
                  <View>
                    <Entypo
                      name="dots-three-horizontal"
                      size={24}
                      color="black"
                    />
                  </View>
                </View>
                {/* This is Image section */}
                <View style={styles.imageBorder}>
                  <Text style={{ marginLeft: 8, padding: 3 }}>
                    {post.title}
                  </Text>
                  <Image
                    source={require("../assets/images/images (1).jpeg")}
                    style={styles.postImage}
                  />
                </View>
                {/* Comment Section */}
                <View style={{ marginLeft: 7 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 45,
                    }}
                  >
                    <Feather name="heart" size={24} color="green" />
                    <FontAwesome name="comment-o" size={24} color="black" />
                    <AntDesign name="upload" size={24} color="red" />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: wp(20),
    marginLeft: 10,
    marginRight: 10,
  },
  back: {
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    padding: 3,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
  },
  logout: {
    color: "red",
  },
  Image: {
    alignSelf: "center",
    height: 100,
    width: 100,
  },
  edit: {
    alignSelf: "center",
    marginTop: -18,
    marginLeft: 70,
    color: "red",
    borderRadius: 30,
    backgroundColor: "#D3D3D3",
  },
  userInfo: {
    alignItems: "center",
    marginVertical: 15, // Add some spacing below the image
  },
  name: {
    fontSize: 20,
    fontWeight: "400",
  },
  address: {
    padding: hp(20),
    marginTop: 25,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center", // Align icon and text vertically
    marginVertical: 5,
  },
  userText: {
    marginLeft: 10,
    fontSize: 16,
  },
  containerOne: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 14,
    padding: 10,
    marginBottom: 10, // Add margin between posts
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  userDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  postImage: {
    height: 170,
    width: 350,
    alignSelf: "center",
    borderRadius: 20,
  },
  imageBorder: {
    borderEndColor: "gray",
    padding: 5,
    borderRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    marginTop: 400,
    justifyContent: "center",
    alignItems: "center",
  },
});

//make this component available to the app
export default Profile;
