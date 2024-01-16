
import { View, StyleSheet, TextInput, ScrollView, Image, Pressable, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Row from "../Row";
import Col from "../Col";
import { IconButton, Text, useTheme } from "react-native-paper";
import { vw } from "../../constants/device";
import { useCallback, useState } from "react";
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';

interface InputAIProps {
    visible: boolean;
    handleGenerate: (prompt: string, category: string) => void;
    handleClosePress: () => void;
}
export default function InputAI({ visible, handleGenerate, handleClosePress }: InputAIProps) {
    const { colors } = useTheme();

    const categoryImages = [
        { source: require("../../../assets/inputsamp/input_sample_01.png"), title: "Realista", isPro: false },
        { source: require("../../../assets/inputsamp/input_sample_02.png"), title: "Video game", isPro: false },
        { source: require("../../../assets/inputsamp/input_sample_03.png"), title: "Natureza", isPro: false },
    ];

    const [prompt, setPrompt] = useState<string>();

    const handleCategory = useCallback(
        async (category: string) => {
            handleGenerate(prompt, category);
        },
        [prompt],
    );
    const handleClean = useCallback(
        () => {
            setPrompt("");
        },
        [],
    );


    return (
        <Modal isVisible={visible} style={{ margin: 0 }}>
            <View style={{ ...styles.container, backgroundColor: colors.background }}>
                <Row MD={1} style={{paddingHorizontal: vw(5)}}>
                    <Col MD={1} alignItems="flex-start">
                        <IconButton size={vw(8)} icon="close" iconColor={colors.onBackground} onPress={handleClosePress} style={{ margin: 0 }} />
                    </Col>
                    <Col MD={1} alignItems="flex-end">
                        <TouchableOpacity onPress={handleClean}>
                            <Text variant="labelLarge" style={{ color: colors.primary }}>
                                Limpar tudo
                            </Text>
                        </TouchableOpacity>
                    </Col>
                </Row>
                <Row MD={8} style={{paddingHorizontal: vw(5)}}>
                    <TextInput
                        placeholder="Insira seu texto aqui"
                        numberOfLines={10}
                        multiline
                        lineBreakStrategyIOS="hangul-word"
                        textBreakStrategy="highQuality"
                        placeholderTextColor={colors.onBackground}
                        style={{ width: "100%", height: "100%", justifyContent: "flex-start", color: colors.onBackground }}
                        value={prompt}
                        onChangeText={setPrompt} />
                </Row>

                <Row style={{ backgroundColor: colors.surfaceVariant, paddingHorizontal: vw(5) }}>
                    <Text variant="titleMedium" style={{ color: colors.onSurfaceVariant, marginBottom: vw(5) }}>
                        Categorias disponíveis
                    </Text>
                </Row>

                <Row MD={2} style={{ backgroundColor: colors.surfaceVariant }}>
                    <ScrollView
                        horizontal
                        style={{ paddingHorizontal: vw(5) }}
                        showsHorizontalScrollIndicator={false}>
                        {
                            categoryImages.map((data, index) =>
                                <TouchableOpacity key={index} style={{ marginRight: vw(5), width: vw(30), height: vw(15), justifyContent: "center" }} onPress={() => handleCategory(data.title)}>
                                    <Image source={data.source} style={{ width: vw(30), height: vw(15), borderRadius: 10 }} />
                                    <View style={{ backgroundColor: "rgba(0,0,0,.4)", width: vw(30), height: vw(15), position: "absolute", borderRadius: 10 }} />
                                    <Text style={{ position: "absolute", color: "white", width: "100%", textAlign: "center" }} variant="titleMedium">
                                        {data.title}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    </ScrollView>
                </Row>

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: vw(10),
    }
});