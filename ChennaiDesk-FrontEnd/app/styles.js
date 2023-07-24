import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";
const { width, height }=Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",
    },
    button:{
      backgroundColor: '#a8cf45',
      height:55,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:35,
      marginHorizontal:20,
      marginVertical:10,
      borderWidth:1,
      borderColor:'white',

    },
    buttonText:{
      fontSize: 20,
      fontWeight:'600',
      color:'#28844b',
      letterSpacing:0.5,
      justifyContent:"center",
      textAlign:'center',
    },
    buttonContainer:{
      justifyContent:'center',
      height:height/3,
    },
    textInput:{
      height:height/18,
      borderColor:'#28844b',
      borderWidth:1,
      marginHorizontal:20,
      marginVertical:10,
      borderRadius:20,
      paddingLeft:20
    },
    formButton:{
      backgroundColor: '#a8cf45',
      height:55,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:35,
      marginHorizontal:20,
      marginVertical:20,
      borderWidth:1,
      borderColor:'white',
      shadowColor: "#000",
      shadowOffset: {
      width: 7,
      height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    formInputContainer:{
      ...StyleSheet.absoluteFill,
      justifyContent:'center',
      zIndex:-1,
    },
    cBContainer:{
      height:40,
      width:40,
      alignItems:'center',
      justifyContent:'center',
      alignSelf:'center',
      backgroundColor:'#a8cf45',
      borderRadius:20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      top:-20,
    },
    regtextInput:{
      height:height/18,
      width:3*width/4,
      borderColor:'black',
      borderWidth:1,
      marginHorizontal:20,
      marginVertical:10,
      borderRadius:20,
      paddingLeft:10,
    },
    title: {
      fontSize: 44,
      color: "#000",
    },
  });
export default styles;