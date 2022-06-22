import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  Alert,
  Dimensions,
  Image,
} from "react-native";
import { Audio } from "expo-av";
import Video_List from "./Video_List";
import AppContext from "./AppContext";
import logo from "../assets/Talk.gif";
import {
  IconButton,
  Colors,
  Surface,
  Headline,
  Title,
} from "react-native-paper";
import googleani from "../assets/Google.gif";

export default function Voice({ navigation }) {
  // Refs for the audio
  const AudioRecorder = useRef(new Audio.Recording());
  const AudioPlayer = useRef(new Audio.Sound());
  const [display, setdisplay] = useState(true);
  // States for UI
  const myContext = useContext(AppContext);
  let url = myContext.URL;
  url = url.concat("voice");
  const [RecordedURI, SetRecordedURI] = useState("");
  const [message, setmessage] = useState(1);
  const [AudioPermission, SetAudioPermission] = useState(false);
  const [IsRecording, SetIsRecording] = useState(false);
  const [IsPLaying, SetIsPLaying] = useState(false);
  const [btn_color, set_color] = useState(Colors.teal700);
  // Initial Load to get the audio permission
  useEffect(() => {
    GetPermission();
  }, []);

  // Function to get the audio permission
  const GetPermission = async () => {
    const getAudioPerm = await Audio.requestPermissionsAsync();
    SetAudioPermission(getAudioPerm.granted);
  };

  // Function to start recording
  const StartRecording = async () => {
    try {
      // Check if user has given the permission to record
      set_color(Colors.teal100);
      if (AudioPermission === true) {
        try {
          // Prepare the Audio Recorder
          await AudioRecorder.current.prepareToRecordAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
          );

          // Start recording
          await AudioRecorder.current.startAsync();
          SetIsRecording(true);
        } catch (error) {
          console.log(error);
        }
      } else {
        // If user has not given the permission to record, then ask for permission
        GetPermission();
      }
    } catch (error) {}
  };

  // Function to stop recording
  const StopRecording = async () => {
    try {
      // Stop recording
      set_color(Colors.teal700);
      await AudioRecorder.current.stopAndUnloadAsync();

      // Get the recorded URI here
      const result = AudioRecorder.current.getURI();
      if (result) {
        SetRecordedURI(result);
        uploadvoice(result);
      }

      // Reset the Audio Recorder
      AudioRecorder.current = new Audio.Recording();

      SetIsRecording(false);
    } catch (error) {}
  };

  // Function to play the recorded audio
  const PlayRecordedAudio = async () => {
    try {
      // Load the Recorded URI
      await AudioPlayer.current.loadAsync({ uri: RecordedURI }, {}, true);

      // Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      // Play if song is loaded successfully
      if (playerStatus.isLoaded) {
        if (playerStatus.isPlaying === false) {
          AudioPlayer.current.playAsync();
          SetIsPLaying(true);
        }
      }
    } catch (error) {}
  };

  const uploadvoice = async (result) => {
    // 1. initialize request
    console.log("Inside", result);
    const form_Data = new FormData();
    form_Data.append("file", {
      uri: result, // this is the path to your file. see Expo ImagePicker or React Native ImagePicker
      type: `audio/m4a`, // example: image/jpg
      name: `test.m4a`, // example: upload.jpg
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
        console.log(data["data"]);
        if (data["data"] != "err") {
          Alert.alert("You Said : ", data["message"], [
            {
              text: "OK",
              style: "ok",

              onPress: () => {
                navigation.navigate("Search Result", {
                  paramKey: data["data"],
                });
              },
            },
            {
              text: "Cancel",
            },
          ]);
        } else {
          Alert.alert(
            "You Said : ",
            data["message"] + " so cannot procceed further",
            [
              {
                text: "OK",
                style: "ok",
              },
            ]
          );
        }
        console.log(data["message"]);
      })
      .catch((e) => {
        console.log("Error is", e);
        Alert.alert("No network ", "Try Again later ", [
          {
            text: "OK",

            style: "ok",
          },
        ]);
      });
  };
  // Function to stop the playing audio
  const StopPlaying = async () => {
    try {
      //Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      // If song is playing then stop it
      if (playerStatus.isLoaded === true)
        await AudioPlayer.current.unloadAsync();

      SetIsPLaying(false);
    } catch (error) {}
  };

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "flex-start",
        height: windowHeight,
        backgroundColor: "white",
      }}
    >
      <View style={{ marginTop: "50%", alignSelf: "center" }}>
        <Title>Press, Speak and Search Video</Title>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Surface style={{ borderRadius: 500 }} elevation={5}>
            <IconButton
              icon="microphone"
              color={btn_color}
              size={150}
              animated={true}
              onPress={IsRecording ? StopRecording : StartRecording}
              style={styles.shadow}
            />
          </Surface>
        </View>
      </View>

      <View style={{ justifyContent: "flex-end" }}>
        <Image
          source={logo}
          style={{
            width: 200,
            height: 200,
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  shadow: {
    shadowOpacity: 2,
    textShadowRadius: 10,
    textShadowOffset: { width: 5, height: 2 },
  },
});
