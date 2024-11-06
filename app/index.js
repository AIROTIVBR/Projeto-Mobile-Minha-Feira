import React, { useState } from 'react';
import { Text, View, Button, TouchableOpacity, StatusBar, FlatList, TextInput, StyleSheet, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { useFonts, Lexend_400Regular} from '@expo-google-fonts/lexend';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const CollectionStack = createStackNavigator();

// Contexto para compartilhar as listas entre as telas de Collection
const ListContext = React.createContext();

// Estilização do Container da Tela
const ScreenContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// Cabeçalho superior estilizado
const Header = styled(SafeAreaView)`
  flex: 1;
  background-color: #078515;
  padding: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 1;
  height: 150vh;
  justify-content: flex-start;
  font-family: "Lexend_400Regular";
`;

const HeaderText = styled.Text`
  color: black;  
  font-size: 15px; 
  font-weight: semibold;
  font-family: "Lexend_400Regular";
`;

const SubHeaderText = styled.Text`
  color: white;  
  font-size: 25px;  
  margin-top: 5px;
  margin-bottom: 5px;
  font-family: "Lexend_400Regular";
`;

const UserIcon = styled(Feather)`
  color: black; 
  position: absolute;
  right: 20px;  
  top: 30px;    
`;

const ShoppingIcon = styled(Feather)`
  color: white; 
  margin-left: 10px;
`;

// Estilização do botão "Nova Lista"
const NewListButton = styled.TouchableOpacity`
  background-color: white;
  border: 2px solid black;
  border-radius: 15px;
  width: 200px; 
  height: 250px; 
  align-items: center; 
  justify-content: center; 
  margin-bottom: 20px; 
  margin-top: 5px;
  font-family: "Lexend_400Regular";
`;

// Ícone do botão "Nova Lista"
const PlusIcon = styled(Feather)`
  color: black; 
  font-size: 24px; 
`;

const StartFairButton = styled.TouchableOpacity`
  background-color: #79FC86; 
  border-radius: 15px;
  height: 100px; 
  width: 90%; 
  flex-direction: row; 
  align-items: center; 
  padding: 15px;  
`;

const StartFairText = styled.Text`
  color: black; 
  flex: 1; 
  font-size: 20px; 
  font-family: "Lexend_400Regular";
`;

// Componente estilizado para a barra de navegação
const StyledTabBar = styled.View`
  flex-direction: row;
  background-color: #192A1A;
  height: 60px;  /* Mantém a altura */
  align-items: center;
  justify-content: space-around;
  border-radius: 30px;  /* Bordas arredondadas em todos os lados */
  position: absolute;
  bottom: 15px;  /* Afasta a barra 20px da parte inferior */
  left: 10px;  /* Pequeno afastamento da esquerda */
  right: 10px;  /* Pequeno afastamento da direita */
`;

const TabButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const TabIcon = styled(Feather)`
  color: ${(props) => (props.focused ? 'green' : 'white')};
`;

// Botão de "Nova Lista" mais fino para CollectionScreen
const ThinNewListButton = styled.TouchableOpacity`
  background-color: white;
  border: 2px solid black;
  border-radius: 15px;
  width: 140px;
  height: 200px;
  align-items: center;
  justify-content: center;
  margin: 10px; /* Margem para espaçamento entre colunas */
  position: relative;
`;

// Texto "Nova Lista" no canto inferior esquerdo
const NewListText = styled.Text`
  color: black;
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 16px;
  font-family: "Lexend_400Regular";
`;

// Botão de lista criado (preto)
const CreatedListButton = styled.TouchableOpacity`
  background-color: black;
  border-radius: 15px;
  width: 140px;
  height: 200px;
  align-items: center;
  justify-content: center;
  margin: 10px; /* Margem para espaçamento entre colunas */
  position: relative;
`;

// Texto do nome da lista em verde (#16E43C) no canto inferior esquerdo
const CreatedListText = styled.Text`
  color: #16E43C;
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 16px;
  font-family: "Lexend_400Regular";
`;

// Ícone "chevron-right" no canto inferior direito para listas criadas
const ChevronIcon = styled(Feather)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
  font-size: 24px;
`;

// Título principal (Coleção de Listas) na header
const MainHeaderText = styled.Text`
  color: white;
  font-size: 28px;
  font-weight: semibold;
  margin-right: 10px; /* Espaço entre o título e o ícone */
  font-family: "Lexend_400Regular";
`;

// Ícone de carrinho de compras ao lado do título principal
const HeaderShoppingIcon = styled(Feather)`
  color: white;
  font-size: 24px;
`;

const AddIcon = styled(Feather)`
  color: #79FC86;
  font-size: 34px;
`;

// Subtítulo na header
const SubHeaderText2 = styled.Text`
  color: white;
  font-size: 18px;
  margin-top: 5px;
  font-family: "Lexend_400Regular";
`;

const Body = styled.View`
  flex: 1;
  justify-content: 'flex-start';
  align-items: 'flex-start';
  margin-top: 120px;
`;

const ListNameInput= styled.TextInput`
  border-width:2px;
  border-color:#79FC86; 
  border-radius:14px;
  width:90%;
  align-self:center; 
  justify-content:center;
  padding-left:12px;
  padding-bottom:6px; 
  padding-top: 6px; 
  font-size:18px; 
  margin-bottom: 10px;
`;

const QtdButton= styled.Button`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

function getGreeting() {
  const currentHour = new Date().getHours();

  if (currentHour >= 6 && currentHour < 12) {
    return "Bom dia";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Boa tarde";
  } else if (currentHour >= 18 && currentHour < 24) {
    return "Boa noite";
  } else {
    return "Boa madrugada";
  }
}

function HomeScreen({ navigation }) {
  return (
    <ScreenContainer>
      {/* Configurar a barra de status para ser verde */}
      <StatusBar barStyle="light-content" backgroundColor="#078515" />

      <Header edges={['top']}>
        <HeaderText>{getGreeting()} !</HeaderText>
        <SubHeaderText>
          Dia de feira,
          {'\n'}
          prepare sua lista!
          <ShoppingIcon name="shopping-cart" size={24} />
        </SubHeaderText>
        <UserIcon name="user" size={24} />
      </Header>

      {/* Conteúdo principal */}
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 135, paddingLeft: 5, paddingTop: 25 }}>
        <Text style={{ fontSize: 20, fontWeight: 'semibold',fontFamily: "Lexend_400Regular"}}>Escolha sua Lista:</Text>
        
        <NewListButton onPress={() => navigation.navigate('CreateFromHome')}>
          <PlusIcon name="plus" />
          <Text style={{ color: 'black', marginTop: 5,fontFamily: "Lexend_400Regular"}}>Nova Lista</Text>
        </NewListButton>

        <StartFairButton onPress={() => navigation.navigate('Buy')}>
          <StartFairText>Começar minha feira!</StartFairText>
          <Feather name="chevron-right" size={24} color="black" />
        </StartFairButton>
      </View>
    </ScreenContainer>
  );
}

