import { Pressable, Text, View } from 'react-native'
import React, { PureComponent, useState, useEffect } from 'react'
import { StyleSheet, Dimensions, TextInput } from "react-native";
import styles from '../app/styles'
import Svg, { Image, Ellipse, ClipPath } from 'react-native-svg'
import  Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Keyboard } from 'react-native';
import axios from 'axios';
Keyboard.dismiss();

export default function login() {
  const router = useRouter();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [userDetails, setUserDetails] = useState([])
  // const router = useRouter();
  //   const  imagePosition  = useSharedValue(1);
  //   const { height, width } = Dimensions.get("screen");
  //   const imageAnimatedStyle = useAnimatedStyle(() => {
  //       const interpolation = interpolate(imagePosition.value, [0, 1], [-height/1.5, 0])
  //       return{
  //         transform: [{translateY: withTiming(interpolation, {duration:1000})}]
  //       }
  //   })

  //   const buttonAnimatedStyle= useAnimatedStyle(() => {
  //   const interpolation = interpolate(imagePosition.value, [0,1], [250,0])
  //   return{
  //     opacity: withTiming(imagePosition.value, {duration:1000}),
  //     transform: [{translateY: withTiming(interpolation, {duration:1000})}]
  //   }
  //   })
  //   const loginHandler = () => {
  //   imagePosition.value = 0;
  // }
  //   const registerHandler = () => {
  //     imagePosition.value = 0
  //   }

  //   const closeButtonAnimatedStyle = useAnimatedStyle(() => {
  //     const interpolation = interpolate(imagePosition.value, [0,1], [0, 360])
  //     return{
  //     opacity: withTiming(imagePosition.value === 1? 0:1, {duration:800}),
  //     transform: [{rotate: withTiming(interpolation + "deg", {duration:1000})}]
  //     }
  //   })

  //   const formAnimatedStyle = useAnimatedStyle(() => {
  //     return {
  //     opacity: imagePosition.value === 0 ? withDelay(400, withTiming (1, {duration: 800})) : withTiming (0, {duration:300}),
  //     }
  //     })
    
      const Retrieval = async() => {
        try{
          let formData = new FormData();
          formData.append('email', emailInput)
          formData.append('password', passwordInput)
        const res = await axios.post('http://192.168.0.177:80/justarandomname', {
          // setTimeout: 5000,
          // headers: {
          //   'Accept': 'text/json', 
          // },
          email: emailInput,
          password: passwordInput
        })
        console.log(res.data)
        if(res.data === null){
          alert("Enter correct details and try again")
        }
        // console.log(res)
        else{
          const email = res.data.email
          const password = res.data.password
          const name = res.data.name
          const mobile = res.data.mobile
          const age = res.data.age
          const gender = res.data.gender
          const profilePicType = res.data.profilePicType
          const picBinary = res.data.profilePic
          const street = res.data.address.street
          const area = res.data.address.area
          const locality = res.data.address.locality
          const pincode = res.data.address.pincode
          setUserDetails(res.data);
          
          router.replace({
            pathname: "userDashboard",
            params : { name, email, password, mobile, age, gender, profilePicType, street, area, locality, pincode },
          });
          console.log("khkhkh")
        }
        }
        catch(error){
          console.log(error)
        }
      }
  //   return (
  //     <View style = {styles.container}>
  //       <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
  //         <Svg  height={height+100} width={width}>
  //           <ClipPath id="clipPathId">
  //             <Ellipse cx={width/2} rx={height-50} ry={height+100}/>
  //           </ClipPath>
  //           <Image href={require('../loginimage.jpg')} 
  //           width={width+100} 
  //           height={height+100}
  //           preserveAspectRatio="xMidyMid slice"
  //           clipPath="url(#clipPathId)"
  //           />
  //         </Svg>
        
  //         <Animated.View style={[styles.cBContainer, closeButtonAnimatedStyle]}>
  //           <Pressable>
  //             <Text onPress={() => imagePosition.value = 1}>X</Text>
  //           </Pressable>
  //         </Animated.View>
  //       </Animated.View>
 
    
  //     <Animated.View style={[styles.buttonContainer,{top:height/6}]}>
  //       <Animated.View style={buttonAnimatedStyle}>
  //         <Pressable style={styles.button} onPress = {loginHandler }>
  //           <Text style={styles.buttonText}>LOG IN</Text>
  //         </Pressable>
  //       </Animated.View>
  //       <Animated.View style={buttonAnimatedStyle}>
  //         <Pressable style={styles.button} onPress = {() =>{
  //           router.push("ex");
  //         }}>
  //           <Text style={styles.buttonText}>Register</Text>
  //         </Pressable>
  //       </Animated.View>
      
        
  //         <Animated.View style={[formAnimatedStyle,{top:-height/3,zIndex:-1}]}>
  //           <TextInput 
  //             placeholder='Email' 
  //             placeholderTextColor={'black'} 
  //             style={[styles.textInput, {zIndex:-1}]}
              // onChangeText={newText => setEmailInput(newText)}
              // defaultValue={emailInput}
  //           />
  //           <TextInput 
  //             placeholder='Password' 
  //             placeholderTextColor={'black'} 
  //             style={[styles.textInput, {zIndex:-1}]}
              // onChangeText={newPassword => setPasswordInput(newPassword)}
              // defaultValue={passwordInput}
  //           />
  //           <Animated.View style = {closeButtonAnimatedStyle}>
  //             <Pressable onPress = {() => {
  //                   Retrieval();
  //                   imagePosition.value = 1;
  //               }}>
  //               <Animated.View style={[styles.formButton, formAnimatedStyle]}>
  //                   <Text style={[styles.buttonText,{zIndex:-1}]}>Log in</Text>
  //               </Animated.View>
  //             </Pressable>
  //           </Animated.View>
  //         </Animated.View>
  //       </Animated.View>
  //     </View>
  const [isVisible, setIsVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isTranslate,setIsTranslate] = useState(0);
 
    const  imagePosition  = useSharedValue(1);
  
    const { height, width } = Dimensions.get("screen");
    const imageAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0, 1], [-height/1.2, 0])
        return{
          transform: [{translateY: withTiming(interpolation, {duration:1000})}]
        }
    })
    const formAnimatedStyle2 = {
      top: isFocused ? height/3: height/2.5,
      zIndex: -1,
    };
    const buttonAnimatedStyle= useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0,1], [360,0])
    return{
      opacity: withTiming(imagePosition.value, {duration:1000}),
      transform: [{translateY: withTiming(interpolation, {duration:1000})}]
    }
    })
    const loginHandler = () => {
    imagePosition.value = 0;
    setTimeout(() => {
    setIsVisible(false) }, 50);
  }
    const registerHandler = () => {
      imagePosition.value = 0
    }

    const closeButtonAnimatedStyle = useAnimatedStyle(() => {
      const interpolation = interpolate(imagePosition.value, [0,1], [0, 360])
      return{
      opacity: withTiming(imagePosition.value === 1? 0:1, {duration:800}),
      transform: [{rotate: withTiming(interpolation + "deg", {duration:1000})}]
      }
    })

    const formAnimatedStyle = useAnimatedStyle(() => {
      return {
      opacity: imagePosition.value === 0 ? withDelay(400, withTiming (1, {duration: 800})) : withTiming (0, {duration:300}),
      }
      })
      useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setIsTranslate(0)
          }
        );
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
             setIsTranslate(-70)
          }
        );
      
    
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, []);
      
  const handleScreenPress = () => {
    Keyboard.dismiss();
  };
    
    return (

      <View style = {styles.container}>
        <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
          <Svg  height={height+125} width={width}>
            <ClipPath id="clipPathId">
              <Ellipse cx={width/2} rx={height-120} ry={height+120}/>
            </ClipPath>
            <Image href={require('../download(1).jpg')} 
            style={{marginLeft:50}}
            width={width-5} 
            height={height+305}
            preserveAspectRatio="xMidyMid slice"
            clipPath="url(#clipPathId)"
            />
          </Svg>
        
          <Animated.View style={[styles.cBContainer, closeButtonAnimatedStyle]}>
            <Pressable style={{ zIndex: 1 }}>
              <Text style={{color: '#28844b'}} onPress={() => {imagePosition.value = 1;setIsVisible(true)}}>X</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>

      <View style={{ display: isVisible ?'flex':'none'}}>
      <Animated.View style={[styles.buttonContainer]}>
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable style={styles.button} onPress = {loginHandler }>
            <Text style={styles.buttonText}>LOG IN</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable style={styles.button} onPress = {() =>{
            router.push({
              pathname:"registerUser"
            });
          }}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>
        </Animated.View>
        </Animated.View>
        </View>
    <View style={[{'flex':1,display: isVisible ? 'none' : 'flex',top:height/2.5,transform: [{ translateY: isTranslate }]}]}>
            <TextInput placeholder='  Email' placeholderTextColor={'#28844b'} style={[styles.textInput, {zIndex:-1}]} onChangeText={newText => setEmailInput(newText)}
              defaultValue={emailInput}/>
            <TextInput placeholder='  Password' placeholderTextColor={'#28844b'} style={[styles.textInput, {zIndex:-1}]} onChangeText={newPassword => setPasswordInput(newPassword)}
              defaultValue={passwordInput}/>
            <Animated.View style = {closeButtonAnimatedStyle}>
              <Pressable onPress = {() => {
                    
                    Retrieval();
                    imagePosition.value = 1;
                    setIsVisible(true);
                }}>
                <Animated.View style={[styles.formButton, formAnimatedStyle]}>
                    <Text style={[styles.buttonText,{zIndex:-1,}]}>LOG IN</Text>
                </Animated.View>
              </Pressable>
              <View style={[{ flexDirection: "row" ,alignItems: 'center', justifyContent: 'center'}]}>
              <Text onPress={() => {router.push("demo");}} style={{ textAlign: "center",color: "#28844b", textDecorationLine:"underline" ,marginHorizontal:10}}>Create account</Text>
              <Text onPress={() => {router.push("/");}} style={{ textAlign: "center",color: "#28844b", textDecorationLine: "underline" }}>Forget Password?</Text>
              </View>
            </Animated.View>
          </View>
      </View>
    )
  
}