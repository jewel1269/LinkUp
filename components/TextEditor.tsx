// Import necessary libraries
import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';

// Create a component
const TextEditor = () => {
  return (
   <View style={{backgroundColor: 'white'}}>
     <View style={styles.container}>
      {/* Input Area */}
      <TextInput
        style={styles.inputArea}
        placeholder="What's on your mind, JE?"
        multiline
        numberOfLines={5}
        textAlignVertical="top"
      />

      {/* Add Media Section */}
      <View style={styles.mediaSection}>
        <TouchableOpacity style={styles.mediaButton}>
          <FontAwesome6 name="image" size={24} color="white" />
          <Text style={styles.mediaText}>Add Photos/Videos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mediaButtonAdd}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Post Options */}
      <View style={styles.optionsSection}>
        <TouchableOpacity style={styles.optionIcon}>
        <FontAwesome6 name="photo-film" size={24} color="purple" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionIcon}>
        <FontAwesome5 name="user-cog" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionIcon}>
          <FontAwesome6 name="smile" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionIcon}>
          <FontAwesome6 name="gif" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>

      {/* Post Button */}
      <View style={{marginTop:100}}>
      <TouchableOpacity style={styles.postButton}>
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
    color: '#FFF',
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
});

// Export the component
export default TextEditor;
