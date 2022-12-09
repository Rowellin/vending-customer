import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buffer } from "buffer";

const user = 'user';
const pass = 'pass';

const config = {
  url: 'https://rowellin.com/vending-service/public/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': Buffer.from(`${user}:${pass}`).toString('base64'),
  },
}

export const vendingService = {
  getProduct: async () => {
    const options = {
      headers: config.headers,
    }

    const response = await fetch(
      `${config.url}/products?${new URLSearchParams({
        'vending': await AsyncStorage.getItem('@vending_name'),
      })}`,
      options
    )

    return await response.json();
  },

  submitInvoice: async (item) => {
    const options = {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        'vending': await AsyncStorage.getItem('@vending_name'),
        'product': item.name,
        'amount': item.price,
      })
    }

    const response = await fetch(`${config.url}/invoice`, options)

    return await response.json();
  },

  login: async (req) => {
    const options = {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(req)
    }

    const response = await fetch(`${config.url}/login`, options)

    return await response.json();
  },

  vendingCheck: async (vending) => {
    const options = {
      headers: config.headers,
    }

    const response = await fetch(
      `${config.url}/vending-check?${new URLSearchParams({ vending })}`,
      options
    )

    return await response.json();
  },
}