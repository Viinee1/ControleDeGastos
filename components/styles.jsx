import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    },
    botões: {
        marginVertical: 4,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'green',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'roboto',
        width: 400,
        margin: 'auto',
    },
    inputgastos: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      botãogastos: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10,
        width: 400,
        margin: 'auto',
      },
      inputFiltro: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'lightblue',
        paddingHorizontal: 10,
        marginBottom: 10,
      },
      botãoExcluirGastos: {
        height: 38,
        borderColor: 'red',
        backgroundColor: 'pink',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        width: 300,
        margin: 'auto',
      },
      textoExcluir: {
        textAlign: 'center',
        padding: 6,
        fontWeight: 'bold',
      },
      textoImportante: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'green',
        fontSize: 16,
        padding: 14,
      },
      titulo:{
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 10,
      }

});

export default styles;