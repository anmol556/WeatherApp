import { StyleSheet, View, Text, TouchableOpacity, Button, Image } from "react-native";
import React, { useState } from "react";

export default function Details({ route }: { route: any }) {
  // const YOUR_ACCESS_KEY = "833fe43b42ea6ec881c496f95300efb8";

  const [capital, setCapital] = useState<any>();

  async function fetchDetailsCapital() {
    const apiResponse = await fetch(
      `http://api.weatherstack.com/current?access_key=833fe43b42ea6ec881c496f95300efb8&query=${country}`
    );
    const response = await apiResponse.json();
    setCapital(response);
    console.log("capital ,", capital);
  }
  const {
    country,
    capitalFromHome,
    population,
    latitudelang0,
    latitudelang1,
    flag,
  } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>Capital : </Text>
        <Text>{capitalFromHome}</Text>
      </View>
      <View style={styles.row}>
        <Text>Country : </Text>
        <Text>{country}</Text>
      </View>
      <View style={styles.row}>
        <Text>Population : </Text>
        <Text>{population}</Text>
      </View>
      <View style={styles.row}>
        <Text>Lat/Lng : </Text>
        <Text>{latitudelang0} / </Text>
        <Text>{latitudelang1}</Text>
      </View>
      <View style={styles.row}>
        <Text>Flag : </Text>
        <Text>{flag}</Text>
      </View>

      <Button
        title="GET CAPITAL WEATHER"
        onPress={async () => {
          await fetchDetailsCapital();
        }}
      />
      {capital && (
        <>
          <Text>Temparature</Text>
          <Text>{capital.current.temperature}</Text>
          <Text>Weather Icon</Text>
          <Image source={{uri :capital.current.weather_icons[0]}}
            style={{width: 30, height: 30}}/>
          <Text>Wind Speed</Text>
          <Text>{capital.current.wind_speed}</Text>
          <Text>Weather Precipitation</Text>
          <Text>{capital.current.precip}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    borderWidth: 4,
    borderColor: "red",
    borderRadius: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    height: 50,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});