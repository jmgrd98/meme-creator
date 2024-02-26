import { Center, Heading, Pressable, Row } from 'native-base'
import { View, Text } from 'react-native'
import { Meme, useApi } from '../hooks/useApi'
import { useEffect, useState } from 'react';
import { Image } from 'native-base';


interface MemeProps {
  activeMeme?: string,
  onSelect: (meme: Meme) => {}
}

const MemeSelector = ({ activeMeme, onSelect }: MemeProps) => {

  const { getMemes } = useApi();
  const [memes, setMemes] = useState<Meme[] | null>(null);

  useEffect(() => {
    const loadMemes = () => {
      getMemes().then((results) => {
        setMemes(results);
      })
    }
    loadMemes();
  }, []);

  const memeSelected = (meme: Meme) => {
    onSelect(meme);
  }

  return (
    <>
    <Center>
    <Heading>Select your Meme:</Heading>
    </Center>
      <Row 
        flexWrap={'wrap'}
        mb={5}
        mt={5}
        alignItems={'center'}
        justifyContent={'center'}
        >
      {memes?.map((meme, index) => (
        <Pressable
          m={1}
          key={meme.name}
          onPress={() => memeSelected(meme)}
          shadow={'2s'}>
          <Image
            source={meme.image}
            borderColor={'cyan.600'}
            borderWidth={ activeMeme === meme.name ? 4 : 0 }
            size={'lg'}
            alt='Meme' />
        </Pressable>
      ))}
      </Row>
    </>
  )
}

export default MemeSelector