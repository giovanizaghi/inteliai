import { Asset } from "expo-asset";
import { Uploadable } from "openai/uploads";
import axios from "axios";
import OpenAIAPI from "../api/OpenAIapi";

export default function useGenerateImage() {

    const openai = new OpenAIAPI(process.env.EXPO_PUBLIC_OPENAI);


    const createImage = async (prompt) => {

        try {

            const data = await openai.createImage({
                prompt: prompt,
                n: 1,
                size: "256x256",
                response_format: "url",
                user: "giovani",
                model: "dall-e-2",
                quality: "standard",
                style: "natural"
            });


            return data.data[0].url;
        } catch (error) {
            console.error("Error in 'createImage' ----> ", error)
        } 
    };

    const modifyImage = async (prompt: string, image: File) => {
        try {

            const data = await openai.editImage({
                prompt: prompt,
                image: image,
                n: 1,
                size: "256x256",
                response_format: "url",
                user: "giovani",
                model: "dall-e-2",
            });

            return data.data[0].url;
        } catch (error) {
            console.error("Error in 'createImage' ----> ", error)
        } 
    };

    return {
        createImage,
        modifyImage
    };

}