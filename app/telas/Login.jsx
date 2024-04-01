import { View, Text, StyleSheet, TextInput, ActivityIndicator, Pressable, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import styles from '../../components/styles';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const fazerLogin = async () => {
        setLoading(true);
        try {
            const resposta = await signInWithEmailAndPassword(auth, email, senha);
            console.log(resposta);
        } catch (error) {
            console.log(error);
            alert('O Login falhou: ' + error.message);
        } finally {
            setLoading(false);
        }
    }
    
    const criarConta = async () => {
        setLoading(true);
        try{
            const resposta = await createUserWithEmailAndPassword(auth, email, senha);
            console.log(resposta);
            alert("Cheque seu e-mail!")
        }catch (error){
            console.log(error)
            alert('A criação de conta falhou: ', error.message);
        } finally {
            setLoading(false)
        }
    }


  return (
    <View style={styles.container}>
    <KeyboardAvoidingView>
      <Text style={styles.titulo}>Gastos RN</Text>
      <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(texto) => setEmail(texto)}></TextInput>
      <TextInput secureTextEntry={true} value={senha} style={styles.input} placeholder="Senha" autoCapitalize="none" onChangeText={(texto) => setSenha(texto)}></TextInput>

    { loading ?( <ActivityIndicator size="large" color="#0000ff" />
    )
    : (
     <>
         <Pressable onPress={fazerLogin} style={styles.botões}>
         <Text>Login</Text>
         </Pressable>
         <Pressable onPress={criarConta} style={styles.botões}>
         <Text>Criar Conta</Text>
         </Pressable>
     </>
    )}
        </KeyboardAvoidingView>
    </View>
  );
};

export default Login;


