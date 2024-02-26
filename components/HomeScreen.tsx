import { View, Text } from 'react-native'
import {useEffect, useState} from 'react'
import { StyleSheet, Image } from 'react-native';
import { TrendingMeme, useApi } from '../hooks/useApi'
import { Center, Heading, ScrollView, Skeleton, VStack } from 'native-base';
import Swiper from 'react-native-swiper';

const HomeScreen = () => {

  const { getTrending } = useApi();
  const [memes, setMemes] = useState<TrendingMeme[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMemes = async () => {
      const results = await getTrending();
      setMemes(results);
      setLoading(false);
    }
    loadMemes();
  }, [])


  return (
    <ScrollView>
      {loading && (
        <Center w='100%' mt={8}>
          <VStack w='90%' space={4}>
            <Skeleton.Text px="2" />
            <Skeleton h='80' />
          </VStack>
        </Center>
      )}

      {!loading && (
        <Swiper
          style={styles.wrapper}
          showsButtons={true}
          showsPagination={false}
        >
          {memes?.map((meme, index) => (
            <View key={index}>
              <VStack alignItems={'center'}>
                <Heading>{meme.title}</Heading>
                <Image source={{ uri: meme.url }} style={{ width: '95%', height: 300 }} />
              </VStack>
            </View>
          ))}
        </Swiper>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  } 
});

export default HomeScreen