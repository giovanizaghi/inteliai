import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import GetProScreen from './src/screens/GetProScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from './types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GenerateScreen from './src/screens/GenerateScreen';
import GeneratedImageScreen from './src/screens/GeneratedImageScreen';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Text, useTheme } from 'react-native-paper';
import { vw } from './src/constants/device';
import PromptScreen from './src/screens/PromptScreen';
import LoadingImageScreen from './src/screens/LoadingImageScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function NavigationApp() {
    return (
        <NavigationContainer >
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
            <Stack.Screen name="Prompt" component={PromptScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LoadingImage" component={LoadingImageScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator(): JSX.Element {
    const { colors } = useTheme();

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
                    tabBarIcon: ({ focused }) => <AntDesign name="scan1" size={vw(7)} color={focused ? colors.primary : colors.onBackground} />,
                    tabBarLabel: (focused) =>
                        <Text variant='bodyMedium' style={{ color: focused ? colors.primary : colors.onBackground }}>
                            Avatares
                        </Text>,
                    tabBarStyle: { height: vw(20), backgroundColor: colors.background }
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
                    tabBarIcon: ({ focused }) => <Ionicons name='color-wand-outline' size={vw(7)} color={focused ? colors.primary : colors.onBackground} />,
                    tabBarLabel: (focused) =>
                        <Text variant='bodyMedium' style={{ color: focused ? colors.primary : colors.onBackground }}>
                            Gerar
                        </Text>,
                    tabBarStyle: { height: vw(20), backgroundColor: colors.background }
                }}
            />

        </BottomTab.Navigator>
    );
}