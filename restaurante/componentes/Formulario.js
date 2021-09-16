import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';
import shortid from 'shortid';
import colors from '../src/utils/colors';
const Formulario = ({pedidos, setpedidos, guardarMostrarForm, guardarpedidosStorage}) => {
//variables para el formulario
const [nombre , guardarnombre] = useState('');
const [seleccion, guardarseleccion] = useState('');
const [telefono, guardarTelefono] = useState('');
const [fecha, guardarFecha] = useState('');
const [hora, guardarHora] = useState('');
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
const showDatePicker = () => {
setDatePickerVisibility(true);
};
const hideDatePicker = () => {
setDatePickerVisibility(false);
};
const confirmarFecha = date => {
const opciones = { year: 'numeric', month: 'long', day: "2-digit" };
guardarFecha(date.toLocaleDateString('es-ES', opciones));
hideDatePicker();
};
// Muestra u oculta el Time Picker
const showTimePicker = () => {
setTimePickerVisibility(true);
};
const hideTimePicker = () => {
setTimePickerVisibility(false);
};
const confirmarHora = hora => {
const opciones = { hour: 'numeric', minute: '2-digit', hour12: false};
guardarHora(hora.toLocaleString('es-ES', opciones));
hideTimePicker();
};
// Crear nueva pedido
const crearNuevapedido = () => {
// Validar
if(nombre.trim() === '' ||
seleccion.trim() === '' ||
telefono.trim() === '' ||
fecha.trim() === '' ||
hora.trim() === '' )
{
// Falla la validación
mostrarAlerta();
return;
}
// Crear una nueva pedido
const pedido = { nombre, seleccion, telefono, fecha, hora };
pedido.id = shortid.generate();
// console.log(pedido);
// Agregar al state
const pedidosNuevo = [...pedidos, pedido];
setpedidos(pedidosNuevo);
// Pasar las nuevas pedidos a storage
guardarpedidosStorage(JSON.stringify(pedidosNuevo));
// Ocultar el formulario
guardarMostrarForm(false);
// Resetear el formulario

guardarseleccion('');
guardarnombre('');
guardarHora('');
guardarFecha('');
guardarTelefono('');
}
// Muestra la alerta si falla la validación
const mostrarAlerta = () => {
Alert.alert(
'Error', // Titulo
'Todos los campos son obligatorios', // mensaje
[{
text: 'OK' // Arreglo de botones
}]
)
}
return (
<>
<ScrollView style={styles.formulario}>
<View>
<Text style={styles.label}>Nombre:</Text>
<TextInput
style={styles.input}
onChangeText={ texto => guardarnombre(texto) }
/>
</View>
<View>
<Text style={styles.label}>Fecha:</Text>
<Button title="Seleccionar Fecha" onPress={showDatePicker} />
<DateTimePickerModal
isVisible={isDatePickerVisible}
mode="date"
onConfirm={confirmarFecha}
onCancel={hideDatePicker}
locale='es_ES'
headerTextIOS="Elige la fecha"
cancelTextIOS="Cancelar"
confirmTextIOS="Confirmar"
/>
<Text>{fecha}</Text>
</View>
<View>
<Text style={styles.label}>Hora:</Text>
<Button title="Seleccionar Hora" onPress={showTimePicker} />
<DateTimePickerModal
isVisible={isTimePickerVisible}
mode="time"
onConfirm={confirmarHora}
onCancel={hideTimePicker}
locale='es_ES'
headerTextIOS="Elige una Hora"
cancelTextIOS="Cancelar"
confirmTextIOS="Confirmar"
/>
<Text>{hora}</Text>
</View>
<View>
<Text style={styles.label}>Cantidad de personas:</Text>
<TextInput
style={styles.input}
onChangeText={ texto => guardarTelefono(texto) }
keyboardType='numeric'
/>
</View>

<View>
<Text style={styles.label}>Tipo de selección donde desea comer:</Text>
<RNPickerSelect
 style={styles.picker}
onValueChange={ texto => guardarseleccion(texto)}
items = { [ 
    {  label : 'Fumadores' ,  value : 'Fumadores'  } , 
    {  label : 'No fumadores ' ,  value : ' No fumadores '  } , 
] } 
//placeholder={seleccion}


/>
<Text>{seleccion}</Text>

</View>
<View>
<TouchableHighlight onPress={ () => crearNuevapedido() }
style={styles.btnSubmit}>
<Text style={styles.textoSubmit}>Crear Nueva pedido</Text>
</TouchableHighlight>
</View>
</ScrollView>
</>
);
}
const styles = StyleSheet.create({
formulario: {
backgroundColor: '#FFF',
paddingHorizontal: 20,
paddingVertical: 10,
flex: 1
},
label: {
fontWeight: 'bold',
fontSize: 18,
marginTop: 20
},
input: {
marginTop: 10,
height: 50,
borderColor: '#e1e1e1',
borderWidth: 1,
borderStyle: 'solid'
},
picker: {
    marginTop: 30,
    height: 70,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid'
    },
btnSubmit: {
padding: 10,
backgroundColor:colors.BUTTON_COLOR,
marginVertical: 10
},
textoSubmit: {
color: '#FFF',
fontWeight: 'bold',
textAlign: 'center'
}
})
export default Formulario;