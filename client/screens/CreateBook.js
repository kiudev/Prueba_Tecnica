import {
   View,
   Text,
   Pressable,
   TextInput,
   StyleSheet,
   ScrollView,
} from "react-native";
import { colorPalette } from "../colorPalette";
import Back from "../components/svg/Back";
import { useState } from "react";
import { myIp } from "./myIP";

export default function CreateBook({ navigation }) {
   const [book, setBook] = useState({
      title: "",
      synopsis: "",
      author: "",
      genre: "",
      year: "",
   });

   const handleSubmit = async e => {
      e.preventDefault();

      try {
         const response = await fetch(`${myIp}:3000/books`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               title: book.title,
               synopsis: book.synopsis,
               author: book.author,
               genre: book.genre,
               year: book.year,
            }),
         });

         if (response.ok) {
            navigation.navigate("Home");
         } else {
            console.log("Response failed");
         }
      } catch (error) {
         console.error("Error creating book", error);
      }
   };

   return (
      <View style={styles.container}>
         <Back
            style={styles.backButton}
            onPress={() => navigation.navigate("Home")}
         />

         <ScrollView>
            <View style={styles.inputContainer}>
               <TextInput
                  maxLength={25}
                  onChangeText={value => setBook({ ...book, title: value })}
                  style={styles.input}
                  selectionColor={colorPalette[0]}
                  placeholder="Título"
               />

               <TextInput
                  multiline={true}
                  onChangeText={value => setBook({ ...book, synopsis: value })}
                  style={styles.input}
                  selectionColor={colorPalette[0]}
                  placeholder="Sinopsis"
               />

               <TextInput
                  onChangeText={value => setBook({ ...book, author: value })}
                  style={styles.input}
                  selectionColor={colorPalette[0]}
                  placeholder="Autor"
               />

               <TextInput
                  maxLength={20}
                  onChangeText={value => setBook({ ...book, genre: value })}
                  style={styles.input}
                  selectionColor={colorPalette[0]}
                  placeholder="Género"
               />

               <TextInput
                  onChangeText={value => setBook({ ...book, year: value })}
                  style={styles.input}
                  selectionColor={colorPalette[0]}
                  placeholder="Año"
               />
            </View>
         </ScrollView>

         <Pressable onPress={handleSubmit} style={styles.createButton}>
            <Text style={styles.textButton}>Crear</Text>
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
