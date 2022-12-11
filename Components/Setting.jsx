import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Setting() {
  const navigation = useNavigation()

  return (
    <View className='flex-row justify-end'>
      <TouchableOpacity className='bg-gray-300 p-1.5' onPress={() => navigation.navigate('Setting')}></TouchableOpacity>
    </View>
  )
}