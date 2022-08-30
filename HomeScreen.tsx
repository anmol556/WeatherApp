import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, View, Button } from "react-native";
import { useState } from "react";

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [text, setText] = useState<string>("");
  const [buttonActive, setButtonActive] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<any>();

  async function fetchdetails(countryName: any) {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setApiResponse(data))
      .catch((err) => console.log("error ", err));
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Country Name"
        underlineColorAndroid="#0096FF"
        defaultValue={text}
        onChangeText={(text) => {
          setText(text);
          setButtonActive(true);
        }}
      ></TextInput>
      <Button
        disabled={buttonActive ? false : true}
        title="SEARCH"
        color="#0096FF"
        onPress={async () => {
          await fetchdetails(text);
          setTimeout(() => {
            navigation.navigate("Details", {
              country: apiResponse[0].name.common,
              capitalFromHome: apiResponse[0].capital[0],
              population: apiResponse[0].population,
              latitudelang0: apiResponse[0].latlng[0],
              latitudelang1: apiResponse[0].latlng[1],
              flag: apiResponse[0].flag,
            });
          }, 3000);
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "thistle",
    borderRadius: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: 100,
    paddingBottom: 10,
  },
  Button: {
    marginTop: 10,
  },
});