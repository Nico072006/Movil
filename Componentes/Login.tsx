import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../Estilos/Login"


export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su usuario"
        value={usuario}
        onChangeText={setUsuario}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.label}>Rol</Text>
      <Picker
        selectedValue={rol}
        style={styles.picker}
        onValueChange={(itemValue) => setRol(itemValue)}
      >
        <Picker.Item label="Seleccione su rol" value="" />
        <Picker.Item label="Administrador" value="admin" />
        <Picker.Item label="Usuario" value="user" />
      </Picker>

      <Text style={styles.result}>
        Usuario: {usuario} | Rol: {rol}
      </Text>
    </View>
  );
}

