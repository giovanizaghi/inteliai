import { StyleSheet, useColorScheme } from 'react-native';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import NavigationApp from './index';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';

export default function App() {
  const colorScheme = "dark";
  const { theme } = useMaterial3Theme();

  const paperTheme =
    colorScheme === 'dark'
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };

  return (
    <PaperProvider theme={paperTheme}>
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
