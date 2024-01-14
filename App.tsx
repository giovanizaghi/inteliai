import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import NavigationApp from './index';

const theme = {
  ...DefaultTheme,
  ...DefaultTheme.colors,
  colors: {
    primary: '#C30BD3',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
        <NavigationApp />
    </PaperProvider>
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
