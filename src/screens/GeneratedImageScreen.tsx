import { StyleSheet, View, Image, SafeAreaView } from "react-native";
import { RootStackScreenProps } from "../../types";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Button, IconButton, Text } from "react-native-paper";
import Row from "../components/Row";
import { vw } from "../constants/device";
import Col from "../components/Col";
import { OpenAI, eModel, eQuality, eResponseFormat, eSize, eStyle } from "gio-react-native-openai";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from "expo-file-system";

export default function GeneratedImageScreen({ navigation, route }: RootStackScreenProps<'GeneratedImage'>) {
    const { prompt, style } = route?.params;
    const openai = new OpenAI(process.env.EXPO_PUBLIC_OPENAI, process.env.EXPO_PUBLIC_ORG);

    const [loading, setLoading] = useState<boolean>();
    const [imageUrl, setImageUrl] = useState<string>("https://oaidalleapiprodscus.blob.core.windows.net/private/org-xDgkNCcBtmEluQvm2CxofvV1/user-OErcmP7ey2Zqm38FcY4eoaNx/img-AcJfvtMpzm9cFaS6WS2lgO8x.png?st=2024-01-14T18%3A33%3A05Z&se=2024-01-14T20%3A33%3A05Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-01-14T08%3A35%3A16Z&ske=2024-01-15T08%3A35%3A16Z&sks=b&skv=2021-08-06&sig=bicyMKiRX4%2BRZuevAz/qNWduhJSvJ8QySG94lONKUBc%3D");
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
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Row MD={1}>
                        <IconButton size={vw(8)} icon="close" iconColor="#000" onPress={() => navigation.pop()} style={{ margin: 0 }} />
                    </Row>
                    <Row MD={1}>
                        <View>
                            <Text>
                                Marda d'àgua
                            </Text>
                        </View>
                    </Row>
                    <Row MD={10} justifyContent="center">
                        {
                            imageUrl &&
                            <Image source={{ uri: imageUrl }} style={{ width: 256, height: 256 }} />
                        }
                    </Row>
                    <Row>
                        <Col MD={1}>
                            <Button onPress={downloadImage}>
                                Teste
                            </Button>
                        </Col>
                        <Col MD={1}>

                        </Col>
                        <Col MD={1}>

                        </Col>
                        <Col MD={1}>

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
    }
});
