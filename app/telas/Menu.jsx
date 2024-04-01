import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import styles from '../../components/styles';

const Menu = () => {
    const navegação = useNavigation();
  return (
    <View>
        <Pressable onPress={() => navegação.navigate('Tela de Gastos')} style={styles.botões}>
            Tela de Gastos
        </Pressable>
        <Pressable onPress={() => navegação.navigate('Estatísticas')} style={styles.botões}>
            Ver Estatísticas
        </Pressable>
        <Pressable onPress={() => FIREBASE_AUTH.signOut()} style={styles.botões}>
            Desconectar
        </Pressable>
    </View>
  );
};

export default Menu;