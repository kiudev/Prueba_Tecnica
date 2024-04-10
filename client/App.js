import { StatusBar } from "expo-status-bar";
import {
   StyleSheet,
   Text,
   View,
   Pressable,
   Image,
   TextInput,
} from "react-native";
import { colorPalette } from "./colorPalette";
import { useEffect, useState } from "react";
import Search from "./components/svg/Search";
import Create from "./components/svg/Create";

const buttons = [
   {
      id: "1",
      name: "Todo",
   },
   {
      id: "2",
      name: "Más vendidos",
   },
   {
      id: "3",
      name: "Ficción",
   },
   {
      id: "4",
      name: "No Ficción",
   },
];

export default function App() {
   const [selectedButton, setSelectedButton] = useState([]);
   const [books, setBooks] = useState([]);

   useEffect(() => {
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
      getBooks();
   }, []);

   console.log(books);
   return (
      <View style={styles.container}>
         <Image style={styles.image} source={require("./assets/user.png")} />

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
            <TextInput style={searchStyles.input} placeholder="Buscar" />
         </View>

         {books.map((book, index) => (
            <View style={bookStyles.container} key={index}>
               <View style={bookStyles.header}>
                  <Text style={bookStyles.title}>{book.title}</Text>
                  <Text style={bookStyles.genre}>{book.genre}</Text>
               </View>
               <Text style={bookStyles.author}>{book.author}</Text>
            </View>
         ))}

         <Create style={buttonStyles.createButton} />

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
      bottom: 30,
      alignSelf: "center",
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
   },

   author: {
      opacity: 0.5,
      fontSize: 16,
   },

   genre: {
      color: colorPalette[2],
      textTransform: "uppercase",
      fontWeight: "bold",
      fontSize: 14,
   },
});
