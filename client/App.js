import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Book from "./screens/Book";
import CreateBook from "./screens/CreateBook";

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
               name="Book"
               component={Book}
               options={{ headerShown: false }}
            />

            <Stack.Screen
               name="Create Book"
               component={CreateBook}
               options={{ headerShown: false }}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
}
