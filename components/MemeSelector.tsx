import { Heading } from 'native-base'
import { View, Text } from 'react-native'
import { Meme, useApi } from '../hooks/useApi'
import { useEffect, useState } from 'react'


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
  }, [])

  return (
    <Heading>
      <Text>MemeSelector</Text>
    </Heading>
  )
}

export default MemeSelector