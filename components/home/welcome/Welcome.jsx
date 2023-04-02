import { useState} from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from './welcome.style'
import { icons, FONT, SIZES, images } from "../../../constants";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import { BlurView } from "@react-native-community/blur";

const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = () => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time");
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Adrian</Text>
        <Text style={styles.welcomeMessage}>Welcome Back!</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style = {styles.searchInput}
            value = ""
            onChange={()=>{}}
            placeholder="Search here"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={{height:30}}></View>
    {/*  <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push('../login/LoginScreen');
              }}
            >
              <Text style = {styles.tabText(activeJobType, item)}>{ item }</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
            </View> */}

        <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes} 
          renderItem={({ item }) => (
            <Card style={{shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 3,
},
shadowOpacity: 0.29,
shadowRadius: 4.65,

elevation: 7,}}>
      
  <CardImage 
    source={{uri: 'https://picsum.photos/200'}} 
    title=""
    style={{opacity:1}}
  />
  
  <CardTitle 
    title="Road Pavements Damaged" 
    subtitle="Mr. Ramesh Pandian"
   />
  <CardContent text="Road pavements severely damaged due to construction" />
  <CardAction 
    separator={true} 
    inColumn={false}>
    <CardButton
      onPress={() => {}}
      title="View"
      color="blue"
    />
    <CardButton
      onPress={() => {}}
      title="Like"
      color="blue"
    />
  </CardAction>
  
  </Card>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small,rowGap:SIZES.large }}
          vertical
        />
        </View>
    </View>
  )
}

export default Welcome