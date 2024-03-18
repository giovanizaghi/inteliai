import { StyleSheet, View, Image, SafeAreaView, TouchableOpacity } from "react-native";
import { RootStackScreenProps } from "../../types";
import React, { useCallback, useEffect, useState } from "react";
import { IconButton, Switch, Text, useTheme } from "react-native-paper";
import Row from "../components/Row";
import { vw } from "../constants/device";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from "expo-file-system";
import { Feather, MaterialIcons, Octicons } from "@expo/vector-icons";
import Col from "../components/Col";
import * as Sharing from 'expo-sharing';
import { RewardedAdEventType, RewardedAd, TestIds } from 'react-native-google-mobile-ads';
import language from "../../language";

export default function GeneratedImageScreen({ navigation, route }: RootStackScreenProps<'GeneratedImage'>) {
    const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-5538301654782962/2037216769';
    const rewarded = RewardedAd.createForAdRequest(adUnitId);

    const { texts } = language();
    const { colors } = useTheme();
    const { prompt, style, image } = route?.params;

    const [permissionStatus, setPermissionStatus] = useState<MediaLibrary.PermissionStatus | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [removeMark, setRemoveMark] = useState<boolean>(false);


    const shareHandle = useCallback(
        async () => {
            const isAvailable = await Sharing.isAvailableAsync();
            if (!isAvailable) return;

            const localuri = await FileSystem.downloadAsync(
                image,
                FileSystem.documentDirectory + 'InteliAIGenerated.png'
            );

            Sharing.shareAsync(localuri.uri);
        },
        [image],
    );

    const downloadImage = useCallback(
        async () => {
            if (permissionStatus !== MediaLibrary.PermissionStatus.GRANTED) {
                console.error(texts("erroPermissaoGaleria"));
            };

            if (!image) {
                console.error(texts("urlImagemInvalida"));
                return;
            }

            const localuri = await FileSystem.downloadAsync(
                image,
                FileSystem.documentDirectory + 'MyImage.png'
            );
            try {
                const asset = await MediaLibrary.createAssetAsync(localuri.uri);

                asset.mediaType = MediaLibrary.MediaType.photo;
                // Verifica se a imagem já está na biblioteca de fotos
                const album = await MediaLibrary.getAlbumAsync('IntelliAI'); // Substitua 'SeuAlbum' pelo nome desejado do álbum
                if (!album) {
                    // Cria o álbum se ainda não existir
                    await MediaLibrary.createAlbumAsync('IntelliAI', asset, false);
                } else {
                    // Adiciona a imagem ao álbum existente
                    await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                }

                console.log(texts("mensagemImagemSalva"));
            } catch (error) {
                console.error(texts("erroSalvarImagem"), error);
            }
        },
        [permissionStatus, image]
    );

    const generateAnotherHandle = useCallback(
        () => {
            rewarded.show();
        },
        [],
    );

    const removeMarkHandle = useCallback(
        (value: boolean) => {
            //TODO: se for usuario free deve navegar para tela de compra
            setRemoveMark(value);
        },
        [],
    );

    const checkPermission = async () => {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            setPermissionStatus(status);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            rewarded.load();
        });

        return unsubscribe;
    }, [navigation])


    useEffect(() => {
        checkPermission();

        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            console.log("LOADED")
            setLoaded(true);
        });

        const unsubscribeEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            reward => {
                //TODO: generate another image
                navigation.navigate("LoadingImage", {
                    prompt: prompt,
                    style: style
                })
            },
        );

        rewarded.load();

        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
        };
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.background
            }}>
            <View
                style={styles.container}>
                <Row
                    MD={1}>
                    <IconButton
                        size={vw(8)}
                        icon="close"
                        iconColor={colors.onBackground}
                        onPress={() => navigation.popToTop()}
                        style={{ margin: 0 }} />
                </Row>
                <Row
                    MD={1}
                    justifyContent="flex-end">
                    <View
                        style={{
                            ...styles.proArea,
                            backgroundColor: colors.primary,
                            borderTopLeftRadius: 50,
                            borderBottomLeftRadius: 50
                        }}>
                        <Text
                            style={{ color: colors.onPrimary }}
                            variant="bodyLarge">
                            PRO
                        </Text>
                    </View>
                    <View
                        style={{
                            ...styles.proArea,
                            backgroundColor: colors.primaryContainer,
                            borderTopRightRadius: 50,
                            borderBottomRightRadius: 50
                        }}>
                        <Text
                            variant="bodyLarge"
                            style={{
                                marginRight: vw(2),
                                color: colors.onPrimaryContainer
                            }}>
                            {texts("marcaDagua")}
                        </Text>
                        <Switch
                            value={removeMark}
                            color={colors.onPrimaryContainer}
                            onChange={(e) => removeMarkHandle(e.nativeEvent.value)}
                        />
                    </View>
                </Row>
                <Row
                    MD={7}
                    justifyContent="center">
                    {
                        image &&
                        <Image
                            source={{ uri: image }}
                            style={styles.image} />
                    }
                </Row>
                <Row
                    MD={3}>
                    <View
                        style={{
                            ...styles.fakeInput,
                            borderColor: colors.primary
                        }}>
                        <Text
                            variant="bodyLarge"
                            style={{ color: colors.onBackground }}>
                            {prompt}
                        </Text>
                        <Feather
                            name="edit-2"
                            size={vw(5)}
                            color={colors.primary} />
                    </View>
                    <Text
                        style={{ color: colors.onBackground }}
                        variant="labelMedium">
                        {texts("estilo")}: {style}
                    </Text>
                </Row>
                <Row
                    MD={2}
                    justifyContent="space-between">
                    <Col
                        MD={1}
                        alignItems="center">
                        <TouchableOpacity
                            style={{
                                ...styles.roundButton,
                                backgroundColor: colors.primary
                            }}
                            onPress={generateAnotherHandle}>
                            <Feather
                                name="refresh-cw"
                                size={vw(7)}
                                color={colors.onPrimary} />
                        </TouchableOpacity>
                        <Text
                            style={{ color: colors.onBackground }}
                            variant="labelMedium">
                            {texts("gerarNovamente")}
                        </Text>
                        <View style={{
                            position: "absolute",
                            backgroundColor: colors.backdrop,
                            width: vw(8),
                            height: vw(8),
                            borderRadius: 50,
                            alignItems: "center",
                            justifyContent: "center",
                            right: vw(5),
                            top: -vw(3)
                        }}>
                            <MaterialIcons
                                name="ondemand-video"
                                size={vw(5)}
                                color={colors.onPrimary} />
                        </View>
                    </Col>
                    <Col
                        MD={1}
                        alignItems="center">
                        <TouchableOpacity
                            style={{
                                ...styles.roundButton,
                                backgroundColor: colors.primary
                            }}
                            onPress={downloadImage}>
                            <Octicons
                                name="download"
                                size={vw(7)}
                                color={colors.onPrimary} />
                        </TouchableOpacity>
                        <Text
                            style={{ color: colors.onBackground }}
                            variant="labelMedium">
                            {texts("salvar")}
                        </Text>
                    </Col>
                    <Col
                        MD={1}
                        alignItems="center">
                        <TouchableOpacity
                            style={{
                                ...styles.roundButton,
                                backgroundColor: colors.primary
                            }}
                            onPress={shareHandle}>
                            <Octicons
                                name="share"
                                size={vw(7)}
                                color={colors.onPrimary} />
                        </TouchableOpacity>
                        <Text
                            style={{ color: colors.onBackground }}
                            variant="labelMedium">
                            {texts("compartilhar")}
                        </Text>
                    </Col>
                </Row>
            </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    containerLoading: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: vw(5),
    },
    image: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 10
    },
    proArea: {
        paddingHorizontal: vw(2),
        paddingVertical: vw(2),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: vw(10)
    },
    fakeInput: {
        borderWidth: 2,
        width: "100%",
        height: vw(12),
        borderRadius: 10,
        alignItems: "center",
        paddingHorizontal: vw(3),
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: vw(4)
    },
    roundButton: {
        borderRadius: 50,
        width: vw(17),
        height: vw(17),
        justifyContent: "center",
        alignItems: "center",
        marginBottom: vw(1)
    }
});
