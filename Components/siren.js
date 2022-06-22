import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  Alert,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import logo from "../assets/Bell.gif";
import o_logo from "../assets/Logo.png";
import { Surface } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
export default function Siren() {
  const [state, setstate] = useState(false);
  const windowWidth = Dimensions.get("window").width;
  return (
    <View style={styles.container}>
      <LinearGradient
        // Button Linear Gradient
        colors={["#86A8E7", "#D16BA5", "#5FFBF1"]}
        style={styles.container}
      >
        <Image
          source={o_logo}
          style={{
            width: windowWidth,
            height: 250,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setstate(!state);
          }}
        >
          <Surface elevation={5} style={{ padding: 30, borderRadius: 90 }}>
            {/* <FontAwesome name="bell" size={190} color="purple" /> */}
            <Image
              source={logo}
              style={{
                width: 200,
                height: 200,
              }}
            />
            {state ? (
              <View style={{ paddingLeft: 50 }}>
                <Text style={styles.text}>ON</Text>
              </View>
            ) : (
              <View style={{ paddingLeft: 50 }}>
                <Text style={styles.text}>OFF</Text>
              </View>
            )}
          </Surface>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },
  text: {
    color: "black",
    fontSize: 50,
    fontWeight: "500",
  },
});
