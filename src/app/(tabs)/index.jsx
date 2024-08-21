import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      {/* <Link href={"/History"}>History</Link> */}
      <TouchableOpacity onPress={() => router.navigate("/(tabs)/History")}><Text>CLIQUE AQUI</Text></TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
