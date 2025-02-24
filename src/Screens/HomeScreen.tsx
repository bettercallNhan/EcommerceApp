import { View, Text, Platform, FlatList, SectionList, Pressable, Alert } from 'react-native'
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
import { fetchCategories, fetchProductsByCatID, fetchTrendingProducts } from '../MiddleWares/HomeMiddleWares'
import { useFocusEffect } from '@react-navigation/native'
import { getProductsByCatID,getProductByID } from './../../apiMongoDB/Controllers/ProductController'
import { ProductCard } from '../Components/ProductCard'
type Props = {}
import { Dimensions } from 'react-native'; // ⬅️ Import Dimensions

const screenWidth = Dimensions.get('window').width;
const productWidth = screenWidth / 2 - 24; // 📏 Tính toán chiều rộng sản phẩm
const bgImg = "#f2f2f2"; // 🎨 Màu nền mặc định
const HomeScreen = ({navigation,route}: TabsStackScreenProps<"Home">) => {
    const gotoCartScreen= () =>{
        navigation.navigate("Cart")
    }
    const [trendingProducts,setTrendingProducts]= useState<ProductListParams[]>([])
    useEffect(()=>{
        fetchCategories({setGetCategory});
        fetchTrendingProducts({setTrendingProducts});

    },[]);
    const [getProductsByCatID,setGetProductsByCatID]=useState<ProductListParams[]>([])
    const sectionListRef= useRef<SectionList>(null)
    const [getCategory, setGetCategory] = useState<ProductListParams[]>([])
    const [activeCat, setActiveCat] = useState<string>("")
    useEffect(()=>{
        fetchCategories({setGetCategory});
    },[])
    useEffect(()=>{
    console.log("fetchProductByCatId", fetchProductsByCatID);
    if (activeCat){
        fetchProductsByCatID({
            catID: activeCat,
            setGetProductsByCatID: (data) => {
                console.log("Fetched products:", data);
                setGetProductsByCatID(data);
            }
        });
    }
},[activeCat]);
    useFocusEffect(
        useCallback(()=>{
            fetchCategories({setGetCategory});
            if (activeCat){
                fetchProductsByCatID({setGetProductsByCatID,catID:activeCat});
            }
        },[activeCat])/// dependency array rỗng để tránh gọi lại không cần thiết
    );
    const sliderImages = [
        require("../../assets/furniture_1.jpg"),
        require("../../assets/goku-drip.jpg"),
        require("../../assets/images.jpg"),
    ]
    return (
        <SafeAreaView
          style={{ paddingTop: Platform.OS === 'android' ? 40 : 0, flex: 1, backgroundColor: '#f8f8f8' }}>
          <HeaderComponent gotoCartScreen={gotoCartScreen} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ padding: 16 }}>
              <ImageSlider images={sliderImages} />
    
              <View style={{ marginVertical: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Categories</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {getCategory.map((item, index) => (
                    <CategoryCard
                      key={index}
                      item={{ name: item.name, images: item.images, _id: item._id }}
                      catStyleProps={{ height: 70, width: 70, radius: 35, resizeMode: 'contain' }}
                      catProps={{ activateCat: activeCat, onPress: () => setActiveCat(item._id) }}
                    />
                  ))}
                </ScrollView>
              </View>
    
              <View>
                <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>
                  Products from Selected Category
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {getProductsByCatID.length > 0 ? (
                    getProductsByCatID.map((item, index) => (
                      <CategoryCard
                        key={index}
                        item={{ name: item.name, images: item.images, _id: item._id }}
                        catStyleProps={{ height: 100, width: 100, radius: 10, resizeMode: 'contain' }}
                        catProps={{ 
                            onPress: () => navigation.navigate("productDetails",item)}}
                      />
                    ))
                  ) : (
                    <Text style={{ fontSize: 16, color: 'gray' }}>No Products</Text>
                  )}
                </ScrollView>
              </View>
              <View style={{
                backgroundColor:"purple",flexDirection:"row",justifyContent:"space-between",
                marginTop:10
              }}>
                <Text style={{color:"yellow",fontSize:14,fontWeight:"bold",padding:10}}>
                    Trending  Deals of the week
                </Text>
              </View>
              <View style ={{
                backgroundColor:"#fff",borderWidth:7,borderColor:"GREEN",flexDirection:"row",justifyContent:"space-between",
                alignItems:"center",flexWrap:"wrap"}}>
                    {
                        trendingProducts.map((item,index)=>(
                            
                            <ProductCard
                                item={{
                                    _id: item?._id || index.toString(),
                                    name: item?.name || "No Name",
                                    images: item?.images || [""],
                                    price: item?.price || 0,
                                    oldPrice: item?.oldPrice || item?.price || 0,
                                    description: item?.description || "No description available",
                                    quantity: item?.quantity ?? 1,
                                    inStock: item?.inStock ?? true,
                                    isFeatured: Boolean(item?.isFeatured), // Ép kiểu thành boolean
                                    category: item?.category?.toString() || "Uncategorized" // Đảm bảo là string
                                }}
                                key={index}
                                pStyleProps={{"resizeMode": "contain","width": productWidth,height: 90,"marginBottom": 5}}
                                productProps={{
                                    "imageBg": bgImg,
                                    "onPress":()=>{
                                        navigation.navigate("productDetails",item)
                                    }
                                }}
                                                                     
                            ></ProductCard>
                        ))
                    }
                </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
}

export default HomeScreen