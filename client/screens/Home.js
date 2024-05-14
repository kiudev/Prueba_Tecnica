import { StatusBar } from "expo-status-bar";
import {
   StyleSheet,
   Text,
   View,
   Pressable,
   Image,
   TextInput,
   ScrollView,
   ActivityIndicator,
   FlatList,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { colorPalette } from "../colorPalette";
import Search from "../components/svg/Search";
import Create from "../components/svg/Create";
import { myIp } from "./myIP";

export default function Home({ navigation }) {
   const [books, setBooks] = useState([]);
   const [loading, setLoading] = useState(true);
   const [searchBook, setSearchBook] = useState([]);

   const getBooks = () => {
      fetch(`${myIp}:3000/books`)
         .then(response => response.json())
         .then(data => {
            setBooks(data);
            setTimeout(() => {
               setLoading(false);
            }, 1000);
         })
         .catch(error => {
            console.error("Error fetching data:", error);
         });
   };

   useEffect(() => {
      const cleanUp = navigation.addListener("focus", async () => {
         getBooks();
      });

      return cleanUp;
   }, [navigation]);

   const handleSearch = text => {
      const searchText = text.toUpperCase();

      const filteredBooks = books.filter(book =>
         book.title.toUpperCase().includes(searchText)
      );
      setSearchBook(filteredBooks);
   };

   useEffect(() => {
      setSearchBook(books);
   }, [books]);

   const renderItem = ({ item }) => {
      return (
         <ScrollView>
            <Pressable
               style={bookStyles.container}
               onPress={() =>
                  navigation.navigate("Book Details", {
                     id: item.id,
                     title: item.title,
                     genre: item.genre,
                     author: item.author,
                     synopsis: item.synopsis,
                     year: item.year,
                  })
               }
            >
               
               <View style={bookStyles.header}>
                  <Text style={bookStyles.title}>{item.title}</Text>

                  <Text style={bookStyles.genre}>{item.genre}</Text>
               </View>

               <Text style={bookStyles.author}>{item.author}</Text>

               <Text numberOfLines={3} style={bookStyles.synopsis}>
                  {item.synopsis}
               </Text>
            </Pressable>
         </ScrollView>
      );
   };

   return (
      <View style={styles.container}>
         <Image style={styles.image} source={require("../assets/user.png")} />

         <View style={searchStyles.container}>
            <Search style={searchStyles.icon} />

            <TextInput
               onChangeText={handleSearch}
               style={searchStyles.input}
               selectionColor={colorPalette[0]}
               placeholder="Buscar"
            />
         </View>

         {loading ? (
            <View style={styles.container}>
               <ActivityIndicator size="large" color={colorPalette[0]} />
            </View>
         ) : (
            <FlatList
               data={searchBook}
               renderItem={renderItem}
               keyExtractor={item => item.id}
            />
         )}

         <Create
            onPress={() => navigation.navigate("Create Book")}
            style={buttonStyles.createButton}
         />

         <StatusBar style="auto" />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colorPalette[1],
      padding: 20,
   },

   header: {
      marginTop: 40,
      flexDirection: "row",
      gap: 10,
   },

   title: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 50,
      marginBottom: 10,
      color: colorPalette[0],
   },

   image: {
      width: 40,
      height: 40,
      marginTop: 30,
   },
});

const searchStyles = StyleSheet.create({
   container: {
      flexDirection: "row",
      alignItems: "center",
   },

   icon: {
      marginTop: 20,
      backgroundColor: colorPalette[3],
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
   },

   input: {
      width: "82%",
      height: 40,
      backgroundColor: colorPalette[3],
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      marginTop: 20,
      paddingLeft: 10,
      color: colorPalette[0],
      fontSize: 16,
   },
});

const buttonStyles = StyleSheet.create({
   button: {
      backgroundColor: colorPalette[3],
      padding: 8,
      borderRadius: 10,
   },

   text: {
      fontWeight: "bold",
      color: colorPalette[0],
      fontSize: 16,
   },

   createButton: {
      position: "absolute",
      alignSelf: "center",
      bottom: 30,
   },
});

const bookStyles = StyleSheet.create({
   container: {
      backgroundColor: colorPalette[3],
      padding: 10,
      marginTop: 20,
      borderRadius: 10,
   },

   header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
   },

   title: {
      fontWeight: "bold",
      fontSize: 20,
      color: colorPalette[0],
   },

   author: {
      fontSize: 16,
      color: colorPalette[2],
   },

   genre: {
      color: colorPalette[2],
      textTransform: "uppercase",
      fontWeight: "bold",
      fontSize: 14,
   },

   synopsis: {
      color: colorPalette[0],
      fontSize: 14,
   },
});
