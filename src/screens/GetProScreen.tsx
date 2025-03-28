import { StyleSheet, View, Image, Pressable } from "react-native";
import { IconButton, Text, } from 'react-native-paper';
import Row from "../components/Row";
import Col from "../components/Col";
import { vh, vw } from "../constants/device";
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { RootStackScreenProps } from "../../types";
import language from "../../language";

export default function GetProScreen({ navigation }: RootStackScreenProps<'GetPro'>) {
    const { colors } = useTheme();
    const { texts } = language();

    // const Icon = () => <EllipseMarker width={vw(5)} height={vw(5)} fill={colors.onPrimary} />;
    const Icon = () => <View />;

    const Marker = () => <View style={{ borderColor: colors.primary, ...styles.markerPay }}>
        <View style={{ backgroundColor: colors.primary, ...styles.markerPaySelect }} />
    </View>;

    const messages = [
        texts("obterProVantagem1"),
        texts("obterProVantagem2"),
        texts("obterProVantagem3"),
        texts("obterProVantagem4"),
    ];

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <Row MD={3}>
                <Image source={require("../../assets/getprosamp/pro_ad.png")} style={styles.imageContainer} />
            </Row>
            <Row MD={0.45}>
                <Text variant="headlineSmall" style={{ color: "#fff" }}>
                    {texts("obtenhaAcessoCompleto").toUpperCase()}
                </Text>
            </Row>
            {
                messages.map((message, i) =>
                    <Row key={`${i}`} MD={0.4}>
                        <Col MD={1}>
                            <Text>
                                <Icon />
                            </Text>
                        </Col>
                        <Col MD={10}>
                            <Row>
                                {
                                    message.split("-").map((t, i) => (<Text key={`a${i}`} variant="bodyLarge" style={{ color: i === 0 ? "#fff" : colors.primary }}>{t}</Text>))
                                }

                            </Row>
                        </Col>
                    </Row>
                )
            }

            <Row MD={2.5}>
                <Pressable style={{ width: "100%" }}>
                    <View style={{ borderColor: colors.primary, ...styles.button }}>
                        <Col MD={10}>
                            <Row>
                                <Text variant="titleLarge" style={{ color: "#fff" }}>
                                    3 {texts("diasDeTesteGratis")}
                                </Text>
                            </Row>
                            <Row>
                                <Text variant="titleSmall" style={{ color: "#fff" }}>
                                    {texts("depois")} R$ 24,90/{texts("semana")}
                                </Text>
                            </Row>
                        </Col>
                        <Col MD={1}>
                            <Marker />
                        </Col>
                    </View>

                </Pressable>

                <Pressable style={{ width: "100%", marginTop: vw(8) }}>
                    <View style={{ borderColor: "transparent", ...styles.button }}>

                        <Col MD={10}>
                            <Row>
                                <Text variant="titleLarge" style={{ color: "#fff" }}>
                                    {texts("acessoVitalicio").toUpperCase()}
                                </Text>
                            </Row>
                            <Row>
                                <Text variant="titleSmall" style={{ color: "#fff" }}>
                                    R$ 149,90 {texts("pagamentoUnico")}
                                </Text>
                            </Row>
                        </Col>
                        <Col MD={1}>
                            <Marker />
                        </Col>
                    </View>
                    <View style={{ backgroundColor: colors.primary, ...styles.offer }}>
                        <Text style={{ color: "#FFF" }}>
                            {texts("ofertaEspecial")}
                        </Text>
                    </View>
                </Pressable>
            </Row>

            <View style={styles.topBar}>
                <IconButton icon="close" iconColor="#FFF" onPress={() => navigation.pop()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: vw(4),
        backgroundColor: "#000",
    },
    imageContainer: {
        width: "100%",
        height: vh(40),
        position: "absolute",
        aspectRatio: 1,
    },
    button: {
        borderWidth: 1,
        borderRadius: 100,
        width: "100%",
        justifyContent: "center",
        alignItems: 'center',
        paddingVertical: vw(2),
        paddingHorizontal: vw(8),
        flexDirection: "row",
    },
    markerPay: {
        borderWidth: 2,
        width: vw(8),
        height: vw(8),
        borderRadius: vw(8),
        alignItems: "center",
        justifyContent: "center"
    },
    markerPaySelect: {
        width: vw(5),
        height: vw(5),
        borderRadius: vw(7)
    },
    offer: {
        position: "absolute",
        right: 0,
        top: -vw(2.5),
        paddingHorizontal: vw(2),
        paddingVertical: vw(1),
        borderRadius: 100
    },
    topBar: {
        position: "absolute",
        top: vw(10),
        right: vw(4)
    }
});