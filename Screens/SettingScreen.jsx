import { View, Text, TextInput, Button, ToastAndroid } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSetting } from '../hooks/SettingHook';
import * as ImagePicker from 'expo-image-picker';
import { setUri } from '../Slices/HomeSlice';
import { useDispatch } from 'react-redux';

export default function SettingScreen() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    user: '',
    password: '',
  });
  const [name, setName] = useState('');

  const { isLoggedIn, onLoginHandler, submitNameHandler, isName } = useSetting(setName);

  const dispatch = useDispatch()

  const selectVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
    });
    if (!result.canceled) {
      dispatch(setUri(result.assets[0].uri))
      ToastAndroid.show('Success choosing video', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show('Error getting video', ToastAndroid.SHORT);
    }
  };

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
      {isLoggedIn &&
        <View className='border-2 px-3 mt-10 mb-5 py-5 border-gray-200'>
          <View className='flex-row justify-center mb-3'>
            <Text className='font-bold text-base'>Admin Only</Text>
          </View>
          <View className='flex-row items-center my-3'>
            <Text className='w-20'>Name: </Text>
            <TextInput
              onChangeText={(text) => setName(text)}
              className='flex-1 py-2 border-2 rounded-lg h-10 px-5 bg-white mr-5'
              cursorColor={'black'}
              value={name}
            />
            <Button title='Submit' className='text-blue-200' onPress={() => submitNameHandler(name)} />
          </View>
          <View className='flex-row items-center my-3'>
            <Text className='w-20'>Video: </Text>
            <Button title='Select Video' className='text-blue-200' onPress={selectVideo} />
          </View>
        </View>
      }
    </SafeAreaView>
  )
}