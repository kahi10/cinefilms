import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Button from "../common/Button";
import TextInput from "../common/TextInput";

function InscriptionScreen2({
  handleNext,
  name,
  setName,
  age,
  setAge,
  city,
  setCity,
  genre,
  setGenre,
}) {
  return (
    <View>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>AVATAR</Text>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.Input}>Pseudo</Text>

          <TextInput
            onChangeText={setName}
            value={name}
            placeholder="choisissez un pseudo"
          ></TextInput>
        </View>
        <View>
          <Text style={styles.Input}>Age</Text>

          <TextInput
            onChangeText={setAge}
            value={age}
            placeholder="Entrez votre âge"
          ></TextInput>
        </View>
        <View>
          <Text style={styles.Input}>Votre localisation </Text>

          <TextInput
            onChangeText={setCity}
            value={city}
            placeholder="Entez où vous situez"
          ></TextInput>
        </View>
        <View>
          <Text style={styles.Input}>Genre</Text>

          <TextInput
            onChangeText={setGenre}
            value={genre}
            placeholder="Parce qu'on aime mieux te connaître ! 😉"
          ></TextInput>
        </View>
        <View style={styles.button}>
          <Button text="Scène suivante🎬" onPress={handleNext} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: 380,
    marginTop: 50,
    marginLeft: 20,
  },
  champInput: {
    borderWidth: 2,
    borderColor: "#C94106",
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 10,
    color: "#FFFFFF",
    width: "100%",
  },
  Input: {
    padding: 12,
    fontSize: 16,
    color: "#C94106",
  },
  avatar: {
    borderColor: "pink",
    backgroundColor: "pink",
    borderWidth: 5,
    height: 120,
    width: 120,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginLeft: 150,
  },
  avatarText: {
    fontSize: 25,
    fontWeight: "bold",
  },

  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    marginTop: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InscriptionScreen2;
