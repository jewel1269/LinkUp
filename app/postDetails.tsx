import ScreenWrapper from '@/components/screenWrapper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

// create a component
const PostDetails = () => {
  const { postId } = useLocalSearchParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPostData = () => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (postId) {
      fetchPostData();
    }
  }, [postId]);

  if (loading) {
    return (
      <ScreenWrapper>
        <ActivityIndicator size="large" color="#0000ff" />
      </ScreenWrapper>
    );
  }

  if (error) {
    return (
      <ScreenWrapper>
        <Text>Error: {error}</Text>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View>
        <Text>PostDetails</Text>
        {post && (
          <>
            <Text>Title: {post.title}</Text>
            <Text>Body: {post.body}</Text>
          </>
        )}
      </View>
    </ScreenWrapper>
  );
};

// make this component available to the app
export default PostDetails;
