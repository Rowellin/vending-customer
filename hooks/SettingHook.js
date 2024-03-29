import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import { vendingService } from "../api/vending";
import * as ImagePicker from 'expo-image-picker';
import { setUri } from '../Slices/HomeSlice';
import { useDispatch } from "react-redux";

export function useSetting(setName) {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isName, setIsName] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const isName = async () => {
      const name = await AsyncStorage.getItem('@vending_name');

      if (name) {
        setIsName(true)
        setName(name)
      }
    }

    isName()
  }, [])

  const onLoginHandler = async (form) => {
    try {
      if (form.user === '' || form.password === '') {
        ToastAndroid.show('Please fill your form!', ToastAndroid.SHORT);
        return
      }

      const res = await vendingService.login(form);

      if (res.success) {
        setIsLoggedIn(true);
      } else {
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
      }

    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  }

  const submitNameHandler = async (name) => {
    try {
      if (name === '') {
        ToastAndroid.show('Please fill your name!', ToastAndroid.SHORT);
        return
      }

      const res = await vendingService.vendingCheck(name);

      if (res.success) {
        await AsyncStorage.setItem('@vending_name', name);
        navigation.navigate('Home');
      } else {
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
      }

    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  }

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
  }

  return {
    isLoggedIn,
    onLoginHandler,
    submitNameHandler,
    isName,
    selectVideo,
  }
}