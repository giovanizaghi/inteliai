import { StyleSheet, View, Image, SafeAreaView, TouchableOpacity } from "react-native";
import { RootStackScreenProps } from "../../types";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, IconButton, Switch, Text, useTheme } from "react-native-paper";
import Row from "../components/Row";
import { vw } from "../constants/device";
import { OpenAI, eModel, eQuality, eResponseFormat, eSize, eStyle } from "gio-react-native-openai";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from "expo-file-system";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";
import Col from "../components/Col";
import * as Sharing from 'expo-sharing';

export default function GeneratedImageScreen({ navigation, route }: RootStackScreenProps<'GeneratedImage'>) {
    const { colors } = useTheme();
    const { prompt, style } = route?.params;
    const openai = new OpenAI(process.env.EXPO_PUBLIC_OPENAI, process.env.EXPO_PUBLIC_ORG);

    const [loading, setLoading] = useState<boolean>();
    const [imageUrl, setImageUrl] = useState<string>("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDsGqi0HpRiSqlcThGJRn-3h9z6oVTxnV3bw&usqp=CAU");
    const [permissionStatus, setPermissionStatus] = useState<MediaLibrary.PermissionStatus | null>(null);

    const handleCreate = useCallback(
        async () => {
            try {
                setLoading(true);
                if (!prompt || !style) return;

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
                setImageUrl(image);
            }
            catch (e) {
                console.error(e);
            }
            finally {
                setLoading(false);
            }
        },
        [prompt, style],
    );

    const shareHandle = useCallback(
        async () => {
            const isAvailable = await Sharing.isAvailableAsync();
            if (!isAvailable) return;

            const localuri = await FileSystem.downloadAsync(
                imageUrl,
                FileSystem.documentDirectory + 'InteliAIGenerated.png'
            );

            Sharing.shareAsync(localuri.uri);
        },
        [imageUrl],
    );


    const downloadImage = useCallback(
        async () => {
            if (permissionStatus !== MediaLibrary.PermissionStatus.GRANTED) {
                console.error('Permissão negada para acessar a biblioteca de fotos.');
            };

            if (!imageUrl) {
                console.error('URL da imagem inválida.');
                return;
            }

            const localuri = await FileSystem.downloadAsync(
                imageUrl,
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

                console.log('Imagem salva na biblioteca de fotos.');
            } catch (error) {
                console.error('Erro ao salvar a imagem na biblioteca de fotos:', error);
            }
        },
        [permissionStatus, imageUrl]
    );


    useEffect(() => {
        const checkPermission = async () => {
            try {
                const { status } = await MediaLibrary.requestPermissionsAsync();
                setPermissionStatus(status);

            } catch (error) {
                console.error(error);
            }
        };

        checkPermission();

        // handleCreate();
    }, []);

    if (loading) {
        return (
            <View style={styles.containerLoading}>
                <ActivityIndicator />
            </View>
        )
    } else {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
                <View style={styles.container}>
                    <Row MD={1}>
                        <IconButton size={vw(8)} icon="close" iconColor={colors.onBackground} onPress={() => navigation.pop()} style={{ margin: 0 }} />
                    </Row>
                    <Row MD={1} justifyContent="flex-end">
                        <View style={{ ...styles.proArea, backgroundColor: colors.primary, borderTopLeftRadius: 50, borderBottomLeftRadius: 50 }}>
                            <Text style={{ color: colors.onPrimary }} variant="bodyLarge">
                                PRO
                            </Text>
                        </View>
                        <View style={{ ...styles.proArea, backgroundColor: colors.primaryContainer, borderTopRightRadius: 50, borderBottomRightRadius: 50 }}>
                            <Text variant="bodyLarge" style={{ marginRight: vw(2), color: colors.onPrimaryContainer }}>
                                Marca d'àgua
                            </Text>
                            <Switch value={true} color={colors.onPrimaryContainer} />
                        </View>
                    </Row>
                    <Row MD={7} justifyContent="center">
                        {
                            imageUrl &&
                            <Image source={{ uri: imageUrl }} style={styles.image} />
                        }
                    </Row>
                    <Row MD={3}>
                        <View style={{ ...styles.fakeInput, borderColor: colors.primary }}>
                            <Text variant="bodyLarge" style={{ color: colors.onBackground }}>
                                Cabelo curto, olhar sério, boca redond...
                            </Text>
                            <Feather name="edit-2" size={vw(5)} color={colors.primary} />
                        </View>
                        <Text style={{ color: colors.onBackground }} variant="labelMedium">
                            Estilo: fantasia
                        </Text>
                    </Row>
                    <Row MD={2} justifyContent="space-between">
                        <Col MD={1} alignItems="center">
                            <TouchableOpacity style={{ ...styles.roundButton, backgroundColor: colors.primary }}>
                                <Feather name="refresh-cw" size={vw(7)} color={colors.onPrimary} />
                            </TouchableOpacity>
                            <Text style={{ color: colors.onBackground }} variant="labelMedium">
                                Gerar novamente
                            </Text>
                        </Col>
                        <Col MD={1} alignItems="center">
                            <TouchableOpacity style={{ ...styles.roundButton, backgroundColor: colors.primary }} onPress={downloadImage}>
                                <Octicons name="download" size={vw(7)} color={colors.onPrimary} />
                            </TouchableOpacity>
                            <Text style={{ color: colors.onBackground }} variant="labelMedium">
                                Salvar
                            </Text>
                        </Col>
                        <Col MD={1} alignItems="center">
                            <TouchableOpacity style={{ ...styles.roundButton, backgroundColor: colors.primary }} onPress={shareHandle}>
                                <Octicons name="share" size={vw(7)} color={colors.onPrimary} />
                            </TouchableOpacity>
                            <Text style={{ color: colors.onBackground }} variant="labelMedium">
                                Compartilhar
                            </Text>
                        </Col>
                    </Row>
                </View>
            </SafeAreaView>
        );
    }

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
