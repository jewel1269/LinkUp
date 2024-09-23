import { Entypo, Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// Create a component
const AllPost = () => {
  const [posts, setPosts] = useState([]);

  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{paddingHorizontal:10, gap:10}}>
      {posts.map((post) => (
        <View key={post.id}>
          <View style={styles.container}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
              <View style={styles.userDetails}>
              <View>
              <Image
                source={require('../assets/images/4113045-removebg-preview.png')}
                style={styles.image}
                 />
                </View>
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
            <View>
            <Image />
            </View>

            {/* Comment Section */}

            <View>
               <View>
               <Feather name="heart" size={24} color="black" />
               </View>
            </View>

          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        paddingHorizontal: 10,
        borderRadius:14

    },
    image: {
        width: 40,
        height:40, 
        resizeMode: 'contain', 
    },
    userDetails:{
        flexDirection:"row",
        alignItems:"center",
        
    }
});

export default AllPost;
