import { StyleSheet, SafeAreaView } from "react-native";
import { useTheme, } from 'react-native-paper';
import { vw } from "../constants/device";
import { RootStackScreenProps } from "../../types";
import { useNavigation } from "@react-navigation/native";

export default function PromptScreen() {
    const { colors } = useTheme();
    const { navigation, route } = useNavigation<RootStackScreenProps<'Prompt'>>();



    return (
        <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    content: {
        paddingHorizontal: vw(3),
        width: vw(100),
    },
    input: {
        borderWidth: 2,
        width: "100%",
        height: vw(25),
        borderRadius: 12,
        paddingHorizontal: vw(5)
    },
    categoryImage: {
        marginRight: vw(5),
        borderRadius: 10,
    },
    largeImage: {
        marginRight: vw(5),
        borderRadius: 10,
    }
});
