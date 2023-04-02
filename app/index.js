import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import styles from '../app/styles'
import { SafeAreaView } from "react-native-safe-area-context";
export default function Page() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <View>
        <Text
          onPress={() => {
          router.push("login");
        }}
        >        Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
      </View>
    </View>
    </SafeAreaView>
  );
}


