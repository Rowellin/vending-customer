import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Setting() {
  const navigation = useNavigation()

  return (
    <SafeAreaView>
      <View className='flex-row justify-end'>
        <TouchableOpacity className='bg-gray-300 p-1.5' onPress={() => navigation.navigate('Setting')}></TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}