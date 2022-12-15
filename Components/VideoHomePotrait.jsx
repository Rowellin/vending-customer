import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Video } from 'expo-av';
import { useSelector } from 'react-redux';

export default function VideoHomePotrait({ onTouch }) {
  const { videoHomePt } = useSelector(state => state.videoHome)

  return (
    <SafeAreaView onTouchStart={onTouch}>
      <View className='flex-row justify-center'>
        <Video
          style={styles.video}
          source={{ uri: videoHomePt }}
          isLooping
          shouldPlay
          resizeMode='contain'
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  video: {
    width: 440,
    height: 780,
  },
});