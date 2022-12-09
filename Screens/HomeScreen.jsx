import { View, Text, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useHome } from '../hooks/HomeHook';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const { product, press, onPressHandler } = useHome(isFocused);

  return (
    <View>
      <View className='flex-row justify-end'>
        <TouchableOpacity className='bg-gray-300 p-2' onPress={() => navigation.navigate('Setting')}></TouchableOpacity>
      </View>
      <ScrollView
        style={{ paddingVertical: 20 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {product.length != 0 &&
          <FlatList
            scrollEnabled={false}
            numColumns={Math.ceil(product.length / 2)}
            data={product}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => onPressHandler(item)} key={index} disabled={press}>
                <View style={{ display: 'flex', flexDirection: 'column' }} className='m-3'>
                  <View style={{ width: 150 }}>
                    <Image
                      source={{ uri: item.image ?? 'https://media.istockphoto.com/id/1138179183/id/vektor/tidak-ada-tanda-gambar-yang-tersedia.jpg?s=612x612&w=is&k=20&c=DrreG9_mkdLgqmeQSwE6GiEnxaZL1j4GzwVSrP5mqBY=' }}
                      style={{ width: 120, height: 120, resizeMode: 'stretch' }}
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
    </View>
  )
}