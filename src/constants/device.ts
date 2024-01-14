import { Dimensions } from 'react-native';

export function vw(value: number) {
    return ((value / 100) * Dimensions.get('window').width);
}

export function vh(value: number) {
    return ((value / 100) * Dimensions.get('window').height);
}
