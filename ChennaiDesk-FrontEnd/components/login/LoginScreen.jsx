import { useState} from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./loginScreen.style"
import React from 'react';
import {View, Image, StyleSheet} from 'react-native';


const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
};

export default LoginScreen;