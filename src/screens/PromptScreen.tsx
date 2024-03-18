import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { IconButton, Text, useTheme, } from 'react-native-paper';
import { vw } from "../constants/device";
import { RootStackScreenProps } from "../../types";
import Row from "../components/Row";
import Col from "../components/Col";
import { FontAwesome } from "@expo/vector-icons";
import language from "../../language";
import { useCallback } from "react";

export default function PromptScreen({ route, navigation }: RootStackScreenProps<'Prompt'>) {
    const { texts } = language();

    const {
        description,
        imageSample,
        title,
        style,
        isPro
    } = route?.params;

    const { colors } = useTheme();

    const buttonHandle = useCallback(
        () => {

            navigation.navigate("LoadingImage", {
                prompt: description,
                style: style,
            })
        },
        [description, style],
    );

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: colors.background
            }}>

            <Image
                source={imageSample}
                style={styles.image}
            />

            <View
                style={styles.topBar}>
                <IconButton
                    icon="close"
                    iconColor="#FFF"
                    onPress={() => navigation.pop()} />
            </View>


            <View
                style={styles.textArea}>
                <Row MD={1}>

                    <Text variant="titleSmall">
                        {texts("estilo")}: {style}
                    </Text>

                </Row>

                <Row MD={1}>
                    <Text variant="titleMedium">
                        Prompt
                    </Text>
                </Row>

                <Row MD={4}>
                    <Text variant="bodyMedium">
                        {description}
                    </Text>
                </Row>

                <Row MD={2}>

                    <TouchableOpacity
                        style={{ width: "100%" }}
                        onPress={buttonHandle}>
                        <View
                            style={{
                                backgroundColor: colors.primary,
                                ...styles.button
                            }}>

                            {
                                isPro &&
                                <Col
                                    MD={2}
                                    alignItems="flex-start">

                                    <View
                                        style={{
                                            backgroundColor: colors.backdrop,
                                            padding: vw(1),
                                            borderRadius: 50,
                                            width: vw(10),
                                            height: vw(10),
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>

                                        <FontAwesome
                                            name="diamond"
                                            size={vw(6)}
                                            color={colors.onPrimary} />

                                    </View>
                                </Col>
                            }

                            <Col
                                MD={8}
                                alignItems="center">

                                <Row justifyContent="center">

                                    <Text
                                        variant="titleLarge"
                                        style={{ color: colors.onPrimary }}>
                                        {texts("testeEstePrompt").toUpperCase()}
                                    </Text>
                                </Row>
                                {
                                    isPro &&
                                    <Row
                                        justifyContent="center">
                                        <Text
                                            variant="titleSmall"
                                            style={{
                                                color: colors.onPrimary
                                            }}>
                                            {texts("com")} PRO
                                        </Text>
                                    </Row>
                                }
                            </Col>
                        </View>
                    </TouchableOpacity>
                </Row>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    image: {
        width: "100%",
        aspectRatio: 1,
        height: vw(100),
    },
    topBar: {
        position: "absolute",
        top: vw(12),
        left: vw(4),
        backgroundColor: "rgba(0,0,0,.5)",
        borderRadius: 50
    },
    textArea: {
        alignItems: "flex-start",
        flex: 1,
        paddingHorizontal: vw(4)
    },
    button: {
        borderWidth: 1,
        borderRadius: 100,
        width: "100%",
        justifyContent: "center",
        alignItems: 'center',
        paddingVertical: vw(3),
        paddingHorizontal: vw(8),
        flexDirection: "row",
    },
});
