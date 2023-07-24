import { Pressable, Text, View, Image } from 'react-native'
import React, { PureComponent } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '../app/styles'
import { StyleSheet, Dimensions, TextInput } from "react-native";
import { useRouter } from 'expo-router'

export default function ex (){
const router = useRouter();
    const { height, width } = Dimensions.get("screen");
    return (
    
      
    <View style={{justifyContent:'center'}}>
        
        <View style={{justifyContent:'center', textAlign:'center', height:height/4, alignItems:'center'}}>
        <View style={{flexDirection: 'row',alignSelf: 'flex-start'}}>
        <Pressable onPress={() => {router.push("login")}}>
        {/* <Image source={require('../assets/icons/left1.png')} style={{width: 50, height:50}}  /> */}
        </Pressable>
        <Text style={[styles.title, { marginLeft: 40 }]}> REGISTER </Text>
        </View>
        
        </View>
    
        <View>
        <TextInput placeholder='Name' placeholderTextColor={'black'} style={styles.textInput}/>
        <TextInput placeholder='Email' placeholderTextColor={'black'} style={styles.textInput}/>
        <TextInput placeholder='Password' placeholderTextColor={'black'} style={styles.textInput}/>
        
        <Pressable style={[styles.formButton]} onPress={() => {
            alert("Registered");
            router.push("login");
        }}><Text style={styles.buttonText}>Log in</Text></Pressable>
        </View>
    </View>
      
   
    )
}
