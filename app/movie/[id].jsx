import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { LocalRouteParamsContext } from "expo-router/build/Route";
import { useFonts } from 'expo-font'
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StarIcon } from "phosphor-react-native";
//https://www.omdbapi.com/?apikey=a9384a7d&i=tt0371746
export default function Movie() {
    
    const[loading,setloading]=useState(false);
    const [fontLoaded] = useFonts({
        'StickNoBills': require('./v.ttf')
    });
    const [details, setdetails] = useState({});
    const params = useLocalSearchParams();
    const id = params.id
    useEffect(function () {
        setloading(true)
        fetch(`https://www.omdbapi.com/?apikey=a9384a7d&i=${id}`)
            .then(function (res) {
                res.json().then(function (data) {
                    setdetails(data)
                    setloading(false)
                })
            })
    },[])
  if(loading){
    return (
        <View style={{backgroundColor:"#030712",height:"100%"}}>
            <ActivityIndicator style={{margin:"auto"}}/>
        </View>
    )
  }
    return (
        <View style={{
            backgroundColor: "#030712",
            flex: 1,
            padding:10

        }}>
            <View style={{
                height: 300,
                width: 200,
                marginTop: 20,
                marginHorizontal: 2,
                borderRadius: 5,
                overflow: "hidden",
                alignSelf: "center"
            }}>
                <Image src={details.Poster}
                    style={{ flex: 1 }}></Image>
                <LinearGradient
                    colors={["transparent", "rgba(0,0,0,1)"]}
                    style={{
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        right: 0,
                        height: 100
                    }}>
                </LinearGradient>
            </View>
            <View>
                <View style={{
                    marginTop: 20,
                    alignSelf: "center"
                }}><Text numberOfLines={1} style={{
                    color: "white",
                    marginTop: 0,
                    fontWeight: 800,
                    fontSize: 35,
                    fontFamily: 'StickNoBills'
                }}>{details.Title}</Text></View>
                <View style={{
                    alignSelf: "center"
                }}><Text style={{
                    color: "skyblue",
                    marginBottom: 10,
                    fontWeight: 800,
                    fontSize: 14,
                    fontFamily: 'StickNoBills'
                }}>{details.Released}</Text></View>
                <View style={{ flexDirection: "row", gap: 0, alignItems:"center",
                    justifyContent:"center"
                 }}>
                    <View style={{ ...style.info }}><Text style={{...style.text1}}>{details.Type}</Text></View>
                    <View style={{ ...style.info }}><Text style={{...style.text1}}>{details.Runtime}</Text></View>
                    <View style={{ ...style.info }}><Text style={{...style.text1,color:"skyblue"}}>{details.Rated}</Text></View>
                    <View style={{ ...style.info }}><Text style={{...style.text1,alignSelf:"center",justifyContent:"center"}}><StarIcon size={11} color="yellow" weight="fill"/> {details.imdbRating}/10</Text></View>
                </View>
                <TouchableOpacity><View style={{
                    height: "50",
                    width: "95%",
                    alignSelf: "center",
                    backgroundColor: "white",
                    borderRadius: 15,
                    marginTop: 5,
                    
                }}><Text style={{
                    margin:"auto",
                    
                    fontFamily:"StickNoBills",
                    fontSize:20
                }}>Watch Now</Text></View></TouchableOpacity>
                <View style={{ ...style.Genre }}><Text style={{...style.text2}}>➽  {details.Genre}</Text></View>
                <View><Text numberOfLines={5} style={{...style.text3}}>{details.Plot}</Text></View>
                <View style={{}}>
                <View style={{ ...style.info2 }}><Text style={{...style.text1,color:"skyblue"}}>Director = {details.Director}</Text></View>
                <View style={{ ...style.info2 }}><Text style={{...style.text1,color:"skyblue"}}>Writer = {details.Writer}</Text></View>
                <View style={{ ...style.info2 }}><Text style={{...style.text1,color:"skyblue"}}>Actors = {details.Actors}</Text></View>
               
                </View>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    info: {
        width: "15%",
        height: 20,
        alignSelf: "center",
        
    },
    text1:{
        fontFamily:"StickNoBills",
        alignSelf:"center",
        color:"white",
        
    },
    Genre:{
        marginBottom:10,
        height: 15,
        marginTop:10,
        alignSelf:"flex-start",
    },
    text2:{
        fontFamily:"StickNoBills",
        alignSelf:"center",
        color:"grey",
        fontSize:15
    },
    text3:{
        fontFamily:"StickNoBills",
        alignSelf:"center",
        color:"grey",
        fontSize:13,
        marginBottom:10
    },
    info2:{
        marginTop:0,
        alignSelf:"flex-start",},
        info: {
            width: "15%",
            height: 20,
            alignSelf: "center",
            
        },
})