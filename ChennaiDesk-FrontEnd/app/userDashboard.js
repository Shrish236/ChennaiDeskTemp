import { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Button, Dimensions, ActivityIndicator, PermissionsAndroid } from 'react-native';
import { Stack, useRouter, useNavigation, useLocalSearchParams } from 'expo-router';
import { COLORS, icons, images, SIZES } from '../constants'
import { complaintTypes, complaintTitles, data, Areas, Streets, anonYesNo } from '../components'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Textarea from 'react-native-textarea';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
// import LikeButton from 'react-native-like-button';
import { Provider, LikeButton } from "@lyket/react";
import {
Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome, LoginScreen }
from '../components'
import axios from 'axios';
import styles from '../app/welcome.style.js'
import {
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable
} from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import { BlurView } from "@react-native-community/blur";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import {createAppContainer } from "react-navigation";
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer";
import {createStackNavigator} from "react-navigation-stack";
import { Container, Content, Header, Body } from "native-base";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Keyboard, Platform} from 'react-native';
//const jobTypes = ["Full-time", "Part-time", "Contractor"];
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import CustomSidebarMenu from '../app/CustomSidebarMenu';
const Drawer = createDrawerNavigator();
const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);
function Home() {
  const[retrieve, setRetrieve] = useState(true)
  const isFocused = useIsFocused();
  const { width, height }=Dimensions.get('window')
  // const [activeJobType, setActiveJobType] = useState("Full-time");
  const router = useRouter();
  const params = useLocalSearchParams();
  const details = params;
  const [userDetails, setUserDetails] = useState([])
  const [complaintDetails, setComplaintDetails] = useState([])
  const [complaintDistanceDetails, setComplaintDistanceDetails] = useState([])
  const [complaintDetails2, setUserComplaints] = useState([])
  const [myName, setMyName] = useState('')
  const [profileReload, setProfileReload] = useState(false)
  // const [isLoading1, setLoading1] = useState(false);
  // const [isLoading2, setLoading2] = useState(true);
  useEffect(() => {
    //   axios.post('http://192.168.56.1:5000/user',{
    //     email: myEmail,
    //     password: myPass
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
    //   .then(function (response){
    //   console.log("Hoe")
    //   if(response.data === null){
    //     console.log("Server Error")
    //     alert("Server Error Please try again")
    //     router.replace({
    //       pathname: "login"
    //     })
    //   }
    //   else{
    //     setUserDetails(response.data)
    //     // console.log(typeof(userDetails.name))
    //     setMyName(response.data.name)
    //     Retrieval();
    //   }
    // })
    console.log(details.email)
    // userFunc();
    setMyName(details.name)
    Retrieval1();
    Retrieval3();
    userComplaintsRegistered();
    
  },[])
  const userComplaintsRegistered = async() =>{
    axios.post('http://192.168.0.177:80/userRegisteredComplaints',{
        email: details.email,
        name: details.name
        // email: "ram123@gmail.com",
        // name: "Ram"
      })
      .then(function(response){
        console.log("Complaint")
        if(response.data === null){
          console.log("sddssd")
          alert("Enter correct details and try again")
        }
        else{
          //console.log(response.data)
          // router.push({
          //   pathname: "userDashboard",
          // });
          setUserComplaints(response.data)
          setRetrieve(false)
          // userFunc();
          // setLoading2(false);
        }
      })
      .catch((error) => {
        console.log("jgjhgjh")
        console.log(error)
      })
      
  }
  const Retrieval1 = async() =>{
    axios.post('http://192.168.0.177:80/complaints',{
        // email: details.email,
        // name: details.name
        email: "ram123@gmail.com",
        name: "Ram"
      })
      .then(function(response){
        console.log("Complaint")
        if(response.data === null){
          console.log("sddssd")
          alert("Enter correct details and try again")
        }
        else{
          //console.log(response.data)
          // router.push({
          //   pathname: "userDashboard",
          // });
          setComplaintDetails(response.data)
          // userFunc();
          // setLoading2(false);
        }
      })
      .catch((error) => {
        console.log("jgjhgjh")
        console.log(error)
      })
      
  }
  const Retrieval3 = async() =>{
    axios.post('http://192.168.0.177:80/complaintsByDistance',{
        email: details.email,
        name: details.name
        // email: "ram123@gmail.com",
        // name: "Ram"
      })
      .then(function(response){
        console.log("Complaint")
        if(response.data === null){
          console.log("sddssd")
          alert("Enter correct details and try again")
        }
        else{
          console.log(response.data)
          // router.push({
          //   pathname: "userDashboard",
          // });
          setComplaintDistanceDetails(response.data)
          // userFunc();
          // setLoading2(false);
        }
      })
      .catch((error) => {
        console.log("jgjhgjh")
        console.log(error)
      })
      
  }
  
  const userFunc = async() =>{
    let formData = new FormData();
    formData.append('email', details.email)
    formData.append('password', details.password)
  axios.post('http://192.168.0.177:80/justarandomname', formData, {
    headers: {
      'Accept': 'application/json',
     'Content-Type': 'multipart/form-data' 
   },
  }).then(function (response){
    console.log("Hoe")
    if(response.data === null){
      console.log("Server Error")
      alert("Server Error Please try again")
      router.replace({
        pathname: "login"
      })
    }
    else{
      setUserDetails(response.data)
      // console.log(typeof(userDetails.name))
      setMyName(response.data.name)
    }
  }).catch((error) => {
    console.log(error)
  })
}

    // const Retrieval = async() => {
    //   const res = await axios.post('http://192.168.56.1:5000/complaints',{
    //     email: myEmail,
    //     name: myName
    //   })
    //   .catch((error) => {
    //     console.log("jgjhgjh")
    //     console.log(error)
    //   })
    //   console.log("Complaint")
    //   if(res.data === null){
    //     console.log("sddssd")
    //     alert("Enter correct details and try again")
    //   }
    //   else{
    //     console.log(res.data)
    //     router.push({
    //       pathname: "userDashboard",
    //     });
    //     setComplaintDetails(res.data)
    //     // setLoading2(false);
    //   }
    // }
    
    function HomeScreen({ navigation }) {
      const data_order = [
        { label: 'Likes', value: 'likes' },
        { label: 'Closeness', value: 'distance' }
      ]
      const [value, setValue] = useState('likes');
      const [liked, setLiked] = useState(false);
      const [isFocus, setIsFocus] = useState(false);
      const [displayOrder, setDisplayOrder] = useState(false);
      const [calc, isCalc] = useState(0)
      if(complaintDetails.length == 0){
        return (
            <SafeAreaView>
            <View style={{marginTop:10, justifyContent:"center", alignItems:"center"}}>
                <ActivityIndicator size="large">{}</ActivityIndicator>
            </View>
            </SafeAreaView>
        );
    }
      if(value == 'likes'){
      return(
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightwhite }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flex: 1,
                  padding: SIZES.medium,
                }}
              >
                <View>
                  <View style={styles.container}>
                    <Text style={styles.welcomeMessage}>{details.name}</Text>
                    <Text style={styles.welcomeMessage}>Welcome Back!</Text>
                    <View style={{marginTop:12,flexDirection: 'row'}}>
                      <View style={{marginTop:11,backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center'}} />
                      <Text style={[styles.userName,{marginTop:10, alignSelf:'center', paddingHorizontal:5, fontSize: 20 }]}>Registered Complaints</Text>
                      <View style={{marginTop:11,backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center'}} />
                    </View>
                    <View style={{marginTop:10, flexDirection:'row'}}>
                    <Text style={{marginTop:10, textAlign:"left", paddingHorizontal:5, fontSize: 20, fontStyle:'italic' }}>Sort by: </Text>
                      <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'blue' }, {marginTop:3,width:width/3.5}]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={data_order}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder={!isFocus ? 'Sort By' : '...'}
                      searchPlaceholder="Search..."
                      value={value}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        if(displayOrder){
                          setDisplayOrder(false)
                        }
                        else{
                          setDisplayOrder(true)
                        }
                        setValue(item.value);
                        
                        setIsFocus(false);
                      }}
                      // renderLeftIcon={() => (
                      //   <AntDesign
                      //     style={styles.icon}
                      //     color={isFocus ? 'blue' : 'black'}
                      //     name="Safety"
                      //     size={20}
                      //   />
                      // )}
                    />
                    </View>
                  </View>
                  <View style={{ height: 5 }}></View>
                  <View style={styles.tabsContainer}>
                    <FlatList
                      data={complaintDetails}
                      renderItem={({ item }) => (
                        
                        <Card style={{
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 3,
                          },
                          shadowOpacity: 0.29,
                          shadowRadius: 4.65,

                          elevation: 7,
                        }}>
                          
                          <CardImage
                            source={{ uri: "data:"+item.complaint_proof.imageType+";base64,"+item.complaint_proof.complaintImageBinary }}
                            title=""
                            style={{ opacity: 1 }} />

                          <CardTitle
                            title={item.complaint_title}
                            subtitle={item.complaint_address.complaint_street + ", " + item.complaint_address.complaint_area} 
                            // avatarSource='https://picsum.photos/200'
                            titleStyle={{fontWeight:"bold", color:"#0c5930"}} 
                            subtitleStyle={{fontWeight:"400", color:"#072342", fontSize:16}} 
                          />
                          {/* {console.log(complaintDetails.complaint_title)} */}
                         
                          <CardContent style={{marginTop:10}}> 
                          
                            <Text style={{fontWeight:"400", fontSize:18, textAlign:"left", paddingRight:4}}>{item.complaint_description}</Text>
                          </CardContent>
                          <CardAction
                            separator={true}
                            inColumn={false}>
                            <CardButton
                              onPress={() => { } }
                            >
                              <View>
                              <Pressable onPress={() => {
                                if(item.isLiked){
                                item.likes=item.likes-1
                                item.isLiked = false
                                console.log("Unliked")
                                
                                }
                                else{
                                  item.likes=item.likes+1
                                  item.isLiked = true
                                  console.log("liked")
                                  // setLiked((isLiked) => !isLiked)
                                }
                                setLiked((isLiked) => !isLiked)
                                
                              }}>
                                <MaterialCommunityIcons
                                  name={liked && item.isLiked? "heart" : "heart-outline"}
                                  size={32}
                                  color={liked && item.isLiked? "red" : "black"}
                                />
                              </Pressable>
                              </View>
                              
                             
                              </CardButton>
                              <Text>{item.likes}</Text>
                            <CardButton
                              style={{}}
                              onPress={() => { 
                                let x = item._id.$oid
                                router.push({
                                  pathname: "viewComplaint",
                                  params: { x }
                                })
                              }}
                              title="View"
                              color="blue" />
                          </CardAction>

                        </Card>
                      )}
                      keyExtractor={item => item._id.$oid}
                      contentContainerStyle={{ columnGap: SIZES.large, rowGap: SIZES.large }}
                      vertical />
                  </View>
                </View>



              </View>
            </ScrollView>
          </SafeAreaView>
      );
      }
      if(value == 'distance'){
        return(
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightwhite }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View
                    style={{
                      flex: 1,
                      padding: SIZES.medium,
                    }}
                  >
                    <View>
                      <View style={styles.container}>
                        <Text style={styles.welcomeMessage}>{details.name}</Text>
                        <Text style={styles.welcomeMessage}>Welcome Back!</Text>
                        <View style={{marginTop:12,flexDirection: 'row'}}>
                          <View style={{marginTop:11,backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center'}} />
                          <Text style={[styles.userName,{marginTop:10, alignSelf:'center', paddingHorizontal:5, fontSize: 20 }]}>Registered Complaints</Text>
                          <View style={{marginTop:11,backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center'}} />
                        </View>
                        <View style={{marginTop:10, flexDirection:'row'}}>
                        <Text style={{marginTop:10, textAlign:"left", paddingHorizontal:5, fontSize: 20, fontStyle:'italic' }}>Sort by: </Text>
                          <Dropdown
                          style={[styles.dropdown, isFocus && { borderColor: 'blue' }, {marginTop:3,width:width/3.5}]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={data_order}
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder={!isFocus ? 'Sort By' : '...'}
                          searchPlaceholder="Search..."
                          value={value}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={item => {
                            if(displayOrder){
                              setDisplayOrder(false)
                            }
                            else{
                              setDisplayOrder(true)
                            }
                            setValue(item.value);
                            setIsFocus(false);
                          }}
                          // renderLeftIcon={() => (
                          //   <AntDesign
                          //     style={styles.icon}
                          //     color={isFocus ? 'blue' : 'black'}
                          //     name="Safety"
                          //     size={20}
                          //   />
                          // )}
                        />
                        </View>
                      </View>
                      <View style={{ height: 5 }}></View>
                      <View style={styles.tabsContainer}>
                        <FlatList
                          data={complaintDistanceDetails}
                          renderItem={({ item }) => (
                            
                            <Card style={{
                              shadowColor: "#000",
                              shadowOffset: {
                                width: 0,
                                height: 3,
                              },
                              shadowOpacity: 0.29,
                              shadowRadius: 4.65,
    
                              elevation: 7,
                            }}>
                              
                              <CardImage
                                source={{ uri: "data:"+item.imageType+";base64,"+item.complaintImageBinary }}
                                title=""
                                style={{ opacity: 1 }} />
    
                              <CardTitle
                                title={item.complaint_title}
                                subtitle={item.complaint_street + ", " + item.complaint_area} 
                                // avatarSource='https://picsum.photos/200'
                                titleStyle={{fontWeight:"bold", color:"#0c5930"}} 
                                subtitleStyle={{fontWeight:"400", color:"#072342", fontSize:16}} 
                              />
                              {/* {console.log(complaintDetails.complaint_title)} */}
                             
                              <CardContent style={{marginTop:10}}> 
                              
                                <Text style={{fontWeight:"400", fontSize:18, textAlign:"left", paddingRight:4}}>{item.complaint_description}</Text>
                              </CardContent>
                              <CardAction
                                separator={true}
                                inColumn={false}>
                                <CardButton
                                  onPress={() => { } }
                                >
                                  <View>
                                  <Pressable onPress={() => {
                                    if(item.isLiked){
                                    item.likes=item.likes-1
                                    item.isLiked = false
                                    console.log("Unliked")
                                    
                                    }
                                    else{
                                      item.likes=item.likes+1
                                      item.isLiked = true
                                      console.log("liked")
                                      // setLiked((isLiked) => !isLiked)
                                    }
                                    setLiked((isLiked) => !isLiked)
                                    
                                  }}>
                                    <MaterialCommunityIcons
                                      name={liked && item.isLiked? "heart" : "heart-outline"}
                                      size={32}
                                      color={liked && item.isLiked? "red" : "black"}
                                    />
                                  </Pressable>
                                  </View>
                                  
                                 
                                  </CardButton>
                                  <Text>{item.likes}</Text>
                                <CardButton
                                  style={{}}
                                  onPress={() => { 
                                    let x = item.$oid
                                    router.push({
                                      pathname: "viewComplaint",
                                      params: { x }
                                    })
                                  }}
                                  title="View"
                                  color="blue" />
                              </CardAction>
    
                            </Card>
                          )}
                          keyExtractor={item => item.$oid}
                          contentContainerStyle={{ columnGap: SIZES.large, rowGap: SIZES.large }}
                          vertical />
                      </View>
                    </View>
    
    
    
                  </View>
                </ScrollView>
              </SafeAreaView>
          );
      }
    }
    
    function Profile({ navigation }) {
      // if(isFocused){
      //   if(profileReload){
      //     userFunc();
      //     setProfileReload(false);
      //   }
      // }
      const [name, setName] = useState(details.name);
      const [email, setEmail] = useState(details.email);
      const [street, setStreet] = useState(details.street);
      const [area, setArea] = useState(details.area);
      const [locality, setLocality] = useState(details.locality);
      const [pincode, setPincode] = useState(details.pincode);
      const [age, setAge] = useState(details.age);
      const [gender, setGender] = useState(details.gender);
      const [mobile, setMobile] = useState(details.mobile);
      const [profileImageBinary, setProfileImageBinary] = useState(details.picBinary)
      const [profileImageType, setProfileImageType] = useState(details.profilePicType)
  return (
    <ScrollView>
    <View style={{justifyContent:"center", marginTop:50}}>
      {/* <View style={styles.bodyName}>
        <View style={{backgroundColor:"green",alignItems: 'center',
    justifyContent: 'center', width:2*width/3, height:height/3, borderRadius:20}}>
          <Image style= {{overflow:"hidden", height:200, width:200, borderRadius: 100,borderColor:"green"
}}source={{uri : "data:"+imageType+';base64,'+imageBinary}} />
        </View>
        <View style={{textAlign:"left"}}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoText}>{email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Address:</Text>
          <Text style={styles.infoText}>{street}, {area}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Locality</Text>
          <Text style={styles.infoText}>{locality}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Pincode:</Text>
          <Text style={styles.infoText}>{pincode}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Age:</Text>
          <Text style={styles.infoText}>{age}    </Text>
          <Text style={styles.infoLabel}>Gender:</Text>
          <Text style={styles.infoText}>{gender} </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Mobile:</Text>
          <Text style={styles.infoText}>{mobile}</Text>
        </View>
        </View>
        <View style={{justifyContent:"flex-end", alignSelf:"flex-end", marginRight:10, marginTop:40}}>
        <Pressable style={{borderRadius: 4, elevation: 3,
          backgroundColor: '#398020',alignItems: 'center',paddingVertical:12,justifyContent: 'center',width:width/7, paddingHorizontal:0,paddingLeft:2, paddingRight:2}}
          onPress = {() => {
              router.push({
                pathname: "editProfile",
                params: { name, email, street, area, locality, pincode, age, gender, mobile, imageType, imageBinary} 
              })
              //setProfileReload(true);
          }}  
        >
        <Text style={[styles.buttonText, {fontSize:14}]}>Edit</Text>
        </Pressable>
        </View>
      </View> */}
      <Card style={{
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 3,
                          },
                          shadowOpacity: 0.29,
                          shadowRadius: 4.65,

                          elevation: 7,
                          width:7*width/8,
                          height:2*height/3,
                          alignSelf:"center"
                        }}>
        <View style={{marginTop:50, height:200, width:200, borderRadius:90, alignSelf:"center",shadowColor: "#000",}}>
        <CardImage 
          source={{uri: "https://www.bootdey.com/img/Content/avatar/avatar3.png"}} 
          style={{width: 200,
            height: 200,
            borderRadius: 100,
            overflow: "hidden",
            borderWidth: 3,
            borderColor: "red",
          alignSelf:"center"}}
        />
        </View>
        
        <CardContent
        style={{marginBottom:20, marginTop:20}}>
          <View style={{textAlign:"left"}}>
          <Text style={[{fontWeight:"bold", fontSize:20, marginTop:5}]}>Name:         <Text style={[{fontSize:18, fontStyle:"italic", fontWeight:"300"}]}>{name}</Text></Text>
          <Text style={{fontWeight:"bold", fontSize:20, marginTop:5}}>Email:         <Text style={{fontSize:18, fontStyle:"italic", fontWeight:"300"}}>{email}</Text></Text>
          <Text style={{fontWeight:"bold", fontSize:20, marginTop:5}}>Locality:     <Text style={{fontSize:18, fontStyle:"italic", fontWeight:"300"}}>{street}, {locality}</Text></Text>
          <Text style={{fontWeight:"bold", fontSize:20, marginTop:5}}>Area:           <Text style={{fontSize:18, fontStyle:"italic", fontWeight:"300"}}>{area}</Text></Text>
          <Text style={{fontWeight:"bold", fontSize:20, marginTop:5}}>Pincode:     <Text style={{fontSize:18, fontStyle:"italic", fontWeight:"300"}}>{pincode}</Text></Text>
          <Text style={{fontWeight:"bold", fontSize:20, marginTop:5}}>Age:            <Text style={{fontSize:18, fontStyle:"italic", fontWeight:"300"}}>{age}</Text></Text>
          <Text style={{fontWeight:"bold", fontSize:20, marginTop:5}}>Gender:      <Text style={{fontSize:18, fontStyle:"italic", fontWeight:"300"}}>{gender}</Text></Text>
          <Text style={{fontWeight:"bold", fontSize:20, marginTop:5}}>Mobile:       <Text style={{fontSize:18, fontStyle:"italic", fontWeight:"300"}}>{mobile}</Text></Text>
          
          </View>
        </CardContent>
        <CardAction style={{marginTop:10}}
          separator={false} 
          inColumn={false}>
          <CardButton
            onPress={() => {
              router.push({
                pathname: "editProfile",
                params: { name, email, street, area, locality, pincode, age, gender, mobile, imageType, imageBinary} 
              })
            }}
            title="Edit"
            color="#FEB557"
          />
        </CardAction>
      </Card>
    </View>
    </ScrollView>
      );



    }
    function RegisterComplaint({ navigation }) {
      const [name, setName] = useState(details.name);
      const [email, setEmail] = useState(details.email);
      const [street, setStreet] = useState(details.street);
      const [area, setArea] = useState(details.area);
      const [locality, setLocality] = useState(details.locality);
      const [pincode, setPincode] = useState(details.pincode);
      const [age, setAge] = useState(details.age);
      const [gender, setGender] = useState(details.gender);
      const [mobile, setMobile] = useState(details.mobile);
      const [picBinary, setImageBinary] = useState(details.picBinary)
      const [profilePicType, setImageType] = useState(details.profilePicType)
      const [imageSrc, setImageSrc] = useState(null);
      const [complaintImageBinary, setComplaintImageBinary] = useState(null)
      const [complaintImageType, setComplaintImageType] = useState(null)
      const [temp, setTemp] = useState(false);
      const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        try{
          const allowed = await checkPermissions();
          if(allowed){
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 1,
              allowsEditing:true,
              base64: true
            });
            if (!result.canceled) {
              //setImageSrc(result.assets[0].uri);
              setTemp(true)
              setImageSrc(result.assets[0].uri)
              setComplaintImageBinary(result.assets[0].base64)
              let filename = result.assets[0].uri.split('/').pop();
    
              let match = /\.(\w+)$/.exec(filename);
              let type = match ? `image/${match[1]}` : `image`;
              console.log(type)
              setComplaintImageType(type)
              // console.log(result)
            }
          }
        }catch (err) {
          setImageSrc(null);
          console.warn(err);
          return false;
        }
      };  
      const checkPermissions = async () => {
        try {
          const result = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
          );
    
          if (!result) {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              {
                title:
                  'You need to give storage permission to download and save the file',
                message: 'App needs access to your camera ',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('You can use the camera');
              return true;
            } else {
              Alert.alert('Error', I18n.t('PERMISSION_ACCESS_FILE'));
    
              console.log('Camera permission denied');
              return false;
            }
          } else {
            return true;
          }
        } catch (err) {
          console.warn(err);
          return false;
        }
      };
    const [value, setValue] = useState(true);
    const [isFocus, setIsFocus] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [specificLocation, setSpecificLocation] = useState('');
    const [complaintArea, setComplaintArea] = useState('');
    const [complaintLocality, setComplaintLocality] = useState('');
    const [complaintStreet, setComplaintStreet] = useState('');
    const [complaintPincode, setComplaintPincode] = useState('');
    const [complaintType, setComplaintType] = useState('');
    const [complaintTitle, setComplaintTitle] = useState('');
    const [complaintDescription, setComplaintDescription] = useState('');
    const [pass, setPass] = useState('');
    const [anonReg, setAnonReg] = useState(null);
    const renderLabel = (title) => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            {title}
          </Text>
        );
      }
      return null;
    };
    const Retrieval2 = async() =>{
      axios.post('http://192.168.187.114:80/registerComplaint',{
          // email: details.email,
          // name: details.name
          email: emailInput,
          name: nameInput,
          spLocation: specificLocation,
          area: complaintArea,
          locality:complaintLocality,
          street: complaintStreet,
          pincode:complaintPincode,
          type: complaintType,
          title: complaintTitle,
          description: complaintDescription,
          anon: anonReg,
          image_Type: complaintImageType,
          imageBinary: complaintImageBinary,
          pass:pass
        })
        .then(function(response){
          console.log("Complaint")
          if(response.data === null){
            console.log("sddssd")
            alert("Enter correct details and try again")
          }
          else{
            console.log(response.data)
            // router.push({
            //   pathname: "userDashboard",
            // });
            // setComplaintDetails(response.data)
            // userFunc();
            // setLoading2(false);
            alert("Complaint Registered")
            router.push({
              pathname:"userDashboard",
              params: { name, email, mobile, age, gender, profilePicType, picBinary, street, area, locality, pincode }
            })
            // setEmailInput('');
            // setNameInput('');
            // setSpecificLocation('');
            // setComplaintArea('');
            // setComplaintLocality('');
            // setComplaintStreet('');
            // setComplaintPincode('');
            // setComplaintType('');
            // setComplaintTitle('');
            // setComplaintDescription('');
            // setAnonReg('');
            // setImageSrc(null);
            // setComplaintImageBinary(null);
            // setImageType(null);
            // setTemp(null);
            
          }
        })
        .catch((error) => {
          console.log("jgjhgjh")
          console.log(error)
        })
        
    }
    return (
      
      <SafeAreaView style={{paddingBottom:30}}> 
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{height:height/7,justifyContent:"center", alignItems:"center"}}>
        <Text style={styles.welcomeMessage}>Enter complaint details</Text>
        </View>
        <View style={{height:height/8,justifyContent:"center", alignItems:"center"}}>
        <Text style={styles.userName}>Complaint Person's Details:</Text>
        </View>
        
        {/* {console.log(data)} */}
      <View>
        <TextInput 
              placeholder='Email' 
              placeholderTextColor={'black'} 
              style={[styles.textInput1]}
              onChangeText={newText => setEmailInput(newText)}
              defaultValue={emailInput}
        />
        <TextInput 
              placeholder='Name' 
              placeholderTextColor={'black'} 
              style={[styles.textInput1, {zIndex:-1}]}
              onChangeText={newName => setNameInput(newName)}
              defaultValue={nameInput}
        />
        {/* <TextInput 
              placeholder='Password' 
              placeholderTextColor={'black'} 
              style={[styles.textInput1, {zIndex:-1}]}
              onChangeText={newName => setPass(newName)}
              defaultValue={pass}
        /> */}
        <View style={{height:height/8,justifyContent:"center", alignItems:"center"}}>
        <Text style={styles.userName}>Complaint Location:</Text>
        </View>
        <View style={styles.container_dropdown}>
        {renderLabel('Complaint Area')}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Complaint Area' : '...'}
          searchPlaceholder="Search..."
          value={complaintArea}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setComplaintArea(item.value);
            setIsFocus(false);
          }}
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={styles.icon}
          //     color={isFocus ? 'blue' : 'black'}
          //     name="Safety"
          //     size={20}
          //   />
          // )}
        />
      </View>
      <View style={styles.container_dropdown}>
        {renderLabel('Complaint Locality')}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={complaintArea==''? data: Areas[complaintArea]}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Complaint Locality' : '...'}
          searchPlaceholder="Search..."
          value={complaintLocality}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setComplaintLocality(item.value);
            setIsFocus(false);
          }}
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={styles.icon}
          //     color={isFocus ? 'blue' : 'black'}
          //     name="Safety"
          //     size={20}
          //   />
          // )}
        />
      </View>
      {/* {console.log(Areas[complaintLocality])} */}
      
        {/* { 
        
          console.log(Streets[complaintLocality])
          
        } */}
      <View style={styles.container_dropdown}>
        {renderLabel('Complaint Street')}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={complaintLocality == ''? data: Streets[complaintArea][complaintLocality]}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Complaint Street' : '...'}
          searchPlaceholder="Search..."
          value={complaintStreet}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setComplaintStreet(item.value);
            setIsFocus(false);
          }}
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={styles.icon}
          //     color={isFocus ? 'blue' : 'black'}
          //     name="Safety"
          //     size={20}
          //   />
          // )}
        />
      </View>
      <TextInput 
              placeholder='Enter Specific Location (Plot No, Door No, etc..)' 
              placeholderTextColor={'black'} 
              style={[styles.textInput1]}
              onChangeText={newText => setSpecificLocation(newText)}
              defaultValue={specificLocation}
        />
        <TextInput 
              placeholder='Enter Pincode' 
              placeholderTextColor={'black'} 
              style={[styles.textInput1]}
              onChangeText={newText => setComplaintPincode(newText)}
              defaultValue={complaintPincode}
        />
      <View style={{height:height/8,justifyContent:"center", alignItems:"center"}}>
        <Text style={styles.userName}>Complaint Details:</Text>
      </View>
      <View style={styles.container_dropdown}>
        {renderLabel('Complaint Type')}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={complaintTypes}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Complaint Type' : '...'}
          searchPlaceholder="Search..."
          value={complaintType}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setComplaintType(item.value);
            setIsFocus(false);
          }}
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={styles.icon}
          //     color={isFocus ? 'blue' : 'black'}
          //     name="Safety"
          //     size={20}
          //   />
          // )}
        />
      </View>
      <View style={styles.container_dropdown}>
        {renderLabel('Complaint Title')}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={complaintType == ''? data: complaintTitles[complaintType]}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Complaint Title' : '...'}
          searchPlaceholder="Search..."
          value={complaintTitle}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setComplaintTitle(item.value);
            setIsFocus(false);
          }}
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={styles.icon}
          //     color={isFocus ? 'blue' : 'black'}
          //     name="Safety"
          //     size={20}
          //   />
          // )}
        />
      </View>
      <View style={{height:height/20,justifyContent:"center", paddingLeft:10}}>
        <Text style={[styles.userName,{paddingLeft:10,fontSize:13, textAlign:"left"}]}>If Complaint Title is not present please type here:</Text>
        </View>
      <TextInput 
              placeholder='Complaint Title' 
              placeholderTextColor={'black'} 
              style={[styles.textInput1, {zIndex:-1}]}
              onChangeText={newName => setComplaintTitle(newName)}
              defaultValue={complaintTitle}
        />
        <View style={{height:height/20,justifyContent:"center", paddingLeft:10}}>
        <Text style={[styles.userName,{paddingLeft:10,fontSize:13, textAlign:"left"}]}>Give a brief description of the Complaint</Text>
        </View>
        {/* <TextInput
              multiline={true}
              numberOfLines={10}
              placeholder='Complaint Description' 
              placeholderTextColor={'black'} 
              style={[styles.textInput1, {zIndex:-1}]}
              onChangeText={newName => setComplaintDescription(newName)}
              defaultValue={complaintDescription}
        /> */}
        <View style={styles.containerTextArea}>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.textarea}
            onChangeText={text => setComplaintDescription(text)}
            defaultValue={complaintDescription}
            maxLength={400}
            placeholder={'Complaint Description'}
            placeholderTextColor={'#000000'}
            underlineColorAndroid={'#0c0d0d'}
          />
        </View>
        <View style={{alignItems:"center", justifyContent:"center"}}>
        <Image
          style={{alignSelf:"center", width:width/1.5, height:height/4}}
          source={temp?{uri:imageSrc} : require("../noImage.jpg")}
        />
        <StatusBar hidden={true} />
        <TouchableOpacity style={{marginTop:10}} onPress={pickImage}>
          <Text style={{color: '#1E90FF',fontSize: 18}}>Upload an Image</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
        <View style={styles.container_dropdown}>
        {renderLabel('Anonymous Registration')}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={anonYesNo}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Register Anonymously?' : '...'}
          searchPlaceholder="Search..."
          value={anonReg}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setAnonReg(item.value);
            setIsFocus(false);
          }}
          // renderLeftIcon={() => (
          //   <AntDesign
          //     style={styles.icon}
          //     color={isFocus ? 'blue' : 'black'}
          //     name="Safety"
          //     size={20}
          //   />
          // )}
        />
      </View>
      <View style={{paddingTop:20,paddingLeft:width/5, paddingBottom:10}}>
      <Pressable style={styles.button} onPress={Retrieval2}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
      </View>
      </View>
      </ScrollView>
      </SafeAreaView>
    );

    }
    function ViewComplaints({ navigation }) {
      
      if(retrieve){
      userComplaintsRegistered();
      }
      return(
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightwhite }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flex: 1,
                  padding: SIZES.medium,
                }}
              >
                <View>
                  <View style={styles.container}>
                    {/* <Text style={styles.welcomeMessage}>{details.name}</Text>
                    <Text style={styles.welcomeMessage}>Welcome Back!</Text> */}
                    <View style={{marginTop:12,flexDirection: 'row'}}>
                      <View style={{marginTop:11,backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center'}} />
                      <Text style={[styles.userName,{marginTop:10, alignSelf:'center', paddingHorizontal:5, fontSize: 20 }]}>Your Registered Complaints</Text>
                      <View style={{marginTop:11,backgroundColor: 'black', height: 2, flex: 1, alignSelf: 'center'}} />
                    </View>
                  </View>

      
                  <View style={{ height: 5 }}></View>
                  <View style={styles.tabsContainer}>
                    <FlatList
                      data={complaintDetails2}
                      renderItem={({ item }) => (
                        
                        <Card style={{
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 3,
                          },
                          shadowOpacity: 0.29,
                          shadowRadius: 4.65,

                          elevation: 7,
                        }}>
                          
                          <CardImage
                            source={{ uri: "data:"+item.complaint_proof.imageType+";base64,"+item.complaint_proof.complaintImageBinary }}
                            title=""
                            style={{ opacity: 1 }} />

                          <CardTitle
                            title={item.complaint_title}
                            subtitle={item.complaint_address.complaint_street + ", " + item.complaint_address.complaint_area} 
                            // avatarSource='https://picsum.photos/200'
                            titleStyle={{fontWeight:"bold", color:"#0c5930"}} 
                            subtitleStyle={{fontWeight:"400", color:"#072342", fontSize:16}} 
                          />
                          {/* {console.log(complaintDetails.complaint_title)} */}
                         
                          <CardContent style={{marginTop:10}}> 
                          
                            <Text style={{fontWeight:"400", fontSize:18, textAlign:"left", paddingRight:4}}>{item.complaint_description}</Text>
                          </CardContent>
                          <CardAction
                            separator={true}
                            inColumn={false}>
                            <CardButton
                              onPress={() => { } }
                            >
                                <MaterialCommunityIcons
                                  name={"heart"}
                                  size={32}
                                  color={"red"}
                                />
                              </CardButton>
                              <Text>{item.likes}</Text>
                            <CardButton
                              style={{}}
                              onPress={() => { 
                                let x = item._id.$oid
                                router.push({
                                  pathname: "viewComplaint",
                                  params: { x }
                                })
                              }}
                              title="View"
                              color="blue" />
                          </CardAction>

                        </Card>
                      )}
                      keyExtractor={item => item._id.$oid}
                      contentContainerStyle={{ columnGap: SIZES.large, rowGap: SIZES.large }}
                      vertical />
                  </View>
                </View>



              </View>
            </ScrollView>
          </SafeAreaView>
      );
    }
    function Logout({ navigation }) {
      // const a = [1,2,3]
      // console.log(type(a))
      // setUserDetails(a);
      // setComplaintDetails(a);
      console.log(details)
      alert('Logged out successfully')
      router.push("login")    
    }
  // const Retrieval = async() => {
  //   const res = await axios.post('http://192.168.56.1:5000/complaints',{
  //     email: myEmail,
  //     name: userDetails.name
  //   })
  //   .catch((error) => {
  //     console.log("jgjhgjh")
  //     console.log(error)
  //   })
  //   console.log("Complaint")
  //   if(res.data === null){
  //     console.log("sddssd")
  //     alert("Enter correct details and try again")
  //   }
  //   else{
  //     console.log(res.data)
  //     router.push({
  //       pathname: "userDashboard",
  //     });
  //       setComplaintDetails(res.data)
  //     setLoading2(false);
  //   }
  // }
  if (complaintDetails.email===null) {
    return (<View><Text>Loading...</Text></View>);
  }
  // const [searchParams] = useSearchParams();
  // const [email, setEmail] = useState([]);
  // useEffect(() => {
  //   if(this.props === null){
  //     console.log("Null")
  //   }
  //   else{
  //     setEmail(this.props)
  //   }
  // }, [])
    return (

        <NavigationContainer independent = {true}>
          
        <Drawer.Navigator initialRouteName="userDashboard"
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#c6cbef', //Set Drawer background
            width: 250, //Set Drawer width
          },
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          }
        }}
        drawerContent={(props)=> {
          return(
              <View style={{flex:1,}}>
                  <DrawerContentScrollView {...props}>
                      {/* <ImageBackground source={require("../Assets/Vrda1img2.jpg")} style={{justifyContent:"space-between",alignItems:"center",padding:20,marginBottom:20,backgroundColor:"rgb(0,0,0)",borderBottomWidth:2,borderColor:Colors.secondary}} imageStyle=
                          {{opacity:0.4}}> */}
                          <View style={{justifyContent:"center", alignItems:"center", paddingTop:20, paddingBottom:20}}>
                          <Image source={require("../ChennaiDeskLogo.png")} style={{width:100,height:100,borderRadius:50,borderWidth:2,borderColor:COLORS.white}}/>
                          </View>
                          {/* <Text style={{fontSize:20,fontWeight:"bold",color:Colors.white}}>{userDetail?userDetail.name:"Not Available"}</Text>
                          <Text style={{color:Colors.light}}>{userDetail?userDetail.email:"Not Available"}</Text>
                      </ImageBackground> */}
                      <DrawerItemList {...props}/>
                  </DrawerContentScrollView>
                  {/* <TouchableOpacity onPress={()=>{logout()}} style={{position:"relative",right:0,left:0,bottom:5,backgroundColor:"rgb(231,230,230)"}}>
                      <Text style={{backgroundColor:"rgba(162,160,160,0.29)",width:"100%",height:40,textAlign:"center",paddingTop:8}}><SimpleLineIcons name={"logout"} size={15} color={Colors.primary}/> LogOut</Text>
                  </TouchableOpacity> */}
              </View>
          )
      } 
   }
        > 
        {/* <Image
        source={require("../ChennaiDeskLogo.png")}
        style={[styles.sideMenuProfileIcon, {top:25}]}
      /> */}
        
            <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile"  component={Profile} />
          <Drawer.Screen name="Register Complaint" component={RegisterComplaint} />
          <Drawer.Screen name="View Registered Complaints" component={ViewComplaints} />
          <Drawer.Screen name="Logout" component={Logout} />  

          
          
          </Drawer.Navigator>
          
          </NavigationContainer>
    )
  }
export default Home;