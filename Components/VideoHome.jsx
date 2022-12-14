import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Video } from 'expo-av';
import { useSelector } from 'react-redux';

export default function VideoHome() {
  const uri = useSelector(state => state.videoHome)

  return (
    <>
      <View style={styles.container}>
        {uri && <Video
          style={styles.video}
          source={{ uri }}
          resizeMode="contain"
          isLooping
          shouldPlay
        />}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 110
  },
  video: {
    alignSelf: 'center',
    width: 380,
    height: 210,
  },
});