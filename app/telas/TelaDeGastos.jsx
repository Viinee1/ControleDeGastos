import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, Picker, Alert } from 'react-native';
import { FIREBASE_AUTH, REALTIME_DB } from '../../FirebaseConfig';
import { ref, push, set, onValue, update, remove } from 'firebase/database';
import styles from '../../components/styles';

const TelaDeGastos = () => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    // Recuperar os gastos do usuário atual do Realtime Database
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const gastosRef = ref(REALTIME_DB, `gastos/${user.uid}`);
      onValue(gastosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const gastosArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
          setGastos(gastosArray);
        } else {
          setGastos([]);
        }
      });
    }
  }, []); // Executar uma vez ao montar o componente

  const adicionarGasto = () => {
    // Validação dos campos
    if (descricao.trim() === '' || valor.trim() === '' || categoria.trim() === '') {
      alert('Todos os campos são obrigatórios.');
      return;
    }
    const valorFloat = parseFloat(valor.replace(',', '.')); // Converte para float

    if (isNaN(valorFloat) || valorFloat <= 0) {
      alert('O valor deve ser maior que R$0,00.');
      return;
    }

    // Salvar gasto no Firebase Realtime Database
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const novoGastoRef = push(ref(REALTIME_DB, `gastos/${user.uid}`));
      set(novoGastoRef, {
        descricao: descricao,
        valor: valorFloat,
        categoria: categoria,
        userId: user.uid // Adiciona o ID do usuário ao gasto
      }).catch((error) => {
        console.error('Erro ao adicionar gasto:', error);
      });

      // Limpar os campos após salvar
      setDescricao('');
      setValor('');
      setCategoria('');
    } else {
      alert('Usuário não autenticado.');
    }
  };

  const editarGasto = (id, novoDescricao, novoValor, novaCategoria) => {
    // Atualizar os dados do gasto no Firebase Realtime Database
    update(ref(REALTIME_DB, `gastos/${FIREBASE_AUTH.currentUser.uid}/${id}`), {
      descricao: novoDescricao,
      valor: novoValor,
      categoria: novaCategoria
    }).catch((error) => {
      console.error('Erro ao editar gasto:', error);
    });
  };

  const removerGasto = (id) => {
    // Remover o gasto do Firebase Realtime Database
    remove(ref(REALTIME_DB, `gastos/${FIREBASE_AUTH.currentUser.uid}/${id}`)).catch((error) => {
      console.error('Erro ao remover gasto:', error);
    });
  };

  return (
    <View>
      <Text>TelaDeGastos</Text>
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        style={styles.inputgastos}
      />
      <TextInput
        placeholder="Valor (R$)"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
        style={styles.inputgastos}
      />
      <Picker
        selectedValue={categoria}
        onValueChange={(itemValue) => setCategoria(itemValue)}
        style={styles.inputgastos}
      >
        <Picker.Item label="Selecione a categoria" value="" />
        <Picker.Item label="Alimentação" value="Alimentação" />
        <Picker.Item label="Transporte" value="Transporte" />
        <Picker.Item label="Lazer" value="Lazer" />
        {/* Adicione mais categorias conforme necessário */}
      </Picker>
      <Pressable style={styles.botãogastos} onPress={adicionarGasto}>
        <Text>Adicionar Gasto</Text>
      </Pressable>
      {/* Renderizar os gastos na tela */}
      <View>
        <Text>Lista de Gastos:</Text>
        {gastos.map((gasto, index) => (
          <View key={index}>
            <TextInput
              placeholder="Descrição"
              value={gasto.descricao}
              onChangeText={(novaDescricao) => editarGasto(gasto.id, novaDescricao, gasto.valor, gasto.categoria)}
              style={styles.inputgastos}
            />
            <TextInput
              placeholder="Valor (R$)"
              value={gasto.valor.toString()}
              onChangeText={(novoValor) => editarGasto(gasto.id, gasto.descricao, parseFloat(novoValor), gasto.categoria)}
              keyboardType="numeric"
              style={styles.inputgastos}
            />
            <Picker
              selectedValue={gasto.categoria}
              onValueChange={(novaCategoria) => editarGasto(gasto.id, gasto.descricao, gasto.valor, novaCategoria)}
              style={styles.inputgastos}
            >
              <Picker.Item label="Selecione a categoria" value="" />
              <Picker.Item label="Alimentação" value="Alimentação" />
              <Picker.Item label="Transporte" value="Transporte" />
              <Picker.Item label="Lazer" value="Lazer" />
              {/* Adicione mais categorias conforme necessário */}
            </Picker>
            {/* Botão para remover o gasto */}
            <Pressable
              onLongPress={() => removerGasto(gasto.id)}
              style={styles.botãogastos}
            >
              <Text>Pressione para remover gasto</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );  
};

export default TelaDeGastos;
