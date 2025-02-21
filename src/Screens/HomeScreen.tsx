import { View, Text, Platform, FlatList, SectionList } from 'react-native'
import React, { useCallback, useEffect, useRef } from 'react'
import { TabsStackScreenProps } from '../Navigation/TabNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderComponent from '../Components/HeaderComponent'
import { ScrollView } from 'react-native'
import ImageSlider from '../Components/ImageSlider'
import { ProductListParams } from '../TypesCheck/HomeProps'
import { CategoryCard } from '../Components/CategoryCard'
import { useState } from 'react'
import { set } from 'mongoose'
import { fetchCategories } from '../MiddleWares/HomeMiddleWares'
import { useFocusEffect } from '@react-navigation/native'
type Props = {}

const HomeScreen = ({navigation,route}: TabsStackScreenProps<"Home">) => {
    const gotoCartScreen= () =>{
        navigation.navigate("Cart")
    }
    const sectionListRef= useRef<SectionList>(null)
    const [getCategory, setGetCategory] = useState<ProductListParams[]>([])
    const [activeCat, setActiveCat] = useState<string>("")
    useEffect(()=>{
        fetchCategories({setGetCategory});
    },[])
    useFocusEffect(
        useCallback(()=>{
            fetchCategories({setGetCategory});
        },[])/// dependency array rỗng để tránh gọi lại không cần thiết
    );
    const sliderImages = [
        require("../../assets/furniture_1.jpg"),
    ]
    return (
    
    <SafeAreaView style= {{ paddingTop: Platform.OS ==='android'?40:0,flex:1,backgroundColor:"black"}}>
        <HeaderComponent gotoCartScreen={gotoCartScreen}></HeaderComponent>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
            style={{backgroundColor:"#efg"}}
            >
                <ImageSlider images={sliderImages}/>
            </ScrollView>
        <View style={{backgroundColor:"yellow",flex:1}}>
            <View style={{
                backgroundColor:"pink",flexDirection:"row",justifyContent:"space-between",
                marginTop:10
            }}>
                
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal:15}}
                style={{marginTop:4}}
            >
                {
                    getCategory.map((item,index)=>(
                        <CategoryCard
                            key={index} item={{"name":item.name,"images":item.images,_id: item._id}}
                            catStyleProps={{
                                "height": 50,
                                "width": 55,
                                "radius": 20,
                                "resizeMode": "contain"
                            }}
                            catProps={{
                                "activateCat": activeCat,"onPress":() => setActiveCat(item._id)
                            }}
                        />
                    ))
                }
            </ScrollView>

        </View>
    </SafeAreaView>
  )
}

export default HomeScreen