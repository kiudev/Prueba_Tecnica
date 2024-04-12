import { StatusBar } from "expo-status-bar";
import {
   StyleSheet,
   Text,
   View,
   Pressable,
   Image,
   TextInput,
   ScrollView,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { colorPalette } from "../colorPalette";
import Search from "../components/svg/Search";
import Create from "../components/svg/Create";

const buttons = [
   {
      id: 1,
      name: "Todo",
   },
   {
      id: 2,
      name: "Más vendidos",
   },
   {
      id: 3,
      name: "Ficción",
   },
   {
      id: 4,
      name: "No Ficción",
   },
];

const booksCard = [
   {
      id: 1,
      title: "Titulo 1",
      genre: "Genero 1",
      author: "Autor 1",
      synospsis: "Sinopsis 1",
   },
   {
      id: 2,
      title: "Titulo 2",
      genre: "Genero 2",
      author: "Autor 2",
      synospsis: "Sinopsis 2",
   },
   {
      id: 3,
      title: "Titulo 3",
      genre: "Genero 3",
      author: "Autor 3",
      synospsis: "Sinopsis 3",
   },
   {
      id: 4,
      title: "Titulo",
      genre: "Genero",
      author: "Autor",
      synospsis: "Sinopsis",
   },
   {
      id: 5,
      title: "Titulo",
      genre: "Genero",
      author: "Autor",
      synospsis: "Sinopsis",
   },
   {
      id: 6,
      title: "Titulo",
      genre: "Genero",
      author: "Autor",
      synospsis: "Sinopsis",
   },
];

export default function Home({ navigation }) {
   const [books, setBooks] = useState([]);

   const getBooks = () => {
      fetch("http://192.168.1.56:3000/books")
         .then(response => response.json())
         .then(data => {
            setBooks(data);
         })
         .catch(error => {
            console.error("Error fetching data:", error);
         });
   };

   useEffect(() => {
      getBooks();
   }, [books]);

   return (
      <View style={styles.container}>
         <Image style={styles.image} source={require("../assets/user.png")} />

         <View style={styles.header}>
            {buttons.map(button => (
               <View key={button.id}>
                  <Pressable style={buttonStyles.button}>
                     <Text style={buttonStyles.text}>{button.name}</Text>
                  </Pressable>
               </View>
            ))}
         </View>

         <View style={searchStyles.container}>
            <Search style={searchStyles.icon} />
            <TextInput
               style={searchStyles.input}
               selectionColor={colorPalette[0]}
               placeholder="Buscar"
            />
         </View>

         {/* <ScrollView>
            {books.map((book, index) => (
               <Pressable
                  style={bookStyles.container}
                  key={index}
                  onPress={() =>
                     navigation.navigate("Book Details", {
                        title: book.title,
                        genre: book.genre,
                        author: book.author,
                        synopsis: book.synopsis,
                        year: book.year,
                     })
                  }
               >
                  <View style={bookStyles.header}>
                     <Text style={bookStyles.title}>{book.title}</Text>
                     <Text style={bookStyles.genre}>{book.genre}</Text>
                  </View>
                  <Text style={bookStyles.author}>{book.author}</Text>
                  <Text style={bookStyles.author}>{book.synopsis}</Text>
               </Pressable>
            ))}
         </ScrollView> */}

         <ScrollView>
            {booksCard.map(book => (
               <Pressable
                  style={bookStyles.container}
                  key={book.id}
                  onPress={() => navigation.navigate("Book Details", {
                     title: book.title,
                     genre: book.genre,
                     author: book.author,
                     synopsis: book.synopsis,
                     year: book.year,
                  })}
               >
                  <View style={bookStyles.header}>
                     <Text style={bookStyles.title}>{book.title}</Text>
                     <Text style={bookStyles.genre}>{book.genre}</Text>
                  </View>
                  <Text style={bookStyles.author}>{book.author}</Text>
                  <Text style={bookStyles.author}>{book.synopsis}</Text>
               </Pressable>
            ))}
         </ScrollView>

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
      opacity: 0.5,
      fontSize: 16,
      color: colorPalette[0],
   },

   genre: {
      color: colorPalette[2],
      textTransform: "uppercase",
      fontWeight: "bold",
      fontSize: 14,
   },
});
