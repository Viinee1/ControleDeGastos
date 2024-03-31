import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import styles from '../../components/styles';

const Menu = () => {
    const navegação = useNavigation();
  return (
    <View>
        <Pressable onPress={() => FIREBASE_AUTH.signOut()} style={styles.botões}>
            <Text>Desconectar</Text>
        </Pressable>
        <Pressable onPress={() => navegação.navigate('Tela de Gastos')} style={styles.botões}>
            <Text>Tela de Gastos</Text>
        </Pressable>
    </View>
  );
};

export default Menu;