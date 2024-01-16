import { ScrollView, StyleSheet, View, Image, SafeAreaView } from "react-native";
import { Button, IconButton, Text, } from 'react-native-paper';
import Row from "../components/Row";
import Col from "../components/Col";
import { vh, vw } from "../constants/device";
import { useTheme } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";


export default function HomeScreen() {
    const { colors } = useTheme();
    const navigation = useNavigation();

    const images = [
        { id: 1, source: require("../../assets/tab1samp/01.png") },
        { id: 2, source: require("../../assets/tab1samp/02.png") },
        { id: 3, source: require("../../assets/tab1samp/03.png") },
        { id: 4, source: require("../../assets/tab1samp/04.png") },
        { id: 5, source: require("../../assets/tab1samp/05.png") },
        { id: 6, source: require("../../assets/tab1samp/06.png") },
    ];
    return (
        <SafeAreaView style={{...styles.container, backgroundColor: colors.background}}>
            <View style={styles.content}>

                <Row MD={1} spaceBetween>
                    <Col MD={5}>
                        <Text variant="headlineLarge">
                            Avatares
                        </Text>
                    </Col>
                    <Col MD={3}>
                        <Button icon="diamond" mode="contained" onPress={() => navigation.navigate("GetPro")}>
                            PRO
                        </Button>
                    </Col>
                    <Col MD={1}>
                        <IconButton icon="cog" mode="contained-tonal" onPress={() => { }} />
                    </Col>
                </Row>

                <Row MD={12} justifyContent="center">

                    {images.map((image, index) => (
                        <View key={image.id} style={[styles.imageContainer, index % 2 === 0 ? styles.rightMargin : styles.leftMargin]}>
                            <Image source={image.source} style={styles.image} />
                        </View>
                    ))}
                </Row>

                <Row MD={1}>
                    <Text variant="titleLarge" style={{ width: "100%", textAlign: "center" }}>
                        Avatares de <Text style={{ color: colors.primary, fontWeight: "bold" }}>IA</Text>
                    </Text>
                </Row>
                <Row MD={1}>
                    <Text variant="bodyMedium" style={{ width: "100%", textAlign: "center" }}>
                        Transforme suas fotos em avatares sensacionais usando uma avançada tecnologia de IA
                    </Text>
                </Row>

                <Row MD={1}>
                    <Button mode="contained" style={{ width: "100%" }} onPress={() => { }}>
                        Criar meu avatar
                    </Button>
                </Row>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: vw(100),
    },
    imageContainer: {
        width: "45%",
        aspectRatio: 1,
        marginTop: vw(2)
    },
    rightMargin: {
        marginRight: vw(5),
    },
    leftMargin: {
        marginLeft: vw(1),
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    content: {
        flex: 1,
        paddingHorizontal: vw(3),
    }

});