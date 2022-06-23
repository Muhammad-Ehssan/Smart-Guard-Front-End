import React, { useState, useEffect, useContext } from "react";
import logo from "../assets/Logo.png";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AppContext from "./AppContext";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  Modal,
  StatusBar,
} from "react-native";
import { getAuth } from "firebase/auth";
import { Colors } from "react-native-paper";
import LiveStreaming from "./LiveStreaming";
import Selector from "./Selector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import * as Notifications from "expo-notifications";

export default function Home({ navigation }) {
  useEffect(() => {
    async function fetchURL() {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        // value previously stored
        console.log("Vleu present");
        console.log(value);
      }
      // error reading value
      else {
        console.log("Vleu mot present");
      }
    }

    fetchURL();
  });
  useEffect(() => {
    const backgroundSubscription =
      Notifications.addNotificationResponseReceivedListener((notification) => {
        console.log(notification); // passs the screen name in data and then navigate ot send http request
        navigation.navigate("Get_Image");
      });

    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });
    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    console.log("Yesss");
    // ...
  } else {
    // No user is signed in.
    console.log("No");
  }

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [temp, set_temp] = useState("");
  const [openmenu, setmenu] = useState(false);
  const [openSelector, setSelector] = useState(false);

  const [opencamera2, setcamera2] = useState(false);
  const [openlivestream, setlivestream] = useState(false);
  const position = "relative";
  const Press_Handler = (key) => {
    set_todos((prev_todos) => {
      return prev_todos.filter((todo) => todo.key != key);
    });
  };
  const myContext = useContext(AppContext);
  console.log(myContext);
  return (
    <View style={styles.container}>
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
        <View intensity={20} tint="light">
          <Image
            source={logo}
            style={{
              width: windowWidth,
              height: 250,
            }}
          />
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
            Home
          </Text>
        </BlurView>

        <BlurView intensity={100} style={{ marginTop: 40, borderRadius: 5 }}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={{ margin: 30 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Search Video")}
              >
                <MaterialCommunityIcons
                  name="movie-search"
                  size={90}
                  color="black"
                  style={styles.shadow}
                />
                {/* <Image source={p1} style={{ width: 90, height: 90 }} /> */}
                <Text style={styles.btns}>Search Video</Text>
              </TouchableOpacity>
            </View>
            <View style={{ margin: 30 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Live Streaming")}
              >
                <MaterialCommunityIcons
                  name="cctv"
                  size={90}
                  color="black"
                  style={styles.shadow}
                />
                {/* <Image source={p2} style={{ width: 90, height: 90 }} /> */}
                <Text style={styles.btns}>Live Streaming</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={{ margin: 30 }}>
              <TouchableOpacity onPress={() => navigation.navigate("Siren1")}>
                <FontAwesome
                  name="bell"
                  size={90}
                  color="black"
                  style={styles.shadow}
                />
                {/* <Image source={p3} style={{ width: 90, height: 90 }} /> */}
                <Text style={[styles.btns, { marginLeft: 25 }]}>Siren</Text>
              </TouchableOpacity>
            </View>
            <View style={{ margin: 30 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("New Person1")}
              >
                <Entypo
                  name="add-user"
                  size={90}
                  color="black"
                  style={styles.shadow}
                />
                {/* <Image source={p4} style={{ width: 90, height: 90 }} /> */}
                <Text style={styles.btns}>New Person</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>

        <StatusBar style="auto" />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
  },
  btns: {
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    padding: 4,
    margin: 5,
  },
  shadow: {
    shadowOpacity: 2,
    textShadowRadius: 10,
    textShadowOffset: { width: 5, height: 2 },
  },
});
