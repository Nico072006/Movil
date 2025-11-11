import React, { useEffect, useState } from "react";
import { View,
        Text,
        TextInput,
        TouchableOpacity,
        FlatList} from 'react-native';
import estilos from "../Estilos/Style";
import RenderItem from "../Page/RenderItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';


const tasks=[
]
export interface Task{
    title:string,
    done:boolean,
    date:Date
}

export default function Tablero(){
    const [text,setText]=useState('')
    const [tasks,setTasks]=useState<Task[]>([])
    const [date,setDate]=useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)

    const storeData=async (value:Task[])=>{
        try{
            await AsyncStorage.setItem('my-todo',
                JSON.stringify(value)
            )
        }
        catch(e){
        }
    }
    const getData=async ()=>{
        try{
            const value=await AsyncStorage.getItem('my-todo')
            if(value!=null){
                const tasksLocal=JSON.parse(value).map((task:Task)=>({...tasks,
                    date:new Date(task.date)
                }))
                setTasks(tasksLocal)
            }
        }
        catch(e){
        }
    }
    useEffect(()=>{
        getData()
    },[])
    const onDateChange=(event:any,selectedDate ?: Date)=>{
        setShowDatePicker(false)
        if(event.type==='set' && selectedDate){
            setDate(selectedDate)
            setShowTimePicker(true)
        }
    }
    const onTimeChange=(event:any,selectedTime ?: Date)=>{
        setShowTimePicker(false)
        if(event.type==='set' && selectedTime){
            const newDate=new Date(date)
            newDate.setHours(selectedTime.getHours())
            newDate.setMinutes(selectedTime.getMinutes())
            setDate(newDate)
        }
    }
    const addTask=()=>{
        const tmp=[...tasks]
        const newTasks={
            title:text,
            done:false,
            date:date
        }
        tmp.push(newTasks)
        setTasks(tmp)
        storeData(tmp)
        setText('')
        setDate(new Date())
    }
    const markDone=(task:Task)=>{
        const tmp=[...tasks]
        const index=tmp.findIndex(el=>el.title===task.title)
        const todo=tmp[index]
        todo.done=!todo.done
        setTasks(tmp)
        storeData(tmp)
    }
    const deleteFuntion=(task:Task)=>{
        const tmp=[...tasks]
        const index=tmp.findIndex(el=>el.title===task.title)
        tmp.splice(index,1)
        setTasks(tmp)
        storeData(tmp)
    }
    const formatDate=(date:Date)=>{
        return date.toLocaleDateString('es-ES',{
            day:'2-digit',
            month:'2-digit',
            year:'numeric',
            hour:'2-digit',
            minute:'2-digit'
        })
    }
    return(
        <View style={estilos.container}>
            <Text style={estilos.title}>Hola care bolas</Text>
            <View style={estilos.inputcontainer}>
                <TextInput 
                placeholder="Escriba" 
                style={estilos.textinput}
                value={text}
                onChangeText={(t:string)=>setText(t)}/>
                <View 
                style={estilos.ContenedorBoton}>
                    <TouchableOpacity
                    onPress={()=>setShowDatePicker(true)}
                    style={estilos.boton}
                    >
                    <Text>📅</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={addTask}
                    style={estilos.boton}>
                    <Text>Agregar</Text>
                    </TouchableOpacity>
                </View>
                
            </View>

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}

            {showTimePicker && (
                <DateTimePicker
                    value={date}
                    mode="time"
                    display="default"
                    onChange={onTimeChange}
                />
            )}

            <View>
                <FlatList
                    renderItem={({item})=>
                    <RenderItem
                    item={item}
                    markDone={markDone}
                    deleteFuntion={deleteFuntion}
                    />
                    }
                    data={tasks}
                    keyExtractor={(item,index)=>`${item.title}-${index}`}
                />
            </View>
        </View>
    )
}