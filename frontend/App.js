import { StyleSheet } from "react-native";
//Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Screens
import InscriptionScreen from "./screens/InscriptionScreen";
import ConnexionScreen from "./screens/ConnexionScreen";
import HomeScreen from "./screens/HomeScreen";
//import EventScreen from "./screens/EventScreen";
import FilmScreen from "./screens/FilmScreen";
import RencontresScreen from "./screens/RencontresScreen";



//redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";

//Style
import { BlurView } from "expo-blur";
import Icon from "react-native-vector-icons/Ionicons";
import * as NavigationBar from "expo-navigation-bar";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const store = configureStore({
	reducer: { user },
});

const TabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName = "";

					if (route.name === "Home") {
						iconName = "home";
					} else if (route.name === "Events") {
						iconName = "calendar-number-outline";
					} else if (route.name === "Rencontres") {
						iconName = "people-outline";
					}

					return <Icon name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: "#C94106",
				tabBarInactiveTintColor: "gray",
				headerShown: false,
				tabBarStyle: { position: "absolute" },
				tabBarBackground: () => (
					<BlurView
						experimentalBlurMethod='dimezisBlurView'
						tint='dark'
						intensity={50}
						style={StyleSheet.absoluteFill}
					/>
				),
			})}
		>
			<Tab.Screen name='Home' component={HomeScreen} />
			{/* <Tab.Screen name='Events' component={EventScreen} /> */}
			<Tab.Screen name='Rencontres' component={RencontresScreen} />
		</Tab.Navigator>
	);
};

export default function App() {
	NavigationBar.setBackgroundColorAsync("black");
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name='TabNavigator' component={TabNavigator} />
					<Stack.Screen name='Connexion' component={ConnexionScreen} />
					<Stack.Screen name='Inscription' component={InscriptionScreen} />
					<Stack.Screen name='Film' component={FilmScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",

	},
});

