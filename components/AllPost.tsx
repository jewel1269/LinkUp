import { AntDesign, Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Video } from "expo-av"; // Use 'expo-av' for video playback

const AllPost = () => {
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState<{ [key: number]: boolean }>({}); // State for tracking liked posts
  const router = useRouter();

  const fetchData = () => {
    fetch("http://10.0.2.2:5000/public/posts")
      .then((response) => response.json())
      .then((data) => {
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

  // Toggle liked state for a post
  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId], // Toggle the liked state
    }));
  };

  return (
    <ScrollView style={{ paddingHorizontal: 10, gap: 10, marginTop: 20 }}>
      {posts?.map((post: any) => (
        <View key={post.id}>
          <View style={styles.container}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={styles.userDetails}>
                {post?.userImage ? (
                  <Image
                    source={{ uri: post?.userImage }}
                    style={styles.image}
                  />
                ) : (
                  <Image
                    source={require("../assets/images/4113045-removebg-preview.png")}
                    style={styles.image}
                  />
                )}
                <View>
                  <Text>{post?.username}</Text>
                  <Text>{post?.date}</Text>
                </View>
              </View>
              <View>
                <Entypo name="dots-three-horizontal" size={24} color="black" />
              </View>
            </View>
            {/* Image or Video Section */}
            <View style={styles.imageBorder}>
              <Text style={{ marginLeft: 8, padding: 3 }}>{post.title}</Text>
              {post?.postVideo ? (
                <Video
                  source={{ uri: post?.postVideo }}
                  style={styles.video}
                  useNativeControls
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={{ uri: post?.postImage }}
                  style={styles.postImageOne}
                />
              )}
            </View>
            {/* Comment Section */}
            <View style={{ marginLeft: 7 }}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 45 }}
              >
                {/* Like Icon with Toggle Functionality */}
                <TouchableOpacity style={[styles.likeButton]}>
                  <Feather
                    name="heart"
                    size={24}
                    onPress={() => toggleLike(post._id)}
                    color={likedPosts[post.id] ? "red" : "green"} // Change heart color based on liked state
                    style={[
                      styles.likeButton,
                      likedPosts[post?._id] && { color: "green" }, // Change background color to green if liked
                    ]}
                  />
                  <Text>{post?.like}</Text>
                </TouchableOpacity>

                {/* Comment Icon */}
                <TouchableOpacity
                  onPress={() => openPostDetails(post.id)}
                  style={styles.commentButton}
                >
                  <FontAwesome name="comment-o" size={24} color="black" />
                  <Text>{post?.comment}</Text>
                </TouchableOpacity>

                {/* Share Icon */}
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
    shadowOpacity: 10,
    shadowColor: "black",
    padding: 10,
    borderColor: "#D3D3D3",
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
  postImageOne: {
    height: 170,
    width: "100%",
    alignSelf: "center",
    borderRadius: 20,
  },
  video: {
    height: 170,
    width: "100%",
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 350,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    padding: 8,
    borderRadius: 5,
  },
  commentButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
});

export default AllPost;
