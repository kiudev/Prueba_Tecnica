import {
   View,
   Text,
   StyleSheet,
   FlatList,
   ScrollView,
   Image,
} from "react-native";
import Back from "../components/svg/Back";
import { colorPalette } from "../colorPalette";
import Edit from "../components/svg/Edit";
import Delete from "../components/svg/Delete";

export default function BookDetails({ navigation, route }) {
   const renderItem = ({ item }) => {
      return (
         <ScrollView>
            <Image
               style={styles.image}
               source={require("../assets/libros.jpg")}
            />
            <View style={styles.header}>
               <Text style={styles.year}>{item.year}</Text>
               <Text style={styles.genre}>{item.genre}</Text>
            </View>
            <Text style={styles.synopsisTitle}>Sinopsis</Text>
            <Text style={styles.synopsis}>{item.synopsis}</Text>

            <Text style={styles.author}>{item.author}</Text>
         </ScrollView>
      );
   };

   return (
      <View style={styles.container}>
         <Back
            style={styles.backButton}
            onPress={() => navigation.navigate("Home")}
         />

         <FlatList
            data={[route.params]}
            renderItem={renderItem}
            keyExtractor={item => item.title}
         />
         <View style={styles.footer}>
         <Edit style={styles.editButton} />
         <Delete style={styles.deleteButton} />
         </View>
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

   header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
   },

   footer: {
      position: 'absolute',
      bottom: 30,
      alignSelf: "center",
      flexDirection: 'row',
      alignItems: "center",
      gap: 50,
   },

   backButton: {
      marginTop: 40,
   },

   editButton: {
      backgroundColor: colorPalette[0],
      borderRadius: 50
   },

   deleteButton: {
      backgroundColor: colorPalette[0],
      borderRadius: 50
   },

   image: {
      width: "100%",
      height: 150,
      borderRadius: 10,
   },

   title: {
      fontSize: 40,
      fontWeight: "bold",
      marginTop: 10,
      borderWidth: 1,
      width: 235,
   },

   author: {
      fontSize: 24,
      color: colorPalette[2],
      marginTop: 20,
      fontWeight: "bold",
   },

   synopsis: {
      fontSize: 18,
      marginTop: 10,
   },

   synopsisTitle: {
      fontSize: 24,
      marginTop: 10,
      fontWeight: "bold",
   },

   genre: {
      fontSize: 16,
      color: colorPalette[3],
      backgroundColor: colorPalette[0],
      padding: 5,
      paddingHorizontal: 14,
      marginTop: 10,
      borderRadius: 10,
   },

   year: {
      fontSize: 20,
      color: colorPalette[2],
      marginTop: 10,
   },
});
