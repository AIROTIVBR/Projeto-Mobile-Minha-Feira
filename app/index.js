import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, FlatList, TextInput, StyleSheet, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const CollectionStack = createStackNavigator();

// Contexto para compartilhar as listas entre as telas de Collection
const ListContext = React.createContext();

// Tela Home
function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
      {/* Botão para navegar até a tela de criação de listas */}
      <TouchableOpacity onPress={() => navigation.navigate('CreateFromHome')}>
        <Feather name="plus-circle" size={24} color="red" />
        <Text>Nova lista</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Buy')}>
        <Feather name="arrow-right-circle" size={24} color="red" />
        <Text>Começar minha feira!</Text>
      </TouchableOpacity>
    </View>
  );
}


// Tela de Coleção
function CollectionScreen({ navigation }) {
  const { lists } = React.useContext(ListContext); // Acessa as listas do contexto

  return (
    <View>
      <Text>Collection Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('CreateFromCollection')}>
        <Feather name="plus-circle" size={24} color="red" />
        <Text>Nova lista</Text>
      </TouchableOpacity>

      <FlatList
        data={lists}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('EditList', { list: item })}>
            <Feather name="edit" size={24} color="red" />
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}


function BuyScreen() {
  return (
    <View>
      <Text>Tela de Compra</Text>
    </View>
  );
}


// Tela de Criação de Lista (para ambas: Home e Collection)
function CreateScreen({ navigation, route }) {
  const { addList } = React.useContext(ListContext);  // Acessa a função addList do contexto
  const [listName, setListName] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setListName('');
    setItems([]);
  }, []);

  const handleAddItem = () => {
    if (itemName.trim() !== '') {
      const newItem = { name: itemName, quantity: itemQuantity };
      setItems((prevItems) => [...prevItems, newItem]);
      setItemName('');
      setItemQuantity(1);
    } else {
      alert('O nome do item não pode estar vazio.');
    }
  };

  const handleCancel = () => {
    navigation.goBack(); // Volta para a tela anterior sem salvar
  };

  const handleConclude = () => {
    if (listName.trim() !== '') {
      const newList = { name: listName, items: items };
      addList(newList); // Adiciona a lista usando a função do contexto
      // Navega para a tela de Collection após a criação, independentemente de onde veio (Home ou Collection)
      navigation.navigate('Collection');
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

      <Text style={styles.subtitle}>Adicionar Itens</Text>
      
      <View style={styles.itemRow}>
        <TextInput
          style={styles.inputItem}
          placeholder="Nome do Item"
          value={itemName}
          onChangeText={(text) => setItemName(text)} // Atualiza o nome do item
        />
        <View style={styles.counter}>
          <Button title="-" onPress={() => setItemQuantity(Math.max(1, itemQuantity - 1))} />
          <Text style={styles.counterText}>{itemQuantity}</Text>
          <Button title="+" onPress={() => setItemQuantity(itemQuantity + 1)} />
        </View>
        <Button title="Adicionar" onPress={handleAddItem} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text>{item.name} (Qtd: {item.quantity})</Text>
          </View>
        )}
      />

      <View style={styles.buttonsContainer}>
        <Button title="Cancelar" onPress={handleCancel} color="red" />
        <Button title="Concluir" onPress={handleConclude} />
      </View>
    </View>
  );
}


// Tela de Edição de Lista
function EditListScreen({ route, navigation }) {
  const { list } = route.params;
  const { addList, deleteList, updateList, updateItem } = React.useContext(ListContext); // Inclui updateItem no contexto
  const [listName, setListName] = useState(list.name);
  const [items, setItems] = useState(list.items);

  const handleUpdateList = () => {
    const updatedList = { ...list, name: listName, items: items };
    updateList(updatedList); // Atualiza a lista no contexto
    navigation.goBack(); // Volta para a tela de Collection
  };

  const handleDeleteList = () => {
    deleteList(list.name); // Exclui a lista pelo nome
    Alert.alert('Lista excluída'); // Alerta após exclusão
    navigation.goBack(); // Volta para a tela de Collection
  };

  const handleEditItem = (index, newName, newQuantity) => {
    const updatedItem = { name: newName, quantity: newQuantity };
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item, idx) =>
        idx === index ? updatedItem : item
      );
      // Atualiza a lista no contexto
      updateItem(list.name, index, updatedItem);
      return updatedItems;
    });
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, idx) => idx !== index);
    setItems(updatedItems);
    // Atualiza a lista no contexto com a nova lista de itens
    updateList({ ...list, items: updatedItems });
    Alert.alert("Item excluído com sucesso !");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Lista</Text>
      <TextInput
        style={styles.input}
        value={listName}
        onChangeText={setListName} // Atualiza o nome da lista
      />
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemRow}>
            <TextInput
              style={styles.inputItem}
              value={item.name}
              onChangeText={(text) => handleEditItem(index, text, item.quantity)} // Edita o nome do item
            />
            <View style={styles.counter}>
              <Button title="-" onPress={() => handleEditItem(index, item.name, Math.max(1, item.quantity - 1))} />
              <Text style={styles.counterText}>{item.quantity}</Text>
              <Button title="+" onPress={() => handleEditItem(index, item.name, item.quantity + 1)} />
            </View>
            <Button title="Excluir" onPress={() => handleDeleteItem(index)} />
          </View>
        )}
      />
      <View style={styles.buttonsContainer}>
        <Button title="Salvar" onPress={handleUpdateList} />
        <Button title="Excluir Lista" onPress={handleDeleteList} color="red" />
      </View>
    </View>
  );
}


// Navegação dentro da aba Home
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="home" component={HomeScreen} />
      <HomeStack.Screen name="CreateFromHome" component={CreateScreen} />
      <HomeStack.Screen name="Buy" component={BuyScreen} />
    </HomeStack.Navigator>
  );
}


// Navegação dentro da aba Collection
function CollectionStackScreen() {
  return (
    <CollectionStack.Navigator screenOptions={{ headerShown: false }}>
      <CollectionStack.Screen name="Collection" component={CollectionScreen} />
      <CollectionStack.Screen name="CreateFromCollection" component={CreateScreen} />
      <CollectionStack.Screen name="EditList" component={EditListScreen} />
    </CollectionStack.Navigator>
  );
}


// Configurar Tabs e Provider para compartilhar o estado das listas
export default function App() {
  const [lists, setLists] = useState([]);

  const addList = (newList) => {
    setLists((prevLists) => [...prevLists, newList]);
  };

  const deleteList = (listName) => {
    setLists((prevLists) => prevLists.filter((list) => list.name !== listName));
  };

  const updateList = (updatedList) => {
    setLists((prevLists) =>
      prevLists.map((list) => (list.name === updatedList.name ? updatedList : list))
    );
  };

  const updateItem = (listName, index, updatedItem) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.name === listName) {
          const updatedItems = list.items.map((item, idx) =>
            idx === index ? updatedItem : item
          );
          return { ...list, items: updatedItems };
        }
        return list;
      })
    );
  };



  return (
    <ListContext.Provider value={{ lists, addList, deleteList , updateItem, updateList }}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ title: 'Home', tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />, headerShown: false}}/>
        <Tab.Screen name="Collection" component={CollectionStackScreen}  options={{ title: 'Collection', tabBarIcon: ({ color }) => <Feather name="archive" size={24} color={color} />, headerShown: false}}/>
      </Tab.Navigator>
    </ListContext.Provider>
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
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    marginRight: 10,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterText: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
