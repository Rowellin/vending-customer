import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { vendingService } from "../api/vending";

export function useHome(isFocused) {
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const [product, setProduct] = useState([]);
  const [press, setPress] = useState(false);

  const fetchProduct = async () => {
    try {
      const res = await vendingService.getProduct();

      if (res.success) {
        setProduct(res.data)
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
    product,
    press,
    onPressHandler,
  }
}