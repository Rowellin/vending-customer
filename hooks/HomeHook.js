import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from 'expo-file-system';
import { useEffect, useRef, useState } from "react";
import { PanResponder, ToastAndroid } from "react-native";
import { useDispatch } from "react-redux";
import { vendingService } from "../api/vending";
import { setUri } from "../Slices/HomeSlice";

export function useHome(isFocused) {
  const navigation = useNavigation();
  const [data, setData] = useState({
    'products': [],
    'bg': null,
  });
  const [press, setPress] = useState(false);
  const dispatch = useDispatch();

  // idle
  const timerId = useRef(false)
  const [idle, setIdle] = useState(false)
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        onTouch()
      },
    })
  ).current

  const resetInactivityTimeout = () => {
    clearTimeout(timerId.current)
    timerId.current = setTimeout(() => {
      setIdle(true)
    }, 15 * 1000)
  }

  const onTouch = () => {
    setIdle(false)
    resetInactivityTimeout()
  }
  // idle

  // filesystem
  const downloadVideo = async (from, name, uriSrc, type) => {

    // download
    const { uri } = await FileSystem.downloadAsync(from, FileSystem.documentDirectory + name);
    dispatch(setUri({ type, value: uri }))

    // save at local storage
    await AsyncStorage.setItem(`@${type}_uri`, uriSrc);
    await AsyncStorage.setItem(`@${type}_loc`, uri);
  }

  const getVideo = async (videoUri, type) => {

    // load local storiage
    const currentVideo = await AsyncStorage.getItem(`@${type}_uri`)

    // logic whether download or not 
    if (currentVideo === null || videoUri !== currentVideo) {
      downloadVideo(videoUri, `${type}.mp4`, videoUri, type);
    } else {
      dispatch(setUri({ type, value: await AsyncStorage.getItem(`@${type}_loc`) }))
    }
  }

  const removeVideo = async (type) => {
    dispatch(setUri({ type, value: null }));
    await AsyncStorage.removeItem(`@${type}_uri`);
    await AsyncStorage.removeItem(`@${type}_loc`);
  }

  const processVideo = async (videoUri, type) => {
    if (videoUri) {
      await getVideo(videoUri, type);
    } else {
      await removeVideo(type);
    }
  }
  // filesystem

  const fetchProduct = async () => {

    const vendingName = await AsyncStorage.getItem('@vending_name')
    if (vendingName === null) {
      navigation.navigate('Setting');
    }

    try {
      const res = await vendingService.getProduct();

      if (res.success) {
        setData(res.data)

        await processVideo(res.data.video.ln_video_uri, 'ln_video')
        await processVideo(res.data.video.pt_video_uri, 'pt_video')

      } else {
        throw res.message
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  }

  const onPressHandler = async (item) => {
    try {
      setPress(true)

      const res = await vendingService.submitInvoice(item);

      setPress(false)

      if (res.success) {
        navigation.navigate('Payment', {
          uri: res.data.xendit_url,
          timeout: res.data.expired * 1000,
        });
      } else {
        throw res.message
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  }

  useEffect(() => {
    fetchProduct();
    resetInactivityTimeout();
  }, [isFocused])

  return {
    data,
    press,
    onPressHandler,
    onTouch,
    panResponder,
    idle,
  }
}