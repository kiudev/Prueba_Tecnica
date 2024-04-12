import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Back from "../components/svg/Back";
import { colorPalette } from "../colorPalette";

export default function BookDetails({ navigation, route }) {
   const { title, genre, author, synopsis, year } = route.params;

   return (
      <View style={styles.container}>
         <Back
            style={styles.backButton}
            onPress={() => navigation.navigate("Home")}
         />
         <View>
            <Text>{title}</Text>
            <Text>{genre}</Text>
            <Text>{author}</Text>
            <Text>{synopsis}</Text>
            <Text>{year}</Text>
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

   backButton: {
      marginTop: 40,
   },
});
