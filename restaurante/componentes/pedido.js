import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
const Pedido = ({item, eliminarpedido}) => {
const dialogoEliminar = id => {
console.log('eliminando....', id);
eliminarpedido(id);
}
return (
<View style={styles.cita}>
<View>
<Text style={styles.label}>Nombre: </Text>
<Text style={styles.texto}>{item.nombre}</Text>
</View>
<View>
<Text style={styles.label}>Fecha: </Text>
<Text style={styles.texto}>{item.fecha}</Text>
</View>
<View>
<Text style={styles.label}>hora de la reserva: </Text>
<Text style={styles.texto}>{item.hora}</Text>
</View>
<View>
<Text style={styles.label}>cantidad de personas: </Text>
<Text style={styles.texto}>{item.telefono}</Text>
</View>
<View>
<Text style={styles.label}>Tipo de selección: </Text>
<Text style={styles.texto}>{item.seleccion}</Text>
</View>
<View>
<TouchableHighlight onPress={ () => dialogoEliminar(item.id) }
style={styles.btnEliminar}>
<Text style={styles.textoEliminar}> Eliminar &times; </Text>
</TouchableHighlight>
</View>
</View>
)
}
const styles = StyleSheet.create({
cita: {
backgroundColor: '#FFF',
borderBottomColor: '#e1e1e1',
borderStyle: 'solid',
borderBottomWidth: 1,
paddingVertical: 20,
paddingHorizontal: 10
},
label: {
fontWeight: 'bold',
fontSize: 18,
marginTop: 20
},
texto: {
fontSize: 18,
},
btnEliminar: {
padding: 10,
backgroundColor: 'red',
marginVertical: 10
},
textoEliminar: {
color: '#FFF',
fontWeight: 'bold',
textAlign: 'center'
}
})
export default Pedido;