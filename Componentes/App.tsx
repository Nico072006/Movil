import React from "react"
import Inicio from "./Login"
import Registro from "./Registro"
import Tablero from "./Tablero"
import AsyncStorage from "@react-native-async-storage/async-storage"
/*import { create } from "react-native/types_generated/Libraries/ReactNative/ReactFabricPublicInstance/ReactNativeAttributePayload"*/
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {NavigationContainer} from "@react-navigation/native"

import 'react-native-gesture-handler';

export type RootStackParamList={
    Inicio:undefined,
    Tablero:undefined,
    Registro:undefined,
}
const Stack=createNativeStackNavigator<RootStackParamList>()
export default function App(){

    return(
        <NavigationContainer>
            <Stack.Navigator
            initialRouteName="Registro"
            >
                <Stack.Screen
                name="Tablero"
                component={Tablero}
                />
                <Stack.Screen
                name="Inicio"
                component={Inicio}
                />
                <Stack.Screen
                name="Registro"
                component={Registro}
                />

            </Stack.Navigator>

        </NavigationContainer>
    )
}