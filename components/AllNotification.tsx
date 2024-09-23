import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";

// create a component
const AllNotification = () => {
  const router = useRouter();

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="left" size={26} color="black" />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Notifications</Text>
        </View>
      </View>

      {/* Scrollable Notifications */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {[...Array(15)].map((_, index) => (
          <View key={index} style={styles.notificationItem}>
            <View style={styles.comment}>
              <Image
                source={require("../assets/images/4113045-removebg-preview.png")}
                style={styles.avatar}
              />
              <View style={styles.commentDetails}>
                <Text style={styles.userName}>Jewel Mia</Text>
                <Text style={styles.commentText}>Commented on your post</Text>
              </View>
            </View>
            <Text style={styles.dateText}>4 Sep.</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,

    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    padding: 3,
    marginRight: 10,
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
  },
  scrollViewContent: {
    paddingVertical: 10,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    marginHorizontal: 10,
    marginVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#B0C4DE",
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentDetails: {
    flexDirection: "column",
  },
  userName: {
    fontWeight: "bold",
  },
  commentText: {
    color: "#555",
  },
  dateText: {
    color: "#888",
  },
});

// make this component available to the app
export default AllNotification;
