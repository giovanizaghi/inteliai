export module OpenAIModule {
    export interface CreateImageRequest {
        prompt: string,
        model?: "dall-e-2" | "dall-e-3",
        n?: number,
        quality?: "standard" | "hd",
        response_format?: "url" | "b64_json",
        size?: "256x256" | "512x512" | "1024x1024" | "1792x1024" | "1024x1792" ,
        style?: "natural" | "vivid",
        user?: string,
    }
    export interface CreateImageResponse {
        created: number,
        data: ImageDataUrl[]
    }

    export interface ImageDataUrl {
        url: "string",
    }

    export interface EditImageRequest {
        image: File,
        prompt: string,
        mask?: File,
        model?: "dall-e-2" | "dall-e-3",
        n?: number,
        size?: "256x256" | "512x512" | "1024x1024" ,
        response_format?: "url" | "b64_json",
        user?: string,
    }
}