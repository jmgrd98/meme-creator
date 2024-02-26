import { NavigationProp, RouteProp } from '@react-navigation/native'
import { useEffect, useState } from 'react';
import { memes } from '../assets/list';
import { Center, Container, HStack, Image, Heading, ScrollView, VStack, FormControl, Input, Button, Spinner, Modal } from 'native-base';
import MemeSelector from './MemeSelector';
import { Meme, useApi } from '../hooks/useApi';

interface RouterProps {
  navigation: NavigationProp<any, any>,
  route: RouteProp<{params: { meme: string }}, 'params'>
}

const CreatorScreen = ({ route }: RouterProps) => {

  const { createMeme } = useApi();

  const [selected, setSelected] = useState<any>();
  const [selectedName, setSelectedName] = useState<string>('');
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const { meme } = route.params || { meme: '10-Guy' } ;
    setSelected(memes[meme]);
    setSelectedName(meme);
  }, [route]);

  const memeSelected = (meme: Meme) => {
    setSelected(meme.image);
    setSelectedName(meme.name);
  };

  const doCreateMeme = async () => {
    setLoading(true);

    const memeBlob = await createMeme(top, bottom, selectedName!);

    const fileReaderInstance = new FileReader();
    fileReaderInstance.readAsDataURL(memeBlob.data);
    fileReaderInstance.onload = () => {
      const base64data = fileReaderInstance.result;
      setResult(base64data);
      setShowModal(true);
    }
  };

  const startDownload = () => {

  };

  return (
      <ScrollView>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          size={'lg'}>
            <Modal.Content maxWidth={400}>
              <Modal.CloseButton />
              <Modal.Header>
                Your Meme
              </Modal.Header>

              <Modal.Body>
                <Image
                  source={{ uri: result }}
                  alt='Result'
                  resizeMode='contain'
                  width={'400'}
                  height={'200'}
                />
              </Modal.Body>

              <Modal.Footer>
                <Button flex={1} onPress={() => startDownload()}>
                  Download
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>


        {loading && (
          <HStack m={10} space={2} justifyContent={'center'}>
            <Spinner accessibilityLabel='Loading meme' color={'secondary.500'} />
            <Heading color={'primary.500'} fontSize={'md'} color={'secondary.500'}>
              Creating meme...
            </Heading>
          </HStack>
        )}


        {!loading && (
          <HStack m={4} mb={10} space={2}>
            <VStack space={2} w={'60%'}>
              <FormControl>
                <Input 
                  placeholder='Top text'
                  onChangeText={(text) => setTop(text)}
                />
              </FormControl>
              <FormControl>
                <Input 
                  placeholder='Bottom text'
                  onChangeText={(text) => setBottom(text)}
                />
              </FormControl>

              <Button
                size={'md'}
                colorScheme={'secondary'}
                onPress={() => doCreateMeme()}>
                  Create Meme
                </Button>
            </VStack>
            <Center>
              <Image key={selected} source={selected} alt='Selected meme' />
            </Center>
          </HStack>
        )}

        <MemeSelector 
          onSelect={(meme) => memeSelected(meme)}
          activeMeme={selectedName} 
          
        />
      </ScrollView>
  )
}

export default CreatorScreen