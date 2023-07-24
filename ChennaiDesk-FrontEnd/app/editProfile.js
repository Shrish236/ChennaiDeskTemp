import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { useEffect } from 'react';
import axios from 'axios';
import { Stack, useRouter, useNavigation, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import * as DocumentPicker from 'expo-document-picker';
import { data } from '../components';
const EditProfileView = () => {
  //const [updatedDetails, setUpdatedDetails] = useState([])
  // const [userDetails, setUserDetails1] = useState([])
  const params = useLocalSearchParams();
  userDetails = params;
  // useEffect(() => {
  //   setUpdatedDetails(params);
  // }, [updatedDetails])
  
  // console.log(userDetails)
  // useEffect(() => {
  //     axios.post('http://192.168.56.1:5000/user',{
  //       email: myEmail,
  //       password: myPass
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  //     .then(function (response){
  //     console.log("Hoe")
  //     if(response.data === null){
  //       console.log("Server Error")
  //       alert("Server Error Please try again")
  //       router.replace({
  //         pathname: "login"
  //       })
  //     }
  //     else{
  //       setUserDetails1(response.data)
  //       // console.log(typeof(userDetails.name))
  //       setMyName(response.data.name)
        
  //     }
  //   })
  // },[userDetails])
  
  const [name, setName] = useState(userDetails.name);
  const [email, setEmail] = useState(userDetails.email);
  const [street, setStreet] = useState(userDetails.street);
  const [area, setArea] = useState(userDetails.area);
  const [locality, setLocality] = useState(userDetails.locality);
  const [pincode, setPincode] = useState(userDetails.pincode);
  const [age, setAge] = useState(userDetails.age);
  const [gender, setGender] = useState(userDetails.gender);
  const [mobile, setMobile] = useState(userDetails.mobile);
  const [singleFile, setSingleFile] = useState(null)
  const [binaryData, setBinaryData] = useState(null)
  const [type, setType] = useState(null)
  const [temp, setTemp] = useState(false)
  const [imageSrc, setImageSrc] = useState(null)
  //console.log(type(type))
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
          setBinaryData(result.assets[0].base64)
          let filename = result.assets[0].uri.split('/').pop();

          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;
          //setType(type)
          // console.log(result)
        }
      }
    }catch (err) {
      setSingleFile(null);
      console.warn(err);
      return false;
    }
  };
  // const uploadImage = async () => {
  //   const BASE_URL = 'xxxx';

  //   // Check if any file is selected or not
  //   if (singleFile != null) {
  //     // If file selected then create FormData
  //     const data = new FormData();

  //     data.append('file_attachment', {
  //       uri: singleFile.uri,
  //       name: singleFile.name,
  //       type: singleFile.mimeType,
  //     });

  //     // return
  //     try {
  //       let res = await fetch(BASE_URL + 'tutorial/upload.php', {
  //         method: 'post',
  //         body: data,
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'multipart/form-data',
  //         },
  //         timeout: 5000,
  //       });

  //       let result = await res.json();
  //       console.log('result', result);
  //       if (result.status == 1) {
  //         Alert.alert('Info', result.msg);
  //       }
  //     } catch (error) {
  //       // Error retrieving data
  //       // Alert.alert('Error', error.message);
  //       console.log('error upload', error);
  //     }
  //   } else {
  //     // If no file selected the show alert
  //     Alert.alert('Please Select File first');
  //   }
  // };
  // async function selectFile() {
  //   try {
  //     const result = await checkPermissions();

  //     if (result) {
  //       const result = await DocumentPicker.getDocumentAsync({
  //         copyToCacheDirectory: false,
  //         type: 'image/*',
  //       });

  //       if (result.type === 'success') {
  //         // Printing the log realted to the file
  //         console.log('res : ' + JSON.stringify(result));
  //         // Setting the state to show single file attributes
  //         setSingleFile(result);
  //         setImageSrc(result.uri);
  //       }
  //     }
  //   } catch (err) {
  //     setSingleFile(null);
  //     console.warn(err);
  //     return false;
  //   }
  // }
  const handleSubmit = async() => {
    let filename = imageSrc.split('/').pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    
    let formData = new FormData();
    formData.append('imageSrc', imageSrc)
    formData.append('imageFileName', filename)
    formData.append('imageType', type)
    formData.append('imageBinary', binaryData)
    formData.append('name', name)
    formData.append('email', email)
    formData.append('street', street)
    formData.append('area', area)
    formData.append('locality', locality)
    formData.append('pincode', pincode)
    formData.append('age', age)
    formData.append('gender', gender)
    formData.append('mobile', mobile)
    formData.append('a', 'a')
    // console.log(formData)
      await axios.post('http://192.168.187.114:80/editProfile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(function (response){
        console.log("Hoe")
        if(response.data === null){
          console.log("Server Error")
          alert("Server Error Please try again")
          router.replace({
            pathname: "login"
          })
        }
        else{
          //setUpdatedDetails(response.data)
          // console.log(typeof(userDetails.name))
          // setGender(response.data.gender)
          // console.log(response.data)
          alert("Profile updated!")
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
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
  if (name==null) {
    return (<View><Text>Loading...</Text></View>);
  }
  return (
    <SafeAreaView>
      <ScrollView>      
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{uri: imageSrc? imageSrc: "https://www.bootdey.com/img/Content/avatar/avatar3.png"}}
        />
        <StatusBar hidden={true} />
        <TouchableOpacity style={styles.changeAvatarButton} onPress={pickImage}>
          <Text style={styles.changeAvatarButtonText}>Change Avatar</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Street:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter street"
          value={street}
          onChangeText={setStreet}
        />
        <Text style={styles.label}>Area:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter area"
          value={area}
          onChangeText={setArea}
        />
        <Text style={styles.label}>Locality:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter locality"
          value={locality}
          onChangeText={setLocality}
        />
        <Text style={styles.label}>Pincode:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pincode"
          value={pincode}
          onChangeText={setPincode}
        />
        <Text style={styles.label}>Gender:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter gender"
          value={gender}
          onChangeText={setGender}
        />
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter age"
          value={age}
          onChangeText={setAge}
        />
        <Text style={styles.label}>Mobile:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter mobile"
          value={mobile}
          onChangeText={setMobile}
        />
        

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '80%',
  },
  label: {
    marginTop: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  button: {
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: '#000000',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom:20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden"
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: '#1E90FF',
    fontSize: 18,
  },
});

export default EditProfileView;