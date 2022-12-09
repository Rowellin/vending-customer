import { View, Text, TextInput, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSetting } from '../hooks/SettingHook';

export default function SettingScreen() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    user: '',
    password: '',
  });
  const [name, setName] = useState('');

  const { isLoggedIn, onLoginHandler, submitNameHandler, isName } = useSetting(setName);

  return (
    <SafeAreaView className='p-4 bg-gray-300'>
      <View className='flex-row items-center my-3'>
        <Text className='w-20'>User: </Text>
        <TextInput
          onChangeText={(text) => setForm({ ...form, user: text })}
          className='py-2 border-2 rounded-lg h-10 px-5 bg-white w-64'
          cursorColor={'black'}
        />
      </View>
      <View className='flex-row items-center my-3'>
        <Text className='w-20'>Password: </Text>
        <TextInput
          onChangeText={(text) => setForm({ ...form, password: text })}
          className='py-2 border-2 rounded-lg h-10 px-5 bg-white w-64'
          cursorColor={'black'}
          secureTextEntry={true}
        />
      </View>
      <View className='flex-row my-5'>
        {isName && <View className='mr-5'>
          <Button title='Back' color={'grey'} onPress={() => navigation.navigate("Home")} />
        </View>}
        <View className='flex-1'>
          <Button title='Login' className='text-blue-200' onPress={() => onLoginHandler(form)} disabled={isLoggedIn} />
        </View>
      </View>
      {isLoggedIn && <View className='flex-row items-center mt-10 mb-5'>
        <Text className='w-20'>Name: </Text>
        <TextInput
          onChangeText={(text) => setName(text)}
          className='flex-1 py-2 border-2 rounded-lg h-10 px-5 bg-white mr-5'
          cursorColor={'black'}
          value={name}
        />
        <Button title='Submit' className='text-blue-200' onPress={() => submitNameHandler(name)} />
      </View>}
    </SafeAreaView>
  )
}