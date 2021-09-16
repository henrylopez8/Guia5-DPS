import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback,
Keyboard, Platform } from 'react-native';
import Pedido from './componentes/pedido';
import Formulario from './componentes/Formulario';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from './src/utils/colors';

const App = () => {
// definir el state de pedidos
const [pedidos, setpedidos] = useState([]);
const [mostrarform, guardarMostrarForm] = useState(false);
useEffect(() => {
const obtenerpedidosStorage = async () => {
try {
const pedidosStorage = await AsyncStorage.getItem('pedidos');
if(pedidosStorage) {
setpedidos(JSON.parse(pedidosStorage))
}
} catch (error) {
console.log(error);
}
}
obtenerpedidosStorage();
}, []);
// Elimina los pacientes del state
const eliminarpedido = id => {
const pedidosFiltradas = pedidos.filter( Pedido => Pedido.id !== id );
setpedidos( pedidosFiltradas );
guardarpedidosStorage(JSON.stringify(pedidosFiltradas));
}
// Muestra u oculta el Formulario
const mostrarFormulario = () => {
guardarMostrarForm(!mostrarform);
}
// Ocultar el teclado
const cerrarTeclado = () => {
Keyboard.dismiss();
}
// Almacenar las pedidos en storage
const guardarpedidosStorage = async (pedidosJSON) => {
try {
await AsyncStorage.setItem('pedidos', pedidosJSON);
} catch (error) {
console.log(error);
}
}
return (
<TouchableWithoutFeedback onPress={() => cerrarTeclado() }>
<View style={styles.contenedor}>
<Text style={styles.titulo}>Restaurante</Text>
<View>
<TouchableHighlight onPress={ () => mostrarFormulario() }
style={styles.btnMostrarForm}>
<Text style={styles.textoMostrarForm}> {mostrarform ? 'Cancelar Crear pedido' : 'Crear Nuevo pedido'} </Text>
</TouchableHighlight>
</View>
<View style={styles.contenido}>
{ mostrarform ? (
<>
<Text style={styles.titulo}>Ordenar</Text>
<Formulario
pedidos={pedidos}
setpedidos={setpedidos}
guardarMostrarForm={guardarMostrarForm}
guardarpedidosStorage={guardarpedidosStorage}
/>
</>
) : (
<>
<Text style={styles.titulo}> {pedidos.length > 0 ? 'Administra tus pedidos' :
'No hay pedidos, agrega uno'} </Text>
<FlatList
style={styles.listado}
data={pedidos}
renderItem={ ({item}) => <Pedido item={item}
eliminarpedido={eliminarpedido} /> }
keyExtractor={ Pedido => Pedido.id}
/>
</>
) }
</View>
</View>
</TouchableWithoutFeedback>
);
};
const styles = StyleSheet.create({
contenedor: {
backgroundColor: Colors.PRIMARY_COLOR,
flex: 1
},
titulo: {
color: '#FFF',
marginTop: Platform.OS === 'ios' ? 40 : 20 ,
marginBottom: 20,
fontSize: 24,
fontWeight: 'bold',
textAlign: 'center'
},
contenido: {
flex: 1,
marginHorizontal: '2.5%',
},
listado: {
flex: 1,
},
btnMostrarForm: {
padding: 10,
backgroundColor:Colors.BUTTON_COLOR,
marginVertical: 10
},
textoMostrarForm: {
color: '#FFF',
fontWeight: 'bold',
textAlign: 'center'
}
});
export default App;