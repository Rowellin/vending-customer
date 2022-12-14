import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function ProductCard({ value: { item, index }, press, onPressHandler }) {
  return (
    <View
      key={index}
      className='p-3 bg-white m-3 rounded-lg w-44 flex-row justify-center'
    >
      <View style={{ display: 'flex', flexDirection: 'column' }}>
        <View style={{ width: 130 }} className='border-2 flex-row justify-center rounded-lg border-gray-200'>
          <Image
            source={item.image ? { uri: item.image + '?' + new Date() } : require('./../assets/no-image.jpg')}
            style={{ width: 100, height: 100, resizeMode: 'stretch' }}
          />
        </View>
        <View className='my-1'>
          <Text className='font-bold text-xs'>{item.name}</Text>
        </View>
        <View className='flex-row justify-between items-center'>
          <View>
            <Text style={{ fontSize: 11 }} >Rp. {item.price}</Text>
            <Text style={{ fontSize: 10 }} className='text-gray-500'>Stok: {item.stock}</Text>
          </View>
          <TouchableOpacity
            className={`py-1 px-2 rounded-sm ${press ? 'bg-blue-300' : 'bg-blue-500'}`}
            onPress={() => onPressHandler(item)}
            disabled={press}
          >
            <Text className='text-white font-bold'>Beli</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}