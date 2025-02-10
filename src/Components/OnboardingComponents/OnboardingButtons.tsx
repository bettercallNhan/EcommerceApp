import { View, Text, useWindowDimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React from 'react'
import { OnboardingButtonParams, onboardingDotParams } from '../../TypesCheck/OnboardingTypesCheck'
import Animated,{interpolateColor,useAnimatedStyle,withSpring,withTiming} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../../Navigation/RootNavigator'
type Props = {}

const OnboardingButtons = ({ FlatListIndex , FlatListRef , itemLength ,x}:OnboardingButtonParams) => {
  const {width : SCREEN_WIDTH} = useWindowDimensions()
  const buttonAnimation = useAnimatedStyle(()=>{
    return {
        width:
            FlatListIndex.value === itemLength   - 1 ?
                withSpring(140) : withSpring(60),
        height:60,
    }
  })
}

export default OnboardingButtons