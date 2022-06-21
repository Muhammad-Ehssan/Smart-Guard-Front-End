import React from "react";
import logo from "../assets/Logo.png";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
export default function Selector({ turnback, url, navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const position = "relative";
  return (
    <View style={{ height: windowHeight }}>
      <LinearGradient
        // Button Linear Gradient
        colors={["#86A8E7", "#D16BA5", "#5FFBF1"]}
        style={styles.container}
      >
        <View
          style={{
            top: 1,
            right: "42%",
            position,
          }}
        >
          <TouchableOpacity onPress={navigation.toggleDrawer}>
            <Entypo name="menu" size={40} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <Image source={logo} style={{ width: windowWidth, height: 300 }} />
        </View>
        <BlurView intensity={100} style={{ backgroundColor: "black" }}>
          <Text
            style={{
              width: windowWidth,
              fontWeight: "bold",
              fontSize: 20,
              color: "black",

              textAlign: "center",

              padding: 2,
            }}
          >
            Add Person
          </Text>
        </BlurView>
        <BlurView intensity={100} style={{ marginTop: "20%", borderRadius: 5 }}>
          <View style={{ flexDirection: "row", margin: 20 }}>
            <View style={{ margin: 20 }}>
              <TouchableOpacity onPress={() => navigation.navigate("Camera1")}>
                <Ionicons name="camera-outline" size={90} color="black" />
                <Text style={styles.btns}>Open camera</Text>
              </TouchableOpacity>
            </View>
            <View style={{ margin: 20, marginLeft: 50 }}>
              <TouchableOpacity onPress={() => navigation.navigate("Camera2")}>
                <Ionicons name="images-outline" size={90} color="black" />
                <Text style={styles.btns}>Open Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  btns: {
    fontWeight: "bold",
  },
  container: {
    flex: 1,

    alignItems: "center",
  },
});
