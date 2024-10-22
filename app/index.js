import React, { useState, useEffect} from 'react';
import { Text, View, Button, TouchableOpacity, FlatList, TextInput, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const CollectionStack = createStackNavigator();

// Tela Home
function HomeScreen({ navigation }) {
  return (
    <View>
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
function CreateScreen({ route, navigation }) {
  const { addList } = route.params;
  const [listName, setListName] = useState('');

  // Limpar o nome da lista ao abrir a tela de criação
  useEffect(() => {
    setListName(''); // Reseta o campo de texto ao entrar na tela
  }, []);

  const handleCancel = () => {
    navigation.navigate('Create'); // Volta para a tela anterior sem salvar
  };

  const handleConclude = () => {
    if (listName.trim() !== '') {
      const newList = { name: listName, items: [] }; // Cria a nova lista com o nome
      addList(newList); // Adiciona a nova lista
      navigation.navigate('Collection'); // Retorna para a tela anterior após salvar
    } else {
      alert('O nome da lista não pode estar vazio.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Nova Lista</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nome da Lista"
        value={listName}
        onChangeText={(text) => setListName(text)} // Atualiza o nome da lista
      />

      <View style={styles.buttonsContainer}>
        <Button title="Cancelar" onPress={handleCancel} color="red" />
        <Button title="Concluir" onPress={handleConclude} />
      </View>
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
  const [lists, setLists] = useState([]);

  const addList = (newList) => {
    setLists((prevLists) => [...prevLists, newList]);
  };

  return (
    <View>
      <Text>Collection Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Create', { addList })}>
        <Feather name="plus-circle" size={24} color="red" />
        <Text>Nova lista</Text>
      </TouchableOpacity>

      <FlatList
        data={lists}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => navigation.navigate('EditList', { list: item })}>
            <Feather name="edit" size={24} color="red" />
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Tela de Edição de Lista
function EditListScreen({ route }) {
  const { list } = route.params;
  
  return (
    <View>
      <Text>Editar Item da Lista</Text>
      {list.items.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
    </View>
  );
}

// Navegação dentro da aba Home
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="inicio" component={HomeScreen} />
      <HomeStack.Screen name="Create" component={CreateScreen} />
      <HomeStack.Screen name="Buy" component={BuyScreen} />
    </HomeStack.Navigator>
  );
}

// Navegação dentro da aba Collection
function CollectionStackScreen() {
  return (
    <CollectionStack.Navigator screenOptions={{ headerShown: false }}>
      <CollectionStack.Screen name="colecao" component={CollectionScreen} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