// Tela de Coleção
function CollectionScreen({ navigation }) {
  const { lists } = React.useContext(ListContext);

  return (
    <ScreenContainer>
      <StatusBar barStyle="light-content" backgroundColor="#078515" />

      {/* Header personalizada */}
      <Header edges={['top']}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MainHeaderText>Coleção de Listas</MainHeaderText>
          <HeaderShoppingIcon name="shopping-cart" />
        </View>
        <SubHeaderText2>Escolha sua lista e boas compras!</SubHeaderText2>
      </Header>

      {/* FlatList com exibição em duas colunas e com scroll */}
      <FlatList
  data={[{ isNewListButton: true }, ...lists]}
  keyExtractor={(item, index) => index.toString()}
  numColumns={2}
  contentContainerStyle={{
    paddingTop: 150,
    paddingHorizontal: 10,
    paddingRight: 190,
    justifyContent: 'flex-start', // Alinha o conteúdo ao início
  }}
  columnWrapperStyle={{
    justifyContent: 'flex-start',
    margin: 10 // Mantém os itens da linha alinhados à esquerda
  }}
  renderItem={({ item }) =>
    item.isNewListButton ? (
      <ThinNewListButton onPress={() => navigation.navigate('CreateFromCollection')}>
        <PlusIcon name="plus" />
        <NewListText>Nova Lista</NewListText>
      </ThinNewListButton>
    ) : (
      <CreatedListButton onPress={() => navigation.navigate('EditList', { list: item })}>
        <CreatedListText>{item.name}</CreatedListText>
        <ChevronIcon name="chevron-right" />
      </CreatedListButton>
    )
  }
/>

    </ScreenContainer>
  );
}


