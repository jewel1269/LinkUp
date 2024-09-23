import { AntDesign, Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";

// Create a component
const AllPost = () => {
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

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

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Go to details page
  const openPostDetails = (postId: number) => {
    router.push({
      pathname: "/postDetails",
      params: { postId },
    });
  };

  return (
    <ScrollView style={{ paddingHorizontal: 10, gap: 10, marginTop: 20 }}>
      {posts.map((post: any) => (
        <View key={post.id}>
          <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={styles.userDetails}>
                <Image
                  source={require('../assets/images/4113045-removebg-preview.png')}
                  style={styles.image}
                />
                <View>
                  <Text>Jewel Mia</Text>
                  <Text>10-11-24</Text>
                </View>
              </View>
              <View>
                <Entypo name="dots-three-horizontal" size={24} color="black" />
              </View>
            </View>
            {/* This is Image section */}
            <View style={styles.imageBorder}>
              <Text style={{ marginLeft: 8, padding: 3 }}>{post.title}</Text>
              <Image
                source={require('../assets/images/images (1).jpeg')}
                style={styles.postImage}
              />
            </View>
            {/* Comment Section */}
            <View style={{ marginLeft: 7 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 45 }}>
                <Feather name="heart" size={24} color="green" />
                <FontAwesome onPress={() => openPostDetails(post.id)} name="comment-o" size={24} color="black" />
                <AntDesign name="upload" size={24} color="red" />
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 14,
    padding: 10,
    marginBottom: 10, // Add margin between posts
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AllPost;
