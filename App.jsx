import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/telas/Login";
import Menu from "./app/telas/Menu";
import TelaDeGastos from './app/telas/TelaDeGastos';
import Estatísticas from './app/telas/Estatísticas';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

//pilha de navegação (deslogado, logado)
const Stack = createNativeStackNavigator();
const StackLogado = createNativeStackNavigator();

//estrutura de navegação para usuários logados
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
  // Estado para armazenar informações do usuário autenticado
  const [user, setUser] = useState(null);
  // Efeito para monitorar mudanças no estado de autenticação do usuário
  useEffect(() => {
    // Função que é chamada sempre que há mudanças no estado de autenticação do Firebase
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []); // Array vazio, pois só é executado 1 vez

  return (
    <NavigationContainer>
      {/* Navegação em pilha para diferentes telas */}
      <Stack.Navigator initialRouteName='Login'>
        {/* Condição para renderizar a tela de menu ou a tela de login com base no estado do usuário */}
        {user ? (
          <Stack.Screen name='MenuLogado' component={LogadoLayout} options={{ headerShown: false }}/>
        ) : (
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
