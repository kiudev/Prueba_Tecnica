import {
   View,
   Text,
   StyleSheet,
   ScrollView,
   TextInput,
   Pressable,
} from "react-native";
import Back from "../components/svg/Back";
import { colorPalette } from "../colorPalette";
import { useState } from "react";
import { myIp } from "./myIP";

export default function UpdateBook({ navigation, route }) {
   const { id, title, synopsis, author, genre, year } = route.params;

   const [book, setBook] = useState({
      title: title,
      synopsis: synopsis,
      author: author,
      genre: genre,
      year: year,
   });

   const handleUpdateBook = async (id) => {
      try {
         const response = await fetch(`${myIp}:3000/books/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               title: book.title,
               synopsis: book.synopsis,
               author: book.author,
               genre: book.genre,
               year: book.year
            })
         })

         if (response.ok) {
            navigation.navigate("Home");
         } else {
            console.log("Failed to fetch" . response.statusText);
         }
      } catch (error) {
         console.error("Error updating book" . error)
      }
   }

   return (
      <View style={styles.container}>
         <Back
            style={styles.backButton}
            onPress={() =>
               navigation.navigate("Book Details", {
                  id: id,
                  title: title,
                  synopsis: synopsis,
                  author: author,
                  genre: genre,
                  year: year,
               })
            }
         />

         <ScrollView>
            <View style={styles.inputContainer}>
               <TextInput
                  maxLength={25}
                  onChangeText={value => setBook({ ...book, title: value })}
                  style={styles.input}
                  selectionColor={colorPalette[0]}
                  placeholder="Título"
                  value={book.title}
               />

               <TextInput
                  multiline={true}
                  onChangeText={value => setBook({ ...book, synopsis: value })}
                  style={styles.input}
                  selectionColor={colorPalette[0]}
                  placeholder="Sinopsis"
                  value={book.synopsis}
               />

               <TextInput
                  onChangeText={value => setBook({ ...book, author: value })}
                  style={styles.input}
                  selectionColor={colorPalette[0]}
                  placeholder="Autor"
                  value={book.author}
               />

               <TextInput
                  maxLength={15}
                  onChangeText={value => setBook({ ...book, genre: value })}
                  style={styles.input}
                  selectionColor={colorPalette[0]}
                  placeholder="Género"
                  value={book.genre}
               />
               
               <TextInput
                  onChangeText={value => setBook({ ...book, year: value })}
                  style={styles.input}
                  selectionColor={colorPalette[0]}
                  placeholder="Año"
                  value={book.year}
               />
            </View>
         </ScrollView>

         <Pressable onPress={() => handleUpdateBook(id)} style={styles.createButton}>
            <Text style={styles.textButton}>Actualizar</Text>
         </Pressable>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colorPalette[1],
      padding: 20,
      gap: 20,
   },

   inputContainer: {
      marginTop: 20,
      flexDirection: "column",
      gap: 20,
   },

   input: {
      fontSize: 20,
      paddingLeft: 20,
      width: "auto",
      padding: 16,
      borderRadius: 10,
      backgroundColor: colorPalette[3],
   },

   backButton: {
      marginTop: 40,
   },

   createButton: {
      position: "absolute",
      bottom: 40,
      alignSelf: "center",
      marginTop: 100,
      backgroundColor: colorPalette[0],
      borderRadius: 10,
      width: 200,
   },

   textButton: {
      color: colorPalette[1],
      fontSize: 20,
      padding: 12,
      textAlign: "center",
   },
});
