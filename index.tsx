import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import GetProScreen from './src/screens/GetProScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from './types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GenerateScreen from './src/screens/GenerateScreen';
import GeneratedImageScreen from './src/screens/GeneratedImageScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function NavigationApp() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
}

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="GetPro" component={GetProScreen} options={{ headerShown: false, animation: "slide_from_bottom" }} />
            <Stack.Screen name="Generate" component={GenerateScreen} options={{ headerShown: false, animation: "slide_from_bottom" }} />
            <Stack.Screen name="GeneratedImage" component={GeneratedImageScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator(): JSX.Element {

    return (
        <BottomTab.Navigator initialRouteName="TabOne">
            <BottomTab.Screen
                name="TabOne"
                component={HomeScreen}
                options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
                    title: "Avatares",
                    headerTitle: "",
                    headerShown: false,
                    unmountOnBlur: false,
                })}
            />

            <BottomTab.Screen
                name="TabTwo"
                component={GenerateScreen}
                options={{
                    title: "Gerar",
                    unmountOnBlur: false,
                    headerShown: false,
                    headerTitle: "",
                }}
            />

        </BottomTab.Navigator>
    );
}