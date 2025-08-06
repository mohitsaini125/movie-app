import { Image, ScrollView, Text, View } from 'react-native'
import Homemoviesection from '../../components/Homemoviesection'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomePage() { 
    const [favmovies,setfavmovies]=useState([]);
useEffect(function(){
        AsyncStorage.getItem('fav-movies')
        .then(function(data){
            const storedFav= data ? JSON.parse(data):[];
            setfavmovies(storedFav);
        })
    },[])
    return (
        <View style={{backgroundColor:"#030712",
            paddingBottom:50
        }}>
            <View style={{backgroundColor:"#09090B",
                height:50,
            }}></View>

        <ScrollView style={{paddingHorizontal:2}}>
            <View style={{justifyContent:"center",
                alignItems:"center",
                marginVertical:10,
                marginTop:15,
                
            }}><Text style={{fontSize:35,
                fontWeight:900,
                color:"white",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                
            }}>Movie Mania</Text></View>
            <Homemoviesection favmovies={favmovies} setfavmovies={setfavmovies} term={"iron"} title={"Trending"}/>
            <Homemoviesection favmovies={favmovies} setfavmovies={setfavmovies} term={"Superman"} title={"Hits"}/>
            <Homemoviesection favmovies={favmovies} setfavmovies={setfavmovies} term={"Avengers"} title={"Top 10"}/>
            <Homemoviesection favmovies={favmovies} setfavmovies={setfavmovies} term={"Batman"} title={"Sci-fi related"}/>
           
            
           
        </ScrollView>
            
        </View>
    )
}