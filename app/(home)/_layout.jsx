import {Stack, Tabs} from "expo-router";
import { HeartIcon, HouseIcon, MagnifyingGlassIcon } from "phosphor-react-native";
import { View } from "react-native";

export default function RootLayout(){
    return (
       
       <Tabs
       screenOptions={{
        headerShown: false,
       tabBarStyle:{
        backgroundColor:"#030712"
       }
      }}>
        <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <HouseIcon color={color} size={18} /> 
          ),
        }}
      />
        <Tabs.Screen
        name="fvrt"
        options={{
          title: "FVR",
          tabBarIcon: ({ color, size }) => (
            <HeartIcon color={color} size={18} /> 
          ),
        }}
      />
        <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <MagnifyingGlassIcon color={color} size={18} /> 
          ),
        }}
      />
         </Tabs>
    )
}