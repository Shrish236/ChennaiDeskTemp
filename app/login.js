import { Pressable, Text, View } from 'react-native'
import React, { PureComponent } from 'react'
import { StyleSheet, Dimensions, TextInput } from "react-native";
import styles from '../app/styles'
import Svg, { Image, Ellipse, ClipPath } from 'react-native-svg'
import  Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Keyboard } from 'react-native';
Keyboard.dismiss();
export default function login() {
  
  const router = useRouter();
    const  imagePosition  = useSharedValue(1);
    const { height, width } = Dimensions.get("screen");
    const imageAnimatedStyle = useAnimatedStyle(() => {
        const interpolation = interpolate(imagePosition.value, [0, 1], [-height/1.5, 0])
        return{
          transform: [{translateY: withTiming(interpolation, {duration:1000})}]
        }
    })

    const buttonAnimatedStyle= useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0,1], [250,0])
    return{
      opacity: withTiming(imagePosition.value, {duration:1000}),
      transform: [{translateY: withTiming(interpolation, {duration:1000})}]
    }
    })
    const loginHandler = () => {
    imagePosition.value = 0;
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
    
    return (
      <View style = {styles.container}>
        <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
          <Svg  height={height+100} width={width}>
            <ClipPath id="clipPathId">
              <Ellipse cx={width/2} rx={height-50} ry={height+100}/>
            </ClipPath>
            <Image href={require('../loginimage.jpg')} 
            width={width+100} 
            height={height+100}
            preserveAspectRatio="xMidyMid slice"
            clipPath="url(#clipPathId)"
            />
          </Svg>
        
          <Animated.View style={[styles.cBContainer, closeButtonAnimatedStyle]}>
            <Pressable>
              <Text onPress={() => imagePosition.value = 1}>X</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
 
    
      <Animated.View style={[styles.buttonContainer,{top:height/6}]}>
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable style={styles.button} onPress = {loginHandler }>
            <Text style={styles.buttonText}>LOG IN</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable style={styles.button} onPress = {() =>{
            router.push("ex");
          }}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        </Animated.View>
      
        
          <Animated.View style={[formAnimatedStyle,{top:-height/3,zIndex:-1}]}>
            <TextInput placeholder='Email' placeholderTextColor={'black'} style={[styles.textInput, {zIndex:-1}]}/>
            <TextInput placeholder='Password' placeholderTextColor={'black'} style={[styles.textInput, {zIndex:-1}]}/>
            <Animated.View style = {closeButtonAnimatedStyle}>
              <Pressable onPress = {() => {
                    
                    router.push("userDashboard");
                    imagePosition.value = 1;
                }}>
                <Animated.View style={[styles.formButton, formAnimatedStyle]}>
                    <Text style={[styles.buttonText,{zIndex:-1}]}>Log in</Text>
                </Animated.View>
              </Pressable>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </View>
 
    )
  
}