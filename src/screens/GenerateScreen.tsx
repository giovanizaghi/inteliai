import { View, StyleSheet, SafeAreaView, Image, ScrollView, Pressable } from "react-native";
import Row from "../components/Row";
import { Button, IconButton, Text, useTheme, } from 'react-native-paper';
import Col from "../components/Col";
import { vw } from "../constants/device";
import InputAI from "../components/InputAI/InputAI";
import { RootStackScreenProps } from "../../types";
import { useState } from "react";

export default function GenerateScreen({ navigation }: RootStackScreenProps<'Generate'>) {
    const { colors } = useTheme();

    const categoryImages = [
        { source: require("../../assets/tab2samp/tabtwo_sample_01.png"), title: "Moderno", isPro: false },
        { source: require("../../assets/tab2samp/tabtwo_sample_02.png"), title: "Clássico", isPro: false },
        { source: require("../../assets/tab2samp/tabtwo_sample_03.png"), title: "Realista", isPro: true },
    ];

    const mostUsedImages = [
        { source: require("../../assets/tab2samp/tabtwo_sample_04.png"), title: "Anime", isPro: true },
        { source: require("../../assets/tab2samp/tabtwo_sample_05.png"), title: "Vídeo game", isPro: false },
    ];

    const [inputVisible, setInputVisible] = useState<boolean>(false);

    const handleGenerate = (prompt: string, category: string) => {
        setInputVisible(false);
        navigation.navigate("GeneratedImage", { prompt: prompt, style: category });
    };

    return (
        <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
            <ScrollView style={styles.content}>
                <Row MD={2} spaceBetween>
                    <Col MD={5}>
                        <Text variant="headlineLarge" >
                            Gerar
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
                <Row MD={2}>
                    <Pressable style={{ borderColor: colors.primary, ...styles.input }} onPress={() => setInputVisible(v => !v)}>
                    </Pressable>
                </Row>
                <Row MD={1} style={{marginVertical: vw(2)}}>
                    <Col MD={1}>
                        <Text variant="labelLarge">
                            Deixe a IA decidir
                        </Text>
                    </Col>
                    <Col MD={1} alignItems="flex-end">
                        <Text variant="labelLarge">
                            Imagem
                        </Text>
                    </Col>
                </Row>
                <Row MD={1}>
                    <ScrollView horizontal>
                        {
                            categoryImages.map((data, index) =>
                                <View key={index}>
                                    <Image source={data.source} style={styles.categoryImage} />
                                    <Text variant="labelLarge">
                                        {data.title}
                                    </Text>
                                </View>
                            )
                        }
                    </ScrollView>
                </Row>

                <Row MD={1}>
                    <Text variant="headlineMedium">
                        Mais usados
                    </Text>
                </Row>

                <Row MD={1}>
                    <ScrollView horizontal>
                        {
                            mostUsedImages.map((data, index) =>
                                <View key={index}>
                                    <Image source={data.source} style={styles.largeImage} />
                                    <Text variant="labelLarge">
                                        {data.title}
                                    </Text>
                                </View>
                            )
                        }
                    </ScrollView>
                </Row>

                <Row MD={1}>
                    <Text variant="headlineMedium">
                        Sujestões do criador
                    </Text>
                </Row>

            </ScrollView>

            <InputAI
                visible={inputVisible}
                handleGenerate={handleGenerate}
                handleClosePress={() => setInputVisible(v => !v)}
            />
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
