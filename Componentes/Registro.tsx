import React, { useState } from "react";
import { View, Text, TextInput,TouchableOpacity,ImageBackground } from "react-native";
import estiloRegistro from "../Estilos/Registro.tsx";
import { Picker } from "@react-native-picker/picker";

export default function Registro() {
  const [rol, setRol] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  return (
    <ImageBackground
            source={{uri:'https://i.pinimg.com/originals/ea/0c/e5/ea0ce5c3654f59baf688c98e6e6d023f.png'}}
            resizeMode="stretch"
            style={estiloRegistro.fondo}
    >

    <View style={estiloRegistro.container}>
      <Text style={estiloRegistro.label}>Name</Text>
      <TextInput
        style={estiloRegistro.input}
        placeholder="Enter your name"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={estiloRegistro.label}>Password</Text>
      <TextInput
        style={estiloRegistro.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Text style={estiloRegistro.label}>Number Phone</Text>
      <TextInput
        style={estiloRegistro.input}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />

      <Text style={estiloRegistro.label}>Email</Text>
      <TextInput
        style={estiloRegistro.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={estiloRegistro.label}>Role</Text>
      <Picker
        selectedValue={rol}
        style={estiloRegistro.picker}
        onValueChange={(itemValue) => setRol(itemValue)}
      >
        <Picker.Item label="Usuario" value="Usuario" />
        <Picker.Item label="Admin" value="Admin" />
      </Picker>


      <TouchableOpacity style={estiloRegistro.boton} onPress={() => console.log("Registrado")}>
        <Text style={estiloRegistro.textoBoton}>Register</Text>
      </TouchableOpacity>

    </View>
    </ImageBackground>
  );
}
