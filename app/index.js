import React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const CollectionStack = createStackNavigator();

// Tela Home
function HomeScreen({ navigation }) {
  return (
    <View >
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Feather name="plus-circle" size={24} color="red" />
        <Text>Nova lista</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Buy')}>
        <Feather name="arrow-right-circle" size={24} color="red" />
        <Text>Começar minha feira !</Text>
      </TouchableOpacity>
    </View>
  );
}

// Tela de Criação
function CreateScreen() {
  return (
    <View>
      <Text>Tela de Criação</Text>
    </View>
  );
}

// Tela de Compra
function BuyScreen() {
  return (
    <View>
      <Text>Tela de Compra</Text>
    </View>
  );
}

// Tela de Coleção
function CollectionScreen({ navigation }) {
  return (
    <View>
      <Text>Collection Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <Feather name="plus-circle" size={24} color="red" />
        <Text>Nova lista</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('EditList')}>
        <Feather name="edit" size={24} color="red" />
        <Text>Lista 1</Text>
      </TouchableOpacity>
    </View>
  );
}

// Tela de Edição de Lista
function EditListScreen() {
  return (
    <View>
      <Text>Editar Item da Lista</Text>
    </View>
  );
}

// Navegação dentro da aba Home
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Create" component={CreateScreen} />
      <HomeStack.Screen name="Buy" component={BuyScreen} />
    </HomeStack.Navigator>
  );
}

// Navegação dentro da aba Collection
function CollectionStackScreen() {
  return (
    <CollectionStack.Navigator screenOptions={{ headerShown: false }}>
      <CollectionStack.Screen name="Collection" component={CollectionScreen} />
      <CollectionStack.Screen name="EditList" component={EditListScreen} />
    </CollectionStack.Navigator>
  );
}

// Configurar Tabs
export default function App() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ title: 'Home', tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />, headerShown: false}}/>
        <Tab.Screen name="Collection" component={CollectionStackScreen}  options={{ title: 'Collection', tabBarIcon: ({ color }) => <Feather name="archive" size={24} color={color} />, headerShown: false}}/>
      </Tab.Navigator>
  );
}
