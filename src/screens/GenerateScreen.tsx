import { View, StyleSheet, SafeAreaView, Image, ScrollView, Pressable, TouchableOpacity } from "react-native";
import Row from "../components/Row";
import { Button, IconButton, Text, useTheme, } from 'react-native-paper';
import Col from "../components/Col";
import { vw } from "../constants/device";
import InputAI from "../components/InputAI/InputAI";
import { RootStackScreenProps } from "../../types";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RewardedAdEventType, RewardedAd, TestIds } from 'react-native-google-mobile-ads';
import language from "../../language";

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-5538301654782962/2037216769';

const rewarded = RewardedAd.createForAdRequest(adUnitId);

export default function GenerateScreen() {

    const { colors } = useTheme();
    const navigation = useNavigation();
    const { texts } = language();

    const [loaded, setLoaded] = useState(false);
    const [inputVisible, setInputVisible] = useState<boolean>(false);

    const categoryImages = [
        {
            source: require("../../assets/tab2samp/tabtwo_sample_01.png"),
            style: "Moderno",
            title: "Abstrato",
            description: "Estilo moderno é um estilo lorem ipsum bla_dar-Car",
            isPro: false
        },
        {
            source: require("../../assets/tab2samp/tabtwo_sample_02.png"),
            style: "Clássico",
            title: "Clássico",
            description: "Estilo classico é um estilo lorem ipsum bla_dar-Car",
            isPro: false
        },
        {
            source: require("../../assets/tab2samp/tabtwo_sample_03.png"),
            style: "Realista",
            title: "Realista",
            description: "Estilo realista é um estilo lorem ipsum bla_dar-Car",
            isPro: true
        },
    ];

    const mostUsedImages = [
        { source: require("../../assets/tab2samp/tabtwo_sample_04.png"), title: "Anime", isPro: true },
        { source: require("../../assets/tab2samp/tabtwo_sample_05.png"), title: "Vídeo game", isPro: false },
    ];

    const handleGenerate = (prompt: string, category: string) => {
        setInputVisible(false);
        navigation.navigate("LoadingImage", { prompt: prompt, style: category });
    };

    useEffect(() => {
        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setLoaded(true);
        });

        const unsubscribeEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            reward => {
                console.log('User earned reward of ', reward);
            },
        );

        rewarded.load();

        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
        };
    }, []);


    return (
        <SafeAreaView style={{ ...styles.container, backgroundColor: colors.background }}>
            <ScrollView style={styles.content}>
                <Row MD={2} spaceBetween>
                    <Col MD={5}>

                        <Text variant="headlineLarge" >
                            {texts("gerar")}
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
                <Row MD={1} style={{ marginVertical: vw(2) }}>
                    <Col MD={1}>
                        <Text variant="labelLarge">
                            {texts("deixeIaDecidir")}
                        </Text>
                    </Col>
                    <Col MD={1} alignItems="flex-end">
                        <Text variant="labelLarge">
                            {texts("imagem")}
                        </Text>
                    </Col>
                </Row>

                <Button onPress={() => {
                    console.log(loaded);
                    if (loaded) {
                        rewarded.show();
                    }
                }}>
                    {texts("teste")}
                </Button>
                <Row MD={1}>
                    <ScrollView horizontal>
                        {
                            categoryImages.map((data, index) =>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("Prompt", { description: data.description, imageSample: data.source, style: data.title, title: data.title })}
                                    key={index}
                                >
                                    <Image source={data.source} style={styles.categoryImage} />
                                    <Text variant="labelLarge">
                                        {data.title}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    </ScrollView>
                </Row>

                <Row MD={1.5}>
                    <Text variant="headlineMedium" style={{ marginBottom: vw(5) }}>
                        {texts("maisUsados")}
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
                    <Text variant="headlineMedium" style={{ marginBottom: vw(5) }}>
                        {texts("sugestoesCriador")}
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
    },
    bottomBanner: {
        position: "absolute",
        bottom: 0
    },
});
