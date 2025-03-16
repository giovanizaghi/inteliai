import { useColorScheme } from 'react-native';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import NavigationApp from './index';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { useEffect } from 'react';
import mobileAds from 'react-native-google-mobile-ads';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import useCache from './src/hooks/useCache';

export default function App() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();
  const { addNewDailyFreeImages } = useCache();

  const paperTheme =
    colorScheme === 'dark'
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };

  useEffect(() => {
    (async () => {
      const { status } = await requestTrackingPermissionsAsync();
      if (status === 'granted') {
        mobileAds().initialize();
      }
    })();

    addNewDailyFreeImages();

  }, []);

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationApp />
    </PaperProvider>
  );
}