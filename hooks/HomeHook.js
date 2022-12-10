import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { vendingService } from "../api/vending";

export function useHome(isFocused) {
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    'products': [],
    'bg': null,
  });
  const [press, setPress] = useState(false);

  const fetchProduct = async () => {

    const vendingName = await AsyncStorage.getItem('@vending_name')
    if (vendingName === null) {
      navigation.navigate('Setting');
    }

    try {
      const res = await vendingService.getProduct();

      if (res.success) {
        setData({ products: res.data.products, bg: res.data.bg_image })
      } else {
        throw res.message
      }
    } catch (error) {
      setError(error.message)
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
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [isFocused])

  return {
    error,
    data,
    press,
    onPressHandler,
  }
}