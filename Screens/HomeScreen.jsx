import { View, Text, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const DATA = [
    {
      key: '1',
      text: 'Item text 1',
      uri: 'https://picsum.photos/id/1/200',
    },
    {
      key: '2',
      text: 'Item text 2',
      uri: 'https://picsum.photos/id/10/200',
    },

    {
      key: '3',
      text: 'Item text 3',
      uri: 'https://picsum.photos/id/1002/200',
    },
    {
      key: '4',
      text: 'Item text 4',
      uri: 'https://picsum.photos/id/1006/200',
    },
    {
      key: '5',
      text: 'Item text 5',
      uri: 'https://picsum.photos/id/1008/200',
    },
    {
      key: '4',
      text: 'Item text 4',
      uri: 'https://picsum.photos/id/1006/200',
    },
    {
      key: '5',
      text: 'Item text 5',
      uri: 'https://picsum.photos/id/1008/200',
    },
    {
      key: '4',
      text: 'Item text 4',
      uri: 'https://picsum.photos/id/1006/200',
    },
    {
      key: '5',
      text: 'Item text 5',
      uri: 'https://picsum.photos/id/1008/200',
    },
    {
      key: '4',
      text: 'Item text 4',
      uri: 'https://picsum.photos/id/1006/200',
    },
    {
      key: '5',
      text: 'Item text 5',
      uri: 'https://picsum.photos/id/1008/200',
    },
    {
      key: '4',
      text: 'Item text 4',
      uri: 'https://picsum.photos/id/1006/200',
    },
    {
      key: '5',
      text: 'Item text 5',
      uri: 'https://picsum.photos/id/1008/200',
    },
    {
      key: '4',
      text: 'Item text 4',
      uri: 'https://picsum.photos/id/1006/200',
    },
    {
      key: '5',
      text: 'Item text 5',
      uri: 'https://picsum.photos/id/1008/200',
    },
  ];

  const navigation = useNavigation();

  const onPressHandler = () => {
    navigation.navigate('Payment', {
      uri: 'https://github.com/facebook/react-native',
      timeout: 10 * 1000,
    });
  }

  return (
    <ScrollView style={{ paddingVertical: 20 }} horizontal>
      <FlatList
        scrollEnabled={false}
        numColumns={Math.ceil(DATA.length / 2)}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={true}
        data={DATA}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={onPressHandler} key={index}>
            <View style={{ display: 'flex', flexDirection: 'column' }} className='m-3'>
              <View style={{ width: 200 }}>
                <Image
                  source={{ uri: item.uri }}
                  style={{ width: 200, height: 200, resizeMode: 'stretch' }}
                />
              </View>
              <View>
                <Text>{item.text}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  )
}