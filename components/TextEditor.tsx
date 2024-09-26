// Import necessary libraries
import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Platform,
  ToastAndroid,
} from 'react-native';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import EmojiSelector from 'react-native-emoji-selector'; // Import emoji selector
import * as ImagePicker from 'expo-image-picker';
import useAuth from './useAuth';
import { router } from 'expo-router';

const TextEditor = () => {
  const [postText, setPostText] = useState('');
  const [media, setMedia] = useState<any>(null); 
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); 
  const {user}= useAuth()
  const [userInfo, setUserInfo] = useState<any>({});
  const [loading, setLoading] = useState(true);

  // Function to handle image or video selection
  const pickMedia = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === true) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setMedia(pickerResult.assets[0]);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchDataUser(user.email);
    } else {
      setLoading(false); // Stop loading if user email is not available
    }
  }, [user]);

  const fetchDataUser = async (email: string) => {
    try {
      const response = await fetch(`https://linkup-server.vercel.app/user/create/${email}`);
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to create a post
  const createPost = async () => {
    if (!postText && !media) {
      Alert.alert('Please add some text or media to create a post!');
      return;
    }

    const newPost = {
      user: userInfo,
      title: postText,
      postImage: media ? media.uri : null,
      type: media?.type,
      like: 0,
      comment: 0,
      date:new Date()
    };

    try {
      const response = await fetch('https://linkup-server.vercel.app/public/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const result = await response.json();
        ToastAndroid.show("Your post has been created successfully", ToastAndroid.SHORT)
        setPostText('');
        setMedia(null);
        router.replace('/home')
      } else {
        Alert.alert('Error', 'There was an issue creating your post.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to create post at the moment.');
    }
  };

  // Add emoji to the text input
  const addEmoji = (emoji:any) => {
    setPostText(postText + emoji);
  };

  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        {/* Input Area */}
        <TextInput
          style={styles.inputArea}
          placeholder="What's on your mind, JE?"
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          value={postText}
          onChangeText={setPostText}
        />

        {/* Add Media Section */}
        <View style={styles.mediaSection}>
          <TouchableOpacity style={styles.mediaButton} onPress={pickMedia}>
            <FontAwesome6 name="image" size={24} color="white" />
            <Text style={styles.mediaText}>Add Photos/Videos</Text>
          </TouchableOpacity>

           {/* Post Options */}
        <View style={styles.optionsSection}>
          <TouchableOpacity
            style={styles.optionIcon}
            onPress={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <FontAwesome6 name="smile" size={24} color="red" />
          </TouchableOpacity>
        </View>

     

          <TouchableOpacity style={styles.mediaButtonAdd} onPress={createPost}>
            <Text style={styles.addText}>Post</Text>
          </TouchableOpacity>
        </View>

        {/* Show Selected Media */}
        {media && (
          <View style={styles.selectedMedia}>
            <Text>
              Selected {media.type === 'image' ? 'Image' : 'Video'}: {media.uri}
            </Text>
          </View>
        )}

     

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <EmojiSelector
          
            onEmojiSelected={addEmoji}
            showSearchBar={false}
            category={EmojiSelector.Categories?.ALL}
          />
        )}

        {/* Post Button */}
        <View style={{ marginTop: 100 }}>
          <TouchableOpacity style={styles.postButton} onPress={createPost}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  inputArea: {
    backgroundColor: '#D3D3D3',
    color: '#000',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  mediaSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  mediaText: {
    color: 'black',
    marginLeft: 10,
  },
  mediaButtonAdd: {
    backgroundColor: '#00a400',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  optionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  optionIcon: {
    backgroundColor: '#D3D3D3',
    padding: 10,
    borderRadius: 8,
  },
  postButton: {
    backgroundColor: '#00a400',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  postButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedMedia: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
});

// Export the component
export default TextEditor;
