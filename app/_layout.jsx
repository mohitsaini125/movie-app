import { HeaderBackground } from "@react-navigation/elements";
import {Stack, Tabs} from "expo-router";
import { View } from "react-native";

export default function RootLayout(){
    return (
       
       <Stack >

        <Stack.Screen name="(home)"
        options={{
            headerShown:false
        }}/>
        <Stack.Screen name="movie/[id]"
        
        options={{
            title:"Movie Details",
           headerStyle:{
            backgroundColor:"#030712"
           },
           headerTintColor:"#fff"
        }}
        
        />
        
       

       </Stack>
    )
}