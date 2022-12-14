import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
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

  const fetchProduct = async () => {

    const vendingName = await AsyncStorage.getItem('@vending_name')
    if (vendingName === null) {
      navigation.navigate('Setting');
    }

    async function downloadVideo(from, name, uriSrc) {
      await AsyncStorage.setItem('@ln_video_uri', uriSrc);
      const { uri } = await FileSystem.downloadAsync(from, FileSystem.documentDirectory + name);
      dispatch(setUri(uri))
      await AsyncStorage.setItem('@ln_video_loc', uri);
    }

    try {
      const res = await vendingService.getProduct();

      if (res.success) {
        setData(res.data)

        if (res.data.video.ln_video_uri) {
          const ln_video = await AsyncStorage.getItem('@ln_video_uri')
          if (ln_video === null || res.data.video.ln_video_uri !== ln_video) {
            downloadVideo(res.data.video.ln_video_uri, 'ln_video.mp4', res.data.video.ln_video_uri);
          } else {
            dispatch(setUri(await AsyncStorage.getItem('@ln_video_loc')))
          }
        } else {
          dispatch(setUri(null));
          await AsyncStorage.removeItem('@ln_video_uri');
          await AsyncStorage.removeItem('@ln_video_loc');
        }

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
  }, [isFocused])

  return {
    data,
    press,
    onPressHandler,
  }
}