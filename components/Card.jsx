import { Image, Text, TouchableOpacity, View, } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HeartIcon } from 'phosphor-react-native';

import { Link } from "expo-router";
import { useState } from "react";

export default function Card({ item,favmovies,setfavmovies }) {
    

   const isfav = favmovies.find(function(movie){
    if(movie.imdbID==item.imdbID) return true;
   
   })
    
    function togglelike(){
        
        if(isfav){
           const updatedarr=favmovies.filter(function(movie){
            if(!(movie.imdbID==item.imdbID))return true;
           })
           setfavmovies(updatedarr)
           AsyncStorage.setItem('fav-movies', JSON.stringify(updatedarr))
        }
        else{
            const arr = [...favmovies];
            arr.push(item);
            setfavmovies(arr);
            AsyncStorage.setItem('fav-movies',JSON.stringify(arr))
        }
    }
    return (

        <View style={{
            height: 280,
            width: 160,
            padding: 0,
            alignItems: "center",
            shadowColor: "#fff",
            shadowOffset: { width: 4, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
            marginBottom: 12
        }}>
            <View style={{height:20,
                width:20,
                position:"absolute",
                zIndex:1,
                right:5,
                top:5,
                
            }}>
                <TouchableOpacity onPress={togglelike}><HeartIcon size={20} color="white" weight={isfav?"fill":"light"}/></TouchableOpacity>
            </View>

            <View style={{
                borderRadius: 10,
                height: 240
            }}>
              <Link href={`/movie/${item.imdbID}`}>
              <View> 
                <Image src={item.Poster}
                    style={{
                        flex: 1,
                        width: 160,
                    }}/>
                    </View>
              </Link>
            </View>
            <View>
                <View style={{
                    flexDirection: "row",
                    width: "90%",
                    marginTop: 5,
                }} >
                    <View style={{
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Text numberOfLines={1} style={{
                            fontWeight: 500,
                            fontSize: 18,
                            color:"white",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 4,
                        }}>{item.Title}</Text>
                        <Text style={{fontSize:15,
                             color:"white",
                             fontWeight:500,
                             shadowColor: "#000",
                             shadowOffset: { width: 0, height: 4 },
                             shadowOpacity: 0.3,
                             shadowRadius: 4,
                        }}>{item.Year}</Text>
                    </View>
                    

                </View></View>

        </View>
    )
}