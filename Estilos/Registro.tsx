import { StyleSheet } from "react-native";

const estiloRegistro = StyleSheet.create({
  fondo: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    padding: 25,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.7)", // negro transparente para que se vea la imagen
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "#fff",
    fontWeight: "600",
    alignSelf: "flex-start",
    marginLeft: 5,
  },
  input: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#d1b3ff",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontFamily: "NotoSansJP",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  picker: {
    width: "100%",
    height: 50,
    borderRadius: 15,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#d1b3ff",
    marginBottom: 20,
    color: "#4a4a4a",
  },
  boton: {
    backgroundColor: "#d1b3ff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: "center",
    width: "60%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default estiloRegistro;
