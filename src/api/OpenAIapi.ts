import { AxiosInstance } from "axios";
import axios from "axios";
import { OpenAIModule } from "./OpenAIApiModule";

export default class OpenAIAPI {
    private base: AxiosInstance;

    constructor(apiKey: string) {
        this.base = axios.create({
            baseURL: "https://api.openai.com/v1",
            headers: {
                "OpenAI-Organization": "org-xDgkNCcBtmEluQvm2CxofvV1",
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            }
        });
    }

    createImage = async (params: OpenAIModule.CreateImageRequest): Promise<OpenAIModule.CreateImageResponse> => {
        try {
            params.quality = params?.quality || "standard";
            params.response_format = params?.response_format || "url";
            params.size = params?.size || "1024x1024";
            params.style = params?.style || "vivid";

            const { data } = await this.base.post<OpenAIModule.CreateImageResponse>("/images/generations", params);

            return data;
        } catch (error) {
            console.error("Error in 'createImage' API function ---->", error);
        }
    }

    editImage = async (params: OpenAIModule.EditImageRequest): Promise<OpenAIModule.CreateImageResponse> => {
        try {
            params.response_format = params?.response_format || "url";
            params.size = params?.size || "1024x1024";

            const { data } = await this.base.post<OpenAIModule.CreateImageResponse>("/images/edits", params);

            return data;
        } catch (error) {
            console.error("Error in 'editImage' API function ---->", error);
        }
    }

}