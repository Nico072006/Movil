import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Validar campos
    if (!email || !password) {
      Alert.alert("Error", "Por favor complete todos los campos");
      return;
    }

    try {
      // Llamada al backend local
      const response = await fetch("http://10.0.2.2:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login exitoso
        Alert.alert("Éxito", `Bienvenido, ${data.user?.nombre || data.user?.Usuario}`);
        setEmail(""); 
        setPassword("");
      } else {
        // Error de credenciales
        Alert.alert("Error", data.error || "Credenciales incorrectas");
      }
    } catch (error) {
      console.log("Error al conectar al servidor:", error);
      Alert.alert("Error", "No se pudo conectar al servidor");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Correo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su correo"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.boton} onPress={handleLogin}>
        <Text style={styles.textoBoton}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos básicos si no tienes tu archivo de estilos
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 15 },
  boton: { backgroundColor: "#FF7F7F", padding: 15, borderRadius: 5, alignItems: "center" },
  textoBoton: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});