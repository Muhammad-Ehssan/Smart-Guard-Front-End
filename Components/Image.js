import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import AppContext from "./AppContext";
import { LinearGradient } from "expo-linear-gradient";

export default function Get_Image({ route }) {
  const myContext = useContext(AppContext);

  let url = myContext.URL;
  url = url.concat("unknown_people");

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Detected unknown person is</Text>
      <Image
        key={new Date().getTime()}
        source={{ uri: url + "?" + new Date().getTime() }}
        style={{ width: 309, height: 159 }}
      />
    </View>
  );
}
