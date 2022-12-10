import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function ProductCard({ value: { item, index }, press, onPressHandler }) {
  return (
    <TouchableOpacity
      onPress={() => onPressHandler(item)}
      key={index}
      disabled={press}
      className='p-3 bg-white m-3 rounded-lg w-44 flex-row justify-center'
    >
      <View style={{ display: 'flex', flexDirection: 'column' }}>
        <View style={{ width: 130 }} className='border-2 flex-row justify-center rounded-lg border-gray-200'>
          <Image
            source={item.image ? { uri: item.image } : require('./../assets/no-image.jpg')}
            style={{ width: 100, height: 100, resizeMode: 'stretch' }}
            blurRadius={press ? 5 : 0}
          />
        </View>
        <View className='my-1'>
          <Text className='font-bold text-xs'>{item.name}</Text>
        </View>
        <View className='flex-row justify-between'>
          <Text style={{ fontSize: 11 }} >Rp. {item.price}</Text>
          <Text style={{ fontSize: 10 }} className='text-gray-500'>Stok: {item.stock}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}