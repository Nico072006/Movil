import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground, 
  Alert, 
  StyleSheet 
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("usuario");

  const handleRegistro = async () => {

    if (!nombre || !email || !password || !rol) {
      Alert.alert("Error", "Por favor complete todos los campos");
      return;
    }

    try {
      const response = await fetch("http://10.0.2.2:5000/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password, rol }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Éxito", `Usuario registrado: ${data.user.Nombre}`);

        // limpiar campos
        setNombre("");
        setEmail("");
        setPassword("");
        setRol("usuario");

      } else {
        Alert.alert("Error", data.error || "Ocurrió un problema");
      }

    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Error", "No se pudo conectar al servidor");
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/originals/ea/0c/e5/ea0ce5c3654f59baf688c98e6e6d023f.png",
      }}
      resizeMode="stretch"
      style={styles.background}
    >
      <View style={styles.container}>

        <Text style={styles.titulo}>Registro</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su correo"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Rol</Text>

        <View style={styles.pickerContainer}>
          <Picker selectedValue={rol} onValueChange={setRol} style={styles.picker}>
            <Picker.Item label="Usuario" value="usuario" />
            <Picker.Item label="Administrador" value="admin" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.boton} onPress={handleRegistro}>
          <Text style={styles.botonTexto}>Registrar</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "white",
  },

  label: {
    color: "white",
    fontSize: 18,
    marginBottom: 5,
  },

  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },

  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },

  picker: {
    height: 50,
  },

  boton: {
    backgroundColor: "#0096FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  botonTexto: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
