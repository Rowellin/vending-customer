import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TailwindProvider } from 'tailwindcss-react-native';

// screens
import HomeScreen from './Screens/HomeScreen';
import PaymentScreen from './Screens/PaymentScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}