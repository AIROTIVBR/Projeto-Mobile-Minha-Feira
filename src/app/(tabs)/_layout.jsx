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
                name="History"
                options={{
                title: 'History',
                tabBarIcon: ({ color }) => <Feather name="clock" size={24} color={color} />,
                headerShown: false
                }}
            />
        </Tabs>
    );
}