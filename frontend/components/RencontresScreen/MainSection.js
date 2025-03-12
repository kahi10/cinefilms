import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import Card from "./Card";
import SearchAndFilterSection from "./SearchAndFilterSection";

export default function MainSection({ navigation, user }) {
    const [usersData, setUsersData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    // Charge les utilisateurs au montage du composant
    useEffect(() => {
        fetch(process.env.EXPO_PUBLIC_IP_ADDRESS + "/users/", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => res.json())
            .then((data) => {
                setUsersData(data.userslist);
                setFilteredData(data.userslist);
            })
    }, []);

    // Fonction exécutée lorsque l'utilisateur effectue une recherche
    const handleSearch = (search) => {

        if (!search) {
            setFilteredData(usersData);
        } else {
            const filtered = usersData.filter((e) => e.username.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredData(filtered);
        }
    };

    return (
        <View>
            <SearchAndFilterSection onSearch={handleSearch} />
            <ScrollView keyboardShouldPersistTaps={"handled"}>
                <View style={styles.cards}>
                    {filteredData.map((people) => (
                        people._id !== user.friends._id && (
                            <Card key={people._id} user={people} />
                        )
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
	cards: {
		flex: 1,
		alignItems: "center",
		marginBottom: 200,
	},
});
