import React, { useEffect, useState, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import AppContext from "./AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";

export default function ViewImages({ navigation }) {
  const [saved_images, set_saved_Images] = useState(null);
  const stateRef = useRef().current;
  let counter = 0;
  const [isready, setready] = useState(false);
  useEffect(() => {
    set_saved_Images(global.all_images);
  }, []);

  const myContext = useContext(AppContext);
  let url = myContext.URL;
  url = url.concat("Postimages");
  const postImages_toserver = async (result, i) => {
    setready(true);
    const manipResult = await manipulateAsync(
      result,
      [{ resize: { width: 480, height: 640 } }],
      { format: "jpeg" }
    );

    const value = await AsyncStorage.getItem("@user_name");
    if (value != null) {
      console.log("Name is ", value);
    }
    const form_Data = new FormData();
    form_Data.append("file", {
      uri: manipResult.uri, // this is the path to your file. see Expo ImagePicker or React Native ImagePicker
      type: `image/jpg`, // example: image/jpg

      name: `${value}.jpg`, // example: upload.jpg
    });
    fetch(url, {
      method: "POST",
      headers: {
        enctype: "multipart/form-data",
      },
      body: form_Data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Error is", err);
        Alert.alert("Error while uploading ", "Try Again later ", [
          {
            text: "OK",
            onPress: () => navigation.navigate("New Person1"),
            style: "ok",
          },
        ]);
      });
  };

  const sendto_server = async () => {
    postImages_toserver(saved_images);
  };
  const sendto_server_wrapper = async () => {
    if (saved_images) {
      const get_res = await sendto_server();

      Alert.alert("Uploading ", "All images will be uploaded soon ", [
        {
          text: "OK",
          onPress: () => navigation.navigate("New Person1"),
          style: "ok",
        },
      ]);
      setready(false);
    } else {
      Alert.alert("Upload Unsuccessfull", "No images exist", [
        {
          text: "OK",
          onPress: () => navigation.navigate("New Person1"),
          style: "ok",
        },
      ]);
      console.log("No images");
    }
  };

  return (
    <View>
      <View>
        <Text
          style={{
            fontSize: 20,
            marginTop: "10%",
            marginBottom: "10%",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "10%",
            fontWeight: "bold",
          }}
        >
          Send to server for Registeration
        </Text>
      </View>
      {isready ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View></View>
      )}
      <Image
        source={{ uri: saved_images, isStatic: true }}
        /* Use item to set the image source */
        /* Important to set a key for list items,
                       but it's wrong to use indexes as keys, see below */
        style={{
          width: 300,
          height: 350,
          borderWidth: 2,
          borderColor: "#d35647",
          resizeMode: "contain",
          margin: 8,
        }}
      />
      <View>
        <Button title="Send" onPress={sendto_server_wrapper} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