function BuyScreen() {
  const { lists } = React.useContext(ListContext);
  const navigation = useNavigation();

  // if(lists.length === 0){
  //   return Alert.alert('','Você ainda não tem listas!',[
  //     {text: "Ok",
  //       onPress: () => navigation.navigate('home')
  //     }
  //   ]);
  // }else{
    return(
      <View style={{flex: 1}}>
        <Header edges={['top']} style={{flex: 1}}>
          <SubHeaderText>Escolha sua lista!</SubHeaderText>
          <HeaderText>
            Sua organização na palma da sua mão
            <ShoppingIcon name="shopping-cart" size={24} />
          </HeaderText>
        </Header>
        <FlatList 
          style={{flex: 1, marginTop: 140}}
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
  // }
}


// Tela de Criação de Lista (para ambas: Home e Collection)
function CreateScreen({ navigation, route }) {
  const { addList } = React.useContext(ListContext);  // Acessa a função addList do contexto
  const [listName, setListName] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    if (itemName.trim() !== '') {
      const newItem = { name: itemName, quantity: itemQuantity };
      setItems((prevItems) => [...prevItems, newItem]);
      setItemName('');
      setItemQuantity(1);
    } else {
      Alert.alert('','O nome do item não pode estar vazio.');
    }
    console.log(items)
  };

  const handleCancel = () => {
    navigation.goBack(); // Volta para a tela anterior sem salvar
  };

  const handleConclude = () => {
    if (listName.trim() !== '') {
      const newList = { name: listName, items: items };
      addList(newList); // Adiciona a lista usando a função do contexto
      // Navega para a tela de Collection após a criação, independentemente de onde veio (Home ou Collection)
      navigation.goBack();
    } else {
      Alert.alert('','O nome da lista não pode estar vazio.');
    }
  };

  return (
  <View style={{ flex: 1 }}>
    <Header edges={['top']}>
      <MainHeaderText> 
        Nova lista
        <HeaderShoppingIcon name='shopping-bag'/>
      </MainHeaderText>
    </Header>

    <Body>
      <ListNameInput
        placeholder="Nome da Lista"
        value={listName}
        onChangeText={(text) => setListName(text)}
      />

      <View style={{ flexDirection: 'column', width:"90%",alignSelf:"center", backgroundColor:"black",height:400, padding:28,borderRadius:20 }}>
        <View style={{flexDirection: 'row', width: "100%"}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf:"flex-start"}}>
            <QtdButton 
              title="-" 
              onPress={() => setItemQuantity(Math.max(1, itemQuantity - 1))} 
              color="#79FC86" // Define fundo transparente
            />
            <Text style={{ marginHorizontal: 8, color:"white" }}>{itemQuantity}</Text>
            <QtdButton 
              title="+" 
              onPress={() => setItemQuantity(itemQuantity + 1)} 
              color="#79FC86" // Define fundo rede
            />
          </View>

          <TextInput 
            style={{
              padding: 4,
              paddingLeft:10,
              borderColor: "#79FC86",
              borderWidth: 2,
              flex: 1,
              marginHorizontal: 14,
              borderRadius:14,
              color: "white",
              alignSelf:"flex-start"
            }}
            placeholder="Nome do Item"
            value={itemName}
            onChangeText={(text) => setItemName(text)}
            placeholderTextColor={"gray"}
          />

          <TouchableOpacity style={{alignSelf:"flex-start"}} onPress={handleAddItem}><AddIcon name='plus-square'/></TouchableOpacity>
        </View>

        <FlatList
          style={{flex: 1, marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: "white"}}
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{flex: 1, flexDirection: "row", gap: 50}}>
              <Text style={{color: "white", fontSize: 24 }}>{item.quantity}</Text>
              <Text style={{color: "white", fontSize: 24}}>{item.name}</Text>
            </View>
          )}
        />


      
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="Cancelar" onPress={handleCancel} color="red" />
        <Button title="Criar" onPress={handleConclude} />
      </View>
    </Body>
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
      <ListNameInput
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
      <CollectionStack.Screen name="collection" component={CollectionScreen} />
      <CollectionStack.Screen name="CreateFromCollection" component={CreateScreen} />
      <CollectionStack.Screen name="EditList" component={EditListScreen} />
    </CollectionStack.Navigator>
  );
}


// Configurar Tabs e Provider para compartilhar o estado das listas
export default function App() {
  let [fontsLoaded] = useFonts({
    Lexend_400Regular,
  });

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
    <ListContext.Provider value={{ lists, addList, deleteList, updateItem, updateList }}>
      <Tab.Navigator tabBar={(props) => (
        <StyledTabBar {...props}>
          {props.state.routes.map((route, index) => {
            const isFocused = index === props.state.index;

            const onPress = () => {
              const event = props.navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                props.navigation.navigate(route.name);
              }
            };

            return (
              <TabButton key={index} onPress={onPress}>
                <TabIcon name={route.name === 'Home' ? 'home' : 'archive'} focused={isFocused} size={24} />
                <Text style={{ color: isFocused ? 'green' : 'white' }}>{route.name}</Text>
              </TabButton>
            );
          })}
        </StyledTabBar>
      )}>
        <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Collection" component={CollectionStackScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </ListContext.Provider>
  );
}


const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});