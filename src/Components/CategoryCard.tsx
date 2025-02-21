import { StyleSheet, Text, View,Pressable, ImageBackground,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { ICatProps } from '../TypesCheck/CategoryTypes'

export const CategoryCard = ({item,catProps,catStyleProps}:ICatProps) => {
    let isAcitave = item._id == catProps.activateCat;
    let activeButtonClass = isAcitave ? 'orange':"#eee"// change color khi no active
    return (
        <View>
            {catProps.imageBg!== undefined?(
                <View style = {{alignItems:'center'}}>
                    <Pressable style = {st.imageContainer} key={item._id} onPress={catProps.onPress}>
                        <ImageBackground source={{uri: catProps?.imageBg}} style ={styl(catStyleProps.imageBgHt).imageBg}>
                            <Image source={{ uri: item?.images[0]}}
                                style = {sty(catStyleProps.width, catStyleProps.height,catStyleProps.radius).
                                imgStyleProps}
                                resizeMode = {catStyleProps?.resizeMode}
                            />
                        </ImageBackground>
                    </Pressable>
                    <Text style = {st.catName}>{item?.name}</Text>
                </View>
            ):(
                <Pressable style = {[st.touchableStyle,{ backgroundColor: activeButtonClass}]} key={item._id}
                onPress={catProps.onPress}>
                    <View style = {st.imageContainer}>
                        <Image source={{uri: item?.images[0]}}
                            style={sty(catStyleProps.width, catStyleProps.height,catStyleProps.radius).
                            imgStyleProps}
                            resizeMode = {catStyleProps?.resizeMode}
                        >
                        </Image>        
                    </View>
                    <Text style = {st.catName}>{item?.name}</Text>
                </Pressable>
            )}
        </View>
    )
}
const st = StyleSheet.create({
    imageContainer : {
        borderRadius: 10,
        padding: 3
    },
    catName: {
        fontSize: 8,
        fontWeight: 'bold',
    },
    touchableStyle:{
        alignItems: 'center',
        padding : 5,
        borderRadius: 20,
        margin: 3
    }
})
const styl = (height?:number)=>({
    imageBg:{
        height,
        borderRadius: 11,
    }
})
const sty = (width?:number, height?:number, radius?:number)=>({
    imgStyleProps:{
        width,
        height,
        borderRadius: radius,
    }
})