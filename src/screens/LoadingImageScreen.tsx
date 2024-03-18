import { StyleSheet, View } from "react-native";
import { RootStackScreenProps } from "../../types";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { vw } from "../constants/device";
import { OpenAI, eModel, eQuality, eResponseFormat, eSize, eStyle } from "gio-react-native-openai";
import language from "../../language";

export default function LoadingImageScreen({ navigation, route }: RootStackScreenProps<'LoadingImage'>) {
    const { texts } = language();
    const { colors } = useTheme();
    const { prompt, style } = route?.params;
    const openai = new OpenAI(process.env.EXPO_PUBLIC_OPENAI, process.env.EXPO_PUBLIC_ORG);

    const handleCreate = useCallback(
        async () => {
            try {
                if (!prompt || !style) return;

                if (__DEV__) {
                    const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDsGqi0HpRiSqlcThGJRn-3h9z6oVTxnV3bw&usqp=CAU";
                    navigateToViewPage(image);
                    return;
                }

                const completePrompt = `${prompt}`;

                const response = await openai.images.createImage(
                    completePrompt,
                    eModel.DallE2,
                    1,
                    eQuality.standard,
                    eResponseFormat.url,
                    eSize._256x256,
                    eStyle.vivid,
                    "giovani");

                console.log("DATA", response);
                if (!response) return;
                const image = response[0].url;
                navigateToViewPage(image);
                return;
            }
            catch (e) {
                navigation.pop();
            }
        },
        [prompt, style],
    );


    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", (a) =>{
            handleCreate();
        });

        return unsubscribe;
    }, [navigation]);

    const navigateToViewPage = useCallback(
      (imageUrl: string) => {

        setTimeout(() => {
            //TODO: se for PRO espera menos

            navigation.navigate("GeneratedImage", {
                prompt: prompt,
                image: imageUrl,
                style: style
            });
        }, 5000);
      },
      [prompt, style],
    );

    return (
        <View style={{ ...styles.containerLoading, backgroundColor: colors.background }}>
            <ActivityIndicator style={{ marginBottom: vw(10) }} />
            <Text variant="bodyLarge">
                {texts("mensagemAguardoGerandoImaegem")}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerLoading: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
});
