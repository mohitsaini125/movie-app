import { ScrollView, View, Text, FlatList, ActivityIndicator, Dimensions } from "react-native"

import Card from "./Card"
import { useEffect, useState } from "react"
export default function Homemoviesection({title , favmovies,setfavmovies,term}) {
    const [movies,setmovies]=useState([]);
    
    const screenwidth=Dimensions.get("screen").width
    useEffect(function(){
        try{
            
            fetch(`http://www.omdbapi.com/?apikey=a9384a7d&s=${term}`)
            .then(function(response){
                response.json().then(function(data){
                    const result=data?.Search;
                    if (result)
                       setmovies(result)
                    
                    
                })
            })
        }catch(error){
            setmovies()
        }
    })
    
    return (
        <View style={{flex:1}} >
            <Text style={{
                marginTop:10,
                fontSize: 24,
                margin: 6,
                fontWeight:700,
                marginLeft:20,
                color:"white",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            }}>{title}</Text>
            
                <View style={{
                    flexDirection: "row",
                    gap: 15
                }}>
                    
                <FlatList
                ListEmptyComponent={<View style={{height: 250,
                    width:screenwidth,
                    justifyContent:"center",
                    alignItems:"center"}}><ActivityIndicator/>
                    </View>}
                horizontal
                contentContainerStyle={{
                    gap:10
                }}
                    data={movies}
                    renderItem={function({item}){return <Card  item={item} favmovies={favmovies} setfavmovies={setfavmovies}/>}}
                    keyExtractor={function(item){return item.imdbID}}
                />
                </View>
          

        </View>
    )
}