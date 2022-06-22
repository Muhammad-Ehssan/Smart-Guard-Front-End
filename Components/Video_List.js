import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import View_Video from "./Videos";
import * as FileSystem from "expo-file-system";
import AppContext from "./AppContext";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import googleani from "../assets/Google.gif";

export default function Video_List({ route }) {
  const myContext = useContext(AppContext);
  let url = myContext.URL;
  url = url.concat("video_stored/");
  const { width, height } = Dimensions.get("window");
  const windowWidth = Dimensions.get("window").width;
  useEffect(() => {
    console.log(Video_URI);
    setsuri(route.params.paramKey);
    console.log(route.params.paramKey);
  }, []);
  const [display, setdisplay] = useState(true);
  useEffect(() => {
    setdisplay(true);
  }, []);
  setTimeout(() => {
    setdisplay(false);
    console.log("Now false");
  }, 5000);
  const [Video_URI, setsuri] = useState([
    { uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4", key: 1 },
  ]);
  return (
    <View>
      <LinearGradient
        // Button Linear Gradient
        colors={["#86A8E7", "#D16BA5", "#5FFBF1"]}
        style={styles.container}
      >
        {display ? (
          <View>
            <Image
              source={googleani}
              style={{ width: windowWidth, height: 300 }}
            />
          </View>
        ) : (
          <FlatList
            data={Video_URI}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View_Video item={url + item.uri} />
            )}
          />
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({});
