import { FlatList, ScrollView, ImageBackground } from 'react-native'
import React from 'react'
import { useHome } from '../hooks/HomeHook';
import { useIsFocused } from '@react-navigation/native';

// components
import ProductCard from '../Components/ProductCard';
import Setting from '../Components/Setting';
import VideoHome from '../Components/VideoHome';

export default function HomeScreen() {
  const isFocused = useIsFocused()
  const { data: { products, bg }, press, onPressHandler } = useHome(isFocused);

  return (
    <ImageBackground className='flex-1' source={bg ? { uri: bg } : ''} resizeMode="cover">
      <Setting />
      <VideoHome />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {products.length != 0 &&
          <FlatList
            scrollEnabled={false}
            numColumns={Math.ceil(products.length / 2)}
            data={products}
            renderItem={(v) => (
              <ProductCard value={v} press={press} onPressHandler={onPressHandler} />
            )}
          />
        }
      </ScrollView>
    </ImageBackground>
  )
}