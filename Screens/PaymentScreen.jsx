import React from 'react'
import WebView from 'react-native-webview';

export default function PaymentScreen({ route, navigation }) {
  const { uri, timeout } = route.params;

  setTimeout(() => {
    navigation.navigate('Home');
  }, timeout);

  return (
    <WebView
      source={{ uri }}
    />
  )
}