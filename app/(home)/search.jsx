import { Link } from "expo-router";
import { MagnifyingGlassIcon } from "phosphor-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
export default function Search() {
  const screenwidth = Dimensions.get("screen").width;
  const [input, setinput] = useState("");
  const [results, setresults] = useState({});
  const [loading, setloading] = useState(false);
  function handlesearch() {
    setloading(true);
    if (!input.trim()) return;
    try {
      fetch(`http://www.omdbapi.com/?apikey=a9384a7d&s=${input}`).then(
        function (res) {
          res.json().then(function (data) {
            const searchresults = data?.Search;
            if (searchresults) setresults(searchresults);
          });
        }
      );
    } catch (err) {
      setresults([]);
    }
  }
  return (
    <View
      style={{
        padding: 10,
        height: "100%",
        backgroundColor: "#030712",
      }}
    >
      <View style={styles.Header}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <View style={{ padding: 6 }}>
            <TouchableOpacity onPress={handlesearch}>
              <MagnifyingGlassIcon size={25} />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="search for movies..."
            style={styles.input}
            value={input}
            onChangeText={setinput}
          ></TextInput>
        </View>
      </View>
      <FlatList
        numColumns={2}
        columnWrapperStyle={{ gap: 35 }}
        ListEmptyComponent={
          <View style={{ width: screenwidth }}>
            <Text>{loading ? <ActivityIndicator /> : null} </Text>
          </View>
        }
        contentContainerStyle={{ gap: 20, alignItems: "center" }}
        keyExtractor={function (item) {
          return item.imdbID;
        }}
        data={results}
        renderItem={function ({ item }) {
          return (
            <View
              style={{
                height: 280,
                width: 160,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 4, height: 2 },
                shadowOpacity: 0.7,
                shadowRadius: 4,
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  borderRadius: 10,
                  height: 240,
                }}
              >
                <Link href={`/movie/${item.imdbID}`}>
                  <View>
                    <Image
                      src={item.Poster}
                      style={{
                        flex: 1,
                        width: 160,
                      }}
                    />
                  </View>
                </Link>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "90%",
                    marginTop: 5,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        fontWeight: 600,
                        fontSize: 18,
                        color: "white",
                      }}
                    >
                      {item.Title}
                    </Text>
                    <Text style={{ fontSize: 15, color: "white" }}>
                      {item.Year}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  Header: {
    marginTop: 50,
    marginBottom: 20,
    gap: 20,
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  input: {
    width: 320,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
