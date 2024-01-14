
import { View, StyleSheet, TextInput, ScrollView, Image, Pressable } from "react-native";
import Modal from "react-native-modal";
import Row from "../Row";
import Col from "../Col";
import { IconButton, Text } from "react-native-paper";
import { vw } from "../../constants/device";
import { useCallback, useState } from "react";

interface InputAIProps {
    visible: boolean;
    handleGenerate: (prompt: string, category: string) => void;
    handleClosePress: () => void;
}
export default function InputAI({ visible, handleGenerate, handleClosePress }: InputAIProps) {
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

    return (
        <Modal isVisible={visible} style={{ margin: 0 }}>
            <View style={styles.container}>
                <Row MD={1}>
                    <Col MD={1} alignItems="flex-start">
                        <IconButton size={vw(8)} icon="close" iconColor="#000" onPress={handleClosePress} style={{ margin: 0 }} />
                    </Col>
                    <Col MD={1} alignItems="flex-end">
                        <Text variant="labelLarge">
                            Limpar tudo
                        </Text>
                    </Col>
                </Row>
                <Row MD={5}>
                    <TextInput
                        numberOfLines={10}
                        lineBreakStrategyIOS="hangul-word"
                        textBreakStrategy="highQuality"
                        style={{ width: "100%", height: "100%" }}
                        value={prompt}
                        onChangeText={setPrompt} />
                </Row>
                <Row MD={2}>
                    <Text variant="titleMedium">
                        Categorias disponíveis.
                    </Text>
                </Row>

                <Row MD={2}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {
                            categoryImages.map((data, index) =>
                                <Pressable key={index} style={{ marginRight: vw(5) }} onPress={() => handleCategory(data.title)}>
                                    <Image source={data.source} />
                                </Pressable>
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
        paddingHorizontal: vw(5)
    }
});