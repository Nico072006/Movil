import React, { useEffect, useState } from "react";
import { View,
        Text,
        TextInput,
        TouchableOpacity,
        FlatList,
        AppState,
        Alert} from 'react-native';
import estilos from "../Estilos/Style";
import RenderItem from "../Page/RenderItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from "react-native-push-notification";


const tasks=[
]
export interface Task{
    title:string,
    done:boolean,
    date:Date,
    id:string,
    notificationId?:number
}

export default function Tablero(){
    const [text,setText]=useState('')
    const [tasks,setTasks]=useState<Task[]>([])
    const [selecteddate,setDate]=useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)

    useEffect(()=>{
        PushNotification.configure({
            onNofiction:function(notification:any){
                console.log('NOTIFICATION:',notification)
                if(notification.data && notification.data.taskId){
                    checkAndUpdateOverdueTasks()
                }
            }
            RequestPermissions:false
        })
        PushNotification.createChannel({
        channelId:'task-reminders',
        channelName:'Reminder de Tareas',
        channelDescription:'Notificaciones programadas',
        playSound:true,
        importance:4,
        vibrate:true

    },
    (created:Boolean)=>console.log(`Canal ${created ? 'creado' : 'Ya existe'}`)
    )
    getData()
    const handleAppStateChange=(nextAppSatate:string)=>{
        if(nextAppSatate==='active'){
            checkAndUpdateOverdueTasks()
        }
    }
    const subcreption=AppState.addEventListener('change',handleAppStateChange)
    return()=>{
        subcreption?.remove()
    }
    },[])
    const checkAndUpdateOverdueTasks=async()=>{
        try{
            const value=await AsyncStorage.getItem('my-todo')
            if(value!==null){
                const storedTasks=JSON.parse(value)
                const taskWithDates=storedTasks.map((task:any)=>({
                    ...task,
                    date:new Date(task.date)
                }))
                setTasks([...taskWithDates])
            }
        }
        catch (e){
            console.log('error',e)
        }
    }
    const storeData=async (value:Task[])=>{
        try{
            await AsyncStorage.setItem('my-todo',JSON.stringify(value)
            )
        }
        catch(e){
            console.log('Error',e)
        }
    }
    const getData=async ()=>{
        try{
            const value=await AsyncStorage.getItem('my-todo')
            if(value!==null){
                const Tlocals=JSON.parse(value)
                const taskWithDates=Tlocals.map((task:any)=>({
                    ...task,
                    date:new Date(task.date)
                }))
                setTasks([...taskWithDates])
            }  
        }
        catch(e){
            console.log('Error',e)
        }
    }
    const scheduleNotification=(task:Task)=>{
        const now=new Date()
        const taskDate=task.date

        if(taskDate>now){
            const notificationId=Math.floor(Math.random()*1000000)
            PushNotification.localNotificationSchedule({
                id:notificationId,
                channelId:'task-Reminders',
                title:' ⌛ Reminder 💬',
                message:`Is time the : ${task.title}`,
                date:taskDate,
                date:{
                    taskId:task.id,
                    taskTitles:task.title,
                },
                allowWhileIdle:true,
                repeatType:undefined
            })
            return notificationId
        }

        
    }
    const calcelNotification=(notificationId:number)=>{
        PushNotification.calcelNotification({id:notificationId.toString})
    } 
    const generateTaskId=()=>{
        return Date.now().toString(+Math.random().toString(36).substr(2,9))
    } 
    const onDateChange=(event:any,date ?: Date)=>{
        setShowDatePicker(false)
        if(event.type==='set' && date){
            setDate(date)
            setShowTimePicker(true)
        }
    }
    const onTimeChange=(event:any,time ?: Date)=>{
        setShowTimePicker(false)
        if(event.type==='set' && time){
            const newDate=new Date(selecteddate)
            newDate.setHours(time.getHours())
            newDate.setMinutes(time.getMinutes())
            setDate(newDate)
        }
    }
    const addTask=()=>{
        if(text.trim()===''){
            Alert.alert('The task cannot be empty.')
        }
        const tmp=[...tasks]
        const taskId=generateTaskId()
        const newTasks:Task={
            id:taskId,
            title:text.trim(),
            done:false,
            date:selecteddate
        }
        const notificationId=scheduleNotification(newTasks)
        if(notificationId){
            newTasks.notificationId=notificationId

        }
        tmp.push(newTasks)
        setTasks(tmp)
        storeData(tmp)
        setText('')
        setDate(new Date())

        if(notificationId){
            Alert.alert(
                'Scheduled task',
                ` The Task ${newTasks.title}, is scheduled for the ${formatDate(selecteddate)}`
            )
        }

    }
    const markDone=(task:Task)=>{
        const tmp=[...tasks]
        const index=tmp.findIndex(el=>el.title===task.title)
        if(index!==-1){
            tmp[index].done=!tmp[index].done
            if(tmp[index].done && tmp[index].notificationId){
                calcelNotification(tmp[index].notificationId)
            }
            else if(!tmp[index].done){
                const notificationId=scheduleNotification(tmp[index])
                if(notificationId){
                    tmp[index].notificationId=notificationId
                }
            }
        }
        const todo=tmp[index]
        todo.done=!todo.done
        setTasks(tmp)
        storeData(tmp)
    }
    const deleteFuntion=(task:Task)=>{
        Alert.alert(
            'Confirmas la eliminacion',
            '¿Seguro que desea eliminar?',
            [
                {text:'Cancelar',style:'cancel'},
                    {
                        text:'Eliminar',
                        style:'destructive',
                        onPress:()=>{
                            const tmp=[...tasks]
                            const index=tmp.findIndex(el=>el.id===el.id)
                            if(index !==-1){
                                if(task.notificationId){
                                    calcelNotification(task.notificationId)
                                }
                            }
                            tmp.splice(index,1)
                            setTasks(tmp)
                            storeData(tmp)
                        }
                    }
                
                
            ]
        )
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
                    value={selecteddate}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}

            {showTimePicker && (
                <DateTimePicker
                    value={selecteddate}
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