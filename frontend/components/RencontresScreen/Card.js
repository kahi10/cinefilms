import {
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Dimensions } from "react-native";
import Avatar from "../common/Avatar";
import MovieGenresDisplay from "../common/MovieGenresDisplay";
import MoviesScrollView from "../common/MoviesScrollView";

export default function Card({ user }) {
	const Movie = ({ data }) => {
		return (
			<View key={data.id} style={styles.movieItem}>
				<Image
					source={
						data.poster_path
							? { uri: "https://image.tmdb.org/t/p/w200" + data.poster_path }
							: require("../../assets/logo/placeholder/poster.png")
					}
					style={styles.poster}
				/>
			</View>
		);
	};

	console.log(user.favGenres);

	return (
		<View style={styles.card}>
			<View style={styles.topSection}>
				<View style={styles.userInfo}>
					<Avatar uri={user.avatar} size={64} />
					<Text style={styles.title}>{user.username}</Text>
				</View>
				<TouchableOpacity
					onPress={() => console.log("AddFriend")}
					style={styles.addFriendButton}
					activeOpacity={0.8}
				>
					<Text style={styles.buttonText}>+ Ajouter</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.biography}>
				<Text style={styles.text}>{user.biography}</Text>
			</View>
			<Text style={styles.title}>Mes films préférés</Text>
			<MoviesScrollView moviesIds={user.favMovies} />

			<Text style={styles.title}>Mes genres préférés</Text>
			<MovieGenresDisplay list={user.favGenres} />
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: Dimensions.get("window").width * 0.9,
		borderWidth: 1,
		borderColor: "grey",
		borderRadius: 10,
		backgroundColor: "#303232D9",
		marginTop: 20,
		padding: 8,
	},
	topSection: {
		flexDirection: "row",
		alignItems: "center",
	},
	userInfo: {
		gap: 12,
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	title: {
		color: "#FFF",
		fontWeight: 600,
		fontSize: 20,
	},
	text: {
		color: "#FFF",
		fontSize: 13,
	},
	biography: {
		marginTop: 10,
		marginBottom: 15,
	},
	movieItem: {
		backgroundColor: "#333",
		borderRadius: 5,
		marginTop: 10,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		pading: 2,
	},

	poster: {
		width: 80,
		height: 110,
		borderRadius: 5,
	},
	favoriteList: {
		flex: 1,
		height: "auto",
		width: "100%",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-around",
		gap: 10,
		marginBottom: 15,
	},
	addFriendButton: {
		backgroundColor: "rgb(201, 65, 6)",
		width: 130,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
		height: 30,
	},
	buttonText: {
		textAlign: "center",
		color: "white",
		fontSize: 18,
		fontWeight: "500",
	},
});
