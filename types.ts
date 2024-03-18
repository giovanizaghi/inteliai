import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

export type RootStackParamList = {
    Root:
    | {
        screen: RootTabParamList;
    }
    | undefined;
    Home: undefined;
    GetPro: undefined;
    Generate: {
        showInputOnLoad?: boolean,
        inputValue?: string
    };
    GeneratedImage: {
        prompt: string,
        style: string,
        image: string,
    },
    Prompt: {
        imageSample: any,
        style: string,
        title: string,
        description: string,
        isPro: boolean,
    },
    LoadingImage: {
        prompt: string,
        style: string,
    },
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
    TabOne: undefined;
    TabTwo: undefined;
};


export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<RootTabParamList, Screen>,
        NativeStackScreenProps<RootStackParamList>
    >;
