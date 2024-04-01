import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, Picker } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ref, onValue } from 'firebase/database';
import { REALTIME_DB, FIREBASE_AUTH } from '../../FirebaseConfig';

const screenWidth = Dimensions.get('window').width;

const Estatísticas = () => {
  const [gastos, setGastos] = useState([]);
  const [anoSelecionado, setAnoSelecionado] = useState('');
  const [anosDisponiveis, setAnosDisponiveis] = useState([]);

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      const gastosRef = ref(REALTIME_DB, `gastos/${user.uid}`);
      onValue(gastosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const gastosArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
          setGastos(gastosArray);
  
          // Obtendo anos únicos dos dados de gastos
          const anos = [...new Set(gastosArray.map(gasto => {
            const [day, month, year] = gasto.data.split('/'); // Separar dia, mês e ano
            return parseInt(year, 10);
          }))];
          setAnosDisponiveis(anos);
  
          // Definindo o ano selecionado como o primeiro ano disponível
          if (anos.length > 0) {
            setAnoSelecionado(anos[0].toString());
          }
        } else {
          setGastos([]);
          setAnosDisponiveis([]);
          setAnoSelecionado('');
        }
      });
    }
  }, []);

  const calcularGastosPorMês = () => {
    const gastosPorMês = Array(12).fill(0);

    gastos.forEach(gasto => {
      const [day, month, year] = gasto.data.split('/'); // Separar dia, mês e ano
      const monthIndex = parseInt(month, 10) - 1; // Subtrair 1 do mês (os meses em JavaScript são baseados em zero)
      if (parseInt(year, 10) === parseInt(anoSelecionado, 10)) { // Filtrar gastos pelo ano selecionado
        gastosPorMês[monthIndex] += gasto.valor;
      }
    });

    return gastosPorMês;
  };

  const gastosPorMês = calcularGastosPorMês();

  const data = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [{
      data: gastosPorMês,
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 2,
    }]
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Estatísticas</Text>
      <LineChart
        data={data}
        width={screenWidth - 40}
        height={220}
        yAxisLabel="R$"
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        onPress={() => {}} // Adicionando onPress vazio para evitar o aviso
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      {/* Adicione o Picker com os anos disponíveis */}
      <Picker
        selectedValue={anoSelecionado}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) =>
          setAnoSelecionado(itemValue)
        }>
        {anosDisponiveis.map(ano => (
          <Picker.Item key={ano} label={ano.toString()} value={ano.toString()} />
        ))}
      </Picker>
    </View>
  );
};

export default Estatísticas;
