import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/telas/Login";
import Menu from "./app/telas/Menu";
import TelaDeGastos from './app/telas/TelaDeGastos';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Estatísticas from './app/telas/Estatísticas';


const Stack = createNativeStackNavigator();
const StackLogado = createNativeStackNavigator();

function LogadoLayout() {
  return (
    <StackLogado.Navigator>
      <StackLogado.Screen name='Menu' component={Menu}/>
      <StackLogado.Screen name='Tela de Gastos' component={TelaDeGastos}/>
      <StackLogado.Screen name='Estatísticas' component={Estatísticas}/>
    </StackLogado.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = 'Login'>
        {user ? (
          <Stack.Screen name='MenuLogado' component={LogadoLayout} options={{ headerShown: false }}/>
        ) : (
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
