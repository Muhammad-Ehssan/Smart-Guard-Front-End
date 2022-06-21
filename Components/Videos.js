import React, { useEffect, useState, useContext, useRef } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { BlurView } from "expo-blur";

export default function View_Video({ item }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <BlurView intensity={100} style={{ marginTop: "10%", borderRadius: 5 }}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: item,
        }}
        useNativeControls
        resizeMode="contain"
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
