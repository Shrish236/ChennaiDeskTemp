import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";
import styles from '../app/styles'
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import axios from "axios";
export default function Page() {
  global.myEmail = '';
  global.myPass = '';
  // const [emailInput, setEmailInput] = useState('');
  // const [passwordInput, setPasswordInput] = useState('');
  const router = useRouter();
  // const baseUrl = 'http://192.168.56.1:5000';
  // const [email, setEmail] = useState([])
  // let temp = 0;
  // useEffect (() => {
  //       axios.post('http://192.168.56.1:5000/member', {
  //         email: 'jack123@gmail.com',
  //         password: 'Test@234'
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       })
  //       .then(function(response) {
  //         console.log(response.data)
  //         if(response.data === null){
  //           console.log("sddssd")
  //         }
  //         else{
  //           setEmail(response.data)
  //         }
  //       })
  // }, [])
  
  // useEffect (() => {
  //   const Retrieval = async() => {
  //     const res = await axios.post('http://192.168.56.1:5000/member',{
  //         email: 'jack123@gmail.com',
  //         password: 'Test@234'
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  //     console.log(res.data)
  //     if(res.data === null){
  //       console.log("sddssd")
  //     }
  //     else{
  //       setEmail(res.data)
  //     }
  //   }
  //   Retrieval();
  // }, [])

  // const Retrieval = async() => {
  //   const res = await axios.post('http://192.168.56.1:5000/member',{
  //     email: emailInput,
  //     password: passwordInput
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  //   console.log(res.data)
  //   if(res.data === null){
  //     console.log("sddssd")
  //     alert("Enter correct details and try again")
  //   }
  //   else{
  //     router.push("userDashboard");
  //   }
  // }
  

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <View>
        <Text></Text>
        <Text
          onPress={() => {
          router.push("login");
        }}
        >Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
        {/* <TextInput 
          placeholder='Email' 
          placeholderTextColor={'black'} 
          style={[styles.textInput, {zIndex:-1}]}
          onChangeText={newText => setEmailInput(newText)}
          defaultValue={emailInput}
        />
        <TextInput 
          placeholder='Password' 
          placeholderTextColor={'black'} 
          style={[styles.textInput, {zIndex:-1}]}
          onChangeText={newPassword => setPasswordInput(newPassword)}
          defaultValue={passwordInput}
        />
        <Pressable onPress={() => {
          Retrieval();
        }}>
          <View style={[styles.formButton]}>
            <Text style={[styles.buttonText,{zIndex:-1}]}>Log in</Text>
          </View>
        </Pressable> */}
      </View>
    </View>
    </SafeAreaView>
  );
}


