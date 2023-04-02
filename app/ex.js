import { Pressable, Text, View } from 'react-native'
import React, { PureComponent } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Svg, { Image } from 'react-native-svg'
import styles from '../app/styles'
import { StyleSheet, Dimensions, TextInput } from "react-native";
import { useRouter } from 'expo-router'

export default function ex (){
const router = useRouter();
    const { height, width } = Dimensions.get("screen");
    return (
    
      
    <View style={{justifyContent:'center'}}>
        
        <View style={StyleSheet.absoluteFill}>
        <Svg  height={height} width={width}>
          <Image href={require('../regimae.png')} 
          width={width} 
          height={height}
          />
        </Svg>
        </View>
        <View style={{justifyContent:'center', textAlign:'center', height:height/4, alignItems:'center'}}>
            <Text style={styles.title}> REGISTER </Text>
        </View>
        
        <View>
        <TextInput placeholder='Name' placeholderTextColor={'black'} style={styles.textInput}/>
        <TextInput placeholder='Email' placeholderTextColor={'black'} style={styles.textInput}/>
        <TextInput placeholder='Password' placeholderTextColor={'black'} style={styles.textInput}/>
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