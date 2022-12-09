import { View, Text, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useHome } from '../hooks/HomeHook';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen() {
  const isFocused = useIsFocused()
  const { product, press, onPressHandler } = useHome(isFocused);

  return (
    <ScrollView style={{ paddingVertical: 20 }} horizontal>
      {product.length != 0 &&
        <FlatList
          scrollEnabled={false}
          numColumns={Math.ceil(product.length / 2)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={true}
          data={product}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => onPressHandler(item)} key={index} disabled={press}>
              <View style={{ display: 'flex', flexDirection: 'column' }} className='m-3'>
                <View style={{ width: 200 }}>
                  <Image
                    source={{ uri: item.image ?? 'https://media.istockphoto.com/id/1138179183/id/vektor/tidak-ada-tanda-gambar-yang-tersedia.jpg?s=612x612&w=is&k=20&c=DrreG9_mkdLgqmeQSwE6GiEnxaZL1j4GzwVSrP5mqBY=' }}
                    style={{ width: 200, height: 200, resizeMode: 'stretch' }}
                    blurRadius={press ? 5 : 0}
                  />
                </View>
                <View>
                  <Text>{item.name}</Text>
                </View>
                <View>
                  <Text>Price: {item.price}</Text>
                </View>
                <View>
                  <Text>Stock: {item.stock}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      }
    </ScrollView>
  )
}