import 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/HomeScreen';
import AboutScreen from './components/AboutScreen';
import CreatorScreen from './components/CreatorScreen';
import { Pressable, Text, extendTheme, HStack, NativeBaseProvider, VStack, Icon } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Drawer = createDrawerNavigator();
const theme = extendTheme({});

const getIcon = (screenName: string) => {
  switch (screenName) {
    case 'Home':
      return 'home';
    case 'About':
      return 'information';
    case 'Creator':
      return 'fire'
    default:
      return undefined;
  }
}

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <VStack my={2} mx={1} space={3}>
        {props.state.routeNames.map((name: string, index: number) => (
          <Pressable key={index} onPress={(event) => props.navigation.navigate(name)}>
            <HStack space={7} alignItems={'center'}>
              <Icon size={5}
               color={index === props.state.index ? 'secondary.600' : 'gray.700'}
               as={<MaterialCommunityIcons name={getIcon(name)} />}
               >

               </Icon>
              <Text fontWeight={500} color={index === props.state.index ? 'secondary.600' : 'gray.700'}>
                {name}
              </Text>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </DrawerContentScrollView>
  );
};

export default function App() {

  const headerStyle = {
    headerStyle: {
      backgroundColor: theme.colors.secondary[500],
    },
    headerTintColor: '#fff',
  }

  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            initialRouteName=''
            >
            <Drawer.Screen name="Home" component={HomeScreen} 
              options={{
                title: 'Trending Memes',
                ...headerStyle
              }}
            />
            <Drawer.Screen name="About" component={AboutScreen} 
              options={{
                title: 'About the app',
                ...headerStyle
              }}
            />
            <Drawer.Screen name="Creator" component={CreatorScreen} 
              options={{
                title: 'Create your own meme',
                ...headerStyle
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
