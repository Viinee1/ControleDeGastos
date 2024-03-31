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
        height: 30,
        borderWidth: 1,
        borderRadius: 2,
        padding: 5,
        backgroundColor: 'green',
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
      },

});

export default styles;