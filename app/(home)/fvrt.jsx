import {  useState } from "react";
import { FlatList, View,Text } from "react-native";
import {useFocusEffect} from "expo-router";
import Card from "../../components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
export default function Favourite(){
    const [fontLoaded]=useFonts({
        'v':require('../movie/v.ttf')
    })
    const [favmovies,setfavmovies]=useState([]);
    useFocusEffect(function(){
     AsyncStorage.getItem('fav-movies')
     .then(function(data){
         const storedFav= data ? JSON.parse(data) : [];
         setfavmovies(storedFav);
     })
    })
    return( 
        <View style={{backgroundColor:"#030712",paddingBottom:160}}>
            <Text style={{color:"white",margin:"auto",marginTop:60,fontFamily:"v",fontSize:24}}>FAVOURITE</Text>
            <View
              style={{
                height:"100%",
                    padding:20,
                    gap: 15,
                    marginTop:0,
                    
                    backgroundColor:"#030712"
                }}>
                {/* //  {favmovies.map(function (movie) {
                // //     return (
                // //         <Card key={movie.imdbID} item={movie} favmovies={favmovies} setfavmovies={setfavmovies} />
                // // )
                    
                // // })} */}
                <FlatList 
                numColumns={2}
                extraData={favmovies}
                columnWrapperStyle={{gap:20,alignItems:"center",margin:"auto"}}
                data={favmovies}
                keyExtractor={function(item){
                    return item.imdbID}}
                    renderItem={function({item}){
                        return (
                            <Card key={item.imdbID} item={item} favmovies={favmovies} setfavmovies={setfavmovies}/>
                        )
                    }}/>

        </View>
        </View>
    )}
       

   