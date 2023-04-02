import { UseState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, images, SIZES } from '../constants'
import {
Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome, LoginScreen }
from '../components'
import { Text } from 'react-native';
const Home  = () =>{
  const router = useRouter();
    return (
        <SafeAreaView style={{ flex : 1, backgroundColor: COLORS.lightwhite }}>
                <Stack.Screen
                    options={{
                    headerStyle: { backgroundColor: COLORS.gray },
                    headerShadowVisble: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl = {icons.menu} dimension = "60%" />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn 
                        onPress = {() => {
                          router.push("login");
                        }}
                        iconUrl = {images.profile} dimension = "60%"/>
                    ),
                    headerTitle : "",
                    }}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
          />

         
      
        </View>
      </ScrollView>
        </SafeAreaView>
    )
}
export default Home;