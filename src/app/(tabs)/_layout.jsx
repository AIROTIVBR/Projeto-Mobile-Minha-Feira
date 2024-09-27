import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function TabsLayout() {

    return(
        <Tabs screenOptions={{ tabBarActiveTintColor: 'pink' }}>
            <Tabs.Screen
                name="index"
                options={{
                title: 'Home',
                tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="Colection"
                options={{
                title: 'Colection',
                tabBarIcon: ({ color }) => <Feather name="bookmark" size={24} color={color} />,
                headerShown: false
                }}
            />
            <Tabs.Screen
                name="NewList"
                options={{
                title: 'NewList',
                tabBarIcon: ({ color }) => <Feather name="file-plus" size={24} color={color} />,
                headerShown: false
                }}
            />
        </Tabs>
    );
}