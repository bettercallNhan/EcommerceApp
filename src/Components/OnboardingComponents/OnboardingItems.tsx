import {View, Text, useWindowDimensions, StyleSheet} from 'react-native'
import React from 'react'
import Animated, {Extrapolation,interpolate,useAnimatedStyle} from 'react-native-reanimated'
import { OnboardingItemsObj } from '../../TypesCheck/OnboardingTypesCheck'
import LottieView from 'lottie-react-native'
import { transform } from '@babel/core'
const AnimatedView= Animated.View;
type Props= {}

const OnboardingItems = ({ item,index,x}: OnboardingItemsObj)=>{
    const { width: SCREEN_WIDTH} = useWindowDimensions()
    const circleAnimation = useAnimatedStyle(() => {
        const scale = interpolate(x.value,[
            (index - 1) * SCREEN_WIDTH,index * SCREEN_WIDTH, (index + 1 ) * SCREEN_WIDTH
        ],
            [1,4,4],
            Extrapolation.CLAMP
        )
        return {
        transform: [{scale:scale}]
        }
    })
    const lottieAnimation = useAnimatedStyle(() => {
        const translatey = interpolate(
            x.value, [
            (index - 1) * SCREEN_WIDTH,index * SCREEN_WIDTH, (index + 1 ) * SCREEN_WIDTH
        ],
            [200,70,-200],
            Extrapolation.CLAMP
        )
        return {
            transform:[{ translateY:translatey}]
        }
    })
    return (
        <View
            style={{
                flex:1,justifyContent:"space-around", alignItems: "center",
                marginBottom: 270, width: SCREEN_WIDTH
            }}
        >
            <View style = {sty.circularContainer}>
                <AnimatedView
                    style= {[{
                        width: SCREEN_WIDTH,height: SCREEN_WIDTH,
                        backgroundColor: item.backgroundColor, borderRadius: SCREEN_WIDTH / 2
                    }]}
                >
                </AnimatedView>
            </View>
            <AnimatedView style = {[lottieAnimation]}>
                <LottieView
                    source={item.imageUrl}
                    style={{ width: SCREEN_WIDTH * 0.8, height: SCREEN_WIDTH * 0.8}}
                    autoPlay
                />
            </AnimatedView>
            <Text style={{
                color: item.TextColor,fontSize:40,fontWeight:"bold",textAlign:"center",marginHorizontal:20,
                marginBottom: 10
            }}>
                {item.text}
            </Text>
        </View>
    )
}
export default OnboardingItems
const sty = StyleSheet.create({
    circularContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "flex-end"
    }
})