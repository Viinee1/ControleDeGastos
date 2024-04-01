import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, Picker, ScrollView } from 'react-native';
import { FIREBASE_AUTH, REALTIME_DB } from '../../FirebaseConfig';
import { ref, push, set, onValue, update, remove } from 'firebase/database';
import styles from '../../components/styles';

const TelaDeGastos = () => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState('');
  const [gastos, setGastos] = useState([]);
  const [categoriasUsuario, setCategoriasUsuario] = useState([]);
  const [novaCategoriaInput, setNovaCategoriaInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const gastosRef = ref(REALTIME_DB, `gastos/${user.uid}`);
      onValue(gastosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const gastosArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value, labels: value.data, datasets: [{ data: [value.valor] }] }));
          setGastos(gastosArray);
        } else {
          setGastos([]);
        }
      });

      const categoriasRef = ref(REALTIME_DB, `categorias/${user.uid}`);
      onValue(categoriasRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const categoriasArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
          setCategoriasUsuario(categoriasArray);
        } else {
          setCategoriasUsuario([]);
        }
      });
    }
  }, []);

  const adicionarGasto = () => {
    if (descricao.trim() === '' || valor.trim() === '' || categoria.trim() === '' || data.trim() === '') {
      alert('Todos os campos são obrigatórios.');
      return;
    }
    const valorFloat = parseFloat(valor.replace(',', '.'));

    if (isNaN(valorFloat) || valorFloat <= 0) {
      alert('O valor deve ser maior que R$0,00.');
      return;
    }

    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const novoGastoRef = push(ref(REALTIME_DB, `gastos/${user.uid}`));
      set(novoGastoRef, {
        descricao: descricao,
        valor: valorFloat,
        categoria: categoria,
        data: data,
        userId: user.uid
      }).catch((error) => {
        console.error('Erro ao adicionar gasto:', error);
      });

      setDescricao('');
      setValor('');
      setCategoria('');
      setData('');
    } else {
      alert('Usuário não autenticado.');
    }
  };

  const editarGasto = (id, novoDescricao, novoValor, novaCategoria, novaData) => {
    update(ref(REALTIME_DB, `gastos/${FIREBASE_AUTH.currentUser.uid}/${id}`), {
      descricao: novoDescricao,
      valor: novoValor,
      categoria: novaCategoria,
      data: novaData
    }).catch((error) => {
      console.error('Erro ao editar gasto:', error);
    });
  };

  const removerGasto = (id) => {
    remove(ref(REALTIME_DB, `gastos/${FIREBASE_AUTH.currentUser.uid}/${id}`)).catch((error) => {
      console.error('Erro ao remover gasto:', error);
    });
  };

  const adicionarCategoria = (novaCategoria) => {
    if (novaCategoria.trim() === '') {
      alert('Por favor, insira uma categoria válida.');
      return;
    }
    if (categoriasUsuario.find(cat => cat.nome === novaCategoria)) {
      alert('Esta categoria já existe.');
      return;
    }

    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const novaCategoriaRef = push(ref(REALTIME_DB, `categorias/${user.uid}`));
      set(novaCategoriaRef, { nome: novaCategoria })
        .then(() => {
          setNovaCategoriaInput('');
        })
        .catch((error) => {
          console.error('Erro ao adicionar categoria:', error);
        });
    } else {
      alert('Usuário não autenticado.');
    }
  };

  const filterExpenses = () => {
    let filteredExpenses = [...gastos];

    if (searchQuery.trim() !== '') {
      filteredExpenses = filteredExpenses.filter(expense =>
        expense.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.valor.toString().includes(searchQuery.trim()) ||
        expense.categoria.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.data.includes(searchQuery.trim())
      );
    }

    return filteredExpenses;
  };

  return (
    <ScrollView>
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
        <ScrollView style={{ maxHeight: 150 }}>
          <Picker
            selectedValue={categoria}
            onValueChange={(itemValue) => setCategoria(itemValue)}
            style={styles.inputgastos}
          >
            <Picker.Item label="Selecione a categoria" value="" />
            <Picker.Item label="Alimentação" value="Alimentação" />
            <Picker.Item label="Transporte" value="Transporte" />
            <Picker.Item label="Lazer" value="Lazer" />
            {categoriasUsuario.map((cat) => (
              <Picker.Item key={cat.id} label={cat.nome} value={cat.nome} />
            ))}
          </Picker>
        </ScrollView>
        <TextInput
          placeholder="Data (dd/mm/aaaa)"
          value={data}
          onChangeText={setData}
          style={styles.inputgastos}
        />
        <Pressable style={styles.botãogastos} onPress={adicionarGasto}>
          <Text>Adicionar Gasto</Text>
        </Pressable>
        <TextInput
          placeholder="Nova Categoria"
          value={novaCategoriaInput}
          onChangeText={setNovaCategoriaInput}
          style={styles.inputgastos}
        />
        <Pressable onPress={() => adicionarCategoria(novaCategoriaInput)}>
          <Text style={styles.botãogastos}>Adicionar Nova Categoria</Text>
        </Pressable>
        <TextInput
          placeholder="Buscar gastos por descrição, valor, categoria ou data"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.inputgastos}
        />
        <View>
          <Text>Lista de Gastos:</Text>
          {filterExpenses().map((gasto, index) => (
            <View key={index}>
              <TextInput
                placeholder="Descrição"
                value={gasto.descricao}
                onChangeText={(novaDescricao) => editarGasto(gasto.id, novaDescricao, gasto.valor, gasto.categoria, gasto.data)}
                style={styles.inputgastos}
              />
              <TextInput
                placeholder="Valor (R$)"
                value={gasto.valor.toString()}
                onChangeText={(novoValor) => editarGasto(gasto.id, gasto.descricao, parseFloat(novoValor), gasto.categoria, gasto.data)}
                keyboardType="numeric"
                style={styles.inputgastos}
              />
              <Picker
                selectedValue={gasto.categoria}
                onValueChange={(novaCategoria) => editarGasto(gasto.id, gasto.descricao, gasto.valor, novaCategoria, gasto.data)}
                style={styles.inputgastos}
              >
                <Picker.Item label="Selecione a categoria" value="" />
                <Picker.Item label="Alimentação" value="Alimentação" />
                <Picker.Item label="Transporte" value="Transporte" />
                <Picker.Item label="Lazer" value="Lazer" />
                {categoriasUsuario.map((cat) => (
                  <Picker.Item key={cat.id} label={cat.nome} value={cat.nome} />
                ))}
              </Picker>
              <TextInput
                placeholder="Data (dd/mm/aaaa)"
                value={gasto.data}
                onChangeText={(novaData) => editarGasto(gasto.id, gasto.descricao, gasto.valor, gasto.categoria, novaData)}
                style={styles.inputgastos}
              />
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
    </ScrollView>
  );
};

export default TelaDeGastos;

