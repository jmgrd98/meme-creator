import { View, Text } from 'react-native'
import {useEffect} from 'react'
import { useApi } from '../hooks/useApi'

const HomeScreen = () => {

  const { getTrending } = useApi();

  useEffect(() => {
    const loadMemes = async () => {
      const results = await getTrending();
    }
    loadMemes();
  }, [])


  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen