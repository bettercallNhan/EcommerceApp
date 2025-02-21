import { View, Text,StyleSheet,Pressable,TextInput } from 'react-native'
import React,{useState} from 'react'
import {Entypo,AntDesign,Ionicons} from "@expo/vector-icons"
export interface IGoback{
    onPress?:() => void;
}


export const GoBack = ({onPress}: IGoback) => {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name = "chevron-back-circle" size={30} color="#fff"/>
    </Pressable>
  )
}

export default GoBack