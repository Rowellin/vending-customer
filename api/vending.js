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
        'vending': 'aft_kosayu',
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
        'vending': 'aft_kosayu',
        'product': item.name,
        'amount': item.price,
      })
    }

    const response = await fetch(`${config.url}/invoice`, options)

    return await response.json();
  }
}