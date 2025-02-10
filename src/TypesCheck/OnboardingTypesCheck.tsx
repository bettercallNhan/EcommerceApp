import { AnimationObject } from 'lottie-react-native';
import { SharedValue,AnimatedRef } from "react-native-reanimated";
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';

export interface OnboardingPrograms {
    _id: string;
    text: string;
    TextColor: string;
    backgroundColor: string;
    imageUrl: AnimationObject;
}

export interface OnboardingItemsObj {
    item: OnboardingPrograms;
    index: number;
    x : SharedValue<number>
}
export interface OnboardingPaginationParams{
    item: OnboardingPrograms[]
    x: SharedValue<number>
}
export interface onboardingDotParams{
    index:number;
    x : SharedValue<number>
}
export interface OnboardingButtonParams{
    FlatListIndex: SharedValue<number>
    FlatListRef: AnimatedRef<FlatList<OnboardingPrograms>>
    itemLength:number
    x: SharedValue<number>
}
