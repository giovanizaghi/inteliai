
import { View, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import Modal from "react-native-modal";
import Row from "../Row";
import Col from "../Col";
import { IconButton, Text, useTheme } from "react-native-paper";
import { vw } from "../../constants/device";
import { useCallback, useEffect, useRef, useState } from "react";
import language from "../../../language";

interface InputAIProps {
    visible: boolean;
    handleGenerate: (prompt: string, category: string) => void;
    handleClosePress: () => void;
}
export default function InputAI({
    visible,
    handleGenerate,
    handleClosePress
}: InputAIProps) {

    const { colors } = useTheme();
    const { texts } = language();
    const inputRef = useRef<TextInput>();

    const categoryImages = [
        {
            source: require("../../../assets/inputsamp/input_sample_01.png"),
            title: texts("realista"),
            isPro: false
        },
        {
            source: require("../../../assets/inputsamp/input_sample_02.png"),
            title: texts("videoGame"),
            isPro: false
        },
        {
            source: require("../../../assets/inputsamp/input_sample_03.png"),
            title: texts("natureza"),
            isPro: false
        },
    ];

    const [prompt, setPrompt] = useState<string>();
    const [isFocused, setIsFocused] = useState(false);

    const handleCategory = useCallback(
        async (category: string) => {
            if (!category || !prompt) {
                inputRef.current.focus();
                return;
            }

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


    useEffect(() => {
        if (!inputRef.current) return;

        inputRef.current.focus();

    }, [inputRef]);


    return (
        <Modal isVisible={visible} style={{ margin: 0 }}>
            <View style={{ ...styles.container, backgroundColor: colors.background }}>

                <Row MD={2} style={{ paddingHorizontal: vw(5) }}>
                    <Col MD={1} alignItems="flex-start">
                        <IconButton size={vw(8)} icon="close" iconColor={colors.onBackground} onPress={handleClosePress} style={{ margin: 0 }} />
                    </Col>
                    <Col MD={1} alignItems="flex-end">
                        <TouchableOpacity onPress={handleClean}>
                            <Text variant="labelLarge" style={{ color: colors.primary }}>
                                {texts("limparTudo")}
                            </Text>
                        </TouchableOpacity>
                    </Col>
                </Row>

                <Row MD={isFocused ? 3 : 8} style={{ paddingHorizontal: vw(5) }}>
                    <TextInput
                        ref={r => inputRef.current = r}
                        placeholder={texts("insiraSeuTextoAqui")}
                        numberOfLines={10}
                        multiline
                        lineBreakStrategyIOS="hangul-word"
                        textBreakStrategy="highQuality"
                        placeholderTextColor={colors.onBackground}
                        style={{
                            ...styles.textInput,
                            color: colors.onBackground
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        value={prompt}
                        onChangeText={setPrompt} />
                </Row>

                <Row style={{ backgroundColor: colors.surfaceVariant, paddingHorizontal: vw(5) }}>
                    <Text variant="titleMedium" style={{ color: colors.onSurfaceVariant, marginBottom: vw(5) }}>
                        {texts("categoriasDisponiveis")}
                    </Text>
                </Row>

                <Row MD={isFocused ? 6 : 2} style={{ backgroundColor: colors.surfaceVariant }}>

                    <ScrollView
                        horizontal
                        style={{ paddingHorizontal: vw(5) }}
                        showsHorizontalScrollIndicator={false}>
                        {
                            categoryImages.map((data, index) =>
                                <TouchableOpacity
                                    key={`${index}`}
                                    style={styles.categories}
                                    onPress={() => handleCategory(data.title)}>

                                    <Image
                                        source={data.source}
                                        style={styles.categoryImage} />

                                    <View
                                        style={styles.categoryImageShadow}
                                    />

                                    <Text
                                        style={styles.categoryTitle}
                                        variant="titleMedium">
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
        paddingVertical: vw(12),
        paddingTop: vw(10),
        flex: 1,
    },
    categories: {
        marginRight: vw(5),
        width: vw(30),
        height: vw(15),
        justifyContent: "center"
    },
    categoryImage: {
        width: vw(30),
        height: vw(15),
        borderRadius: 10
    },
    categoryImageShadow: {
        backgroundColor: "rgba(0,0,0,.4)",
        width: vw(30),
        height: vw(15),
        position: "absolute",
        borderRadius: 10
    },
    categoryTitle: {
        position: "absolute",
        color: "white",
        width: "100%",
        textAlign: "center"
    },
    textInput: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
    }
});