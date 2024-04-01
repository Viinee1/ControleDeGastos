import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList } from 'react-native';

const Categorias = () => {
  // Defina as categorias iniciais que não podem ser alteradas pelo usuário
  const categoriasIniciais = ['Alimentação', 'Transporte', 'Lazer'];
  
  // Estado para armazenar as categorias do usuário
  const [categoriasUsuario, setCategoriasUsuario] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState('');

  // Função para adicionar uma nova categoria
  const adicionarCategoria = () => {
    if (novaCategoria.trim() !== '') {
      setCategoriasUsuario([...categoriasUsuario, novaCategoria]);
      setNovaCategoria('');
    }
  };

  // Função para renderizar item de categoria
  const renderizarItemCategoria = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
      <Text>{item}</Text>
      {/* Adicione botão de edição se necessário */}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text>Categorias</Text>
      
      {/* Lista de categorias iniciais */}
      <Text>Categorias Iniciais:</Text>
      {categoriasIniciais.map((categoria, index) => (
        <Text key={index}>{categoria}</Text>
      ))}

      {/* Lista de categorias do usuário */}
      <Text>Suas Categorias:</Text>
      <FlatList
        data={categoriasUsuario}
        renderItem={renderizarItemCategoria}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Adicionar nova categoria */}
      <TextInput
        placeholder="Nova Categoria"
        value={novaCategoria}
        onChangeText={setNovaCategoria}
      />
      <Pressable onPress={adicionarCategoria}>
        <Text>Adicionar Categoria</Text>
      </Pressable>
    </View>
  );
};

export default Categorias;
