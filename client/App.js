import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import BookDetails from "./screens/BookDetails";
import CreateBook from "./screens/CreateBook";
import UpdateBook from "./screens/UpdateBook";

const Stack = createNativeStackNavigator();

export default function App() {
   return (
      <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen
               name="Home"
               component={Home}
               options={{ headerShown: false }}
            />

            <Stack.Screen
               name="Book Details"
               component={BookDetails}
               options={{ headerShown: false }}
            />

            <Stack.Screen
               name="Create Book"
               component={CreateBook}
               options={{ headerShown: false }}
            />

            <Stack.Screen
               name="Update Book"
               component={UpdateBook}
               options={{ headerShown: false }}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
}
