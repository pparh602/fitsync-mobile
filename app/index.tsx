import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import React from "react";
import { Video, ResizeMode } from "expo-av";
import { useRouter } from "expo-router";

const Home = () => {
  const video = React.useRef(null);
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Video */}
      {/* <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "https://pixabay.com/videos/download/video-143431_tiny.mp4",
        }}
        resizeMode={ResizeMode.COVER}
        shouldPlay={true}
        isLooping
      /> */}
      {/* Text */}
      <View style={styles.overlay}>
        <Text style={styles.subText}>Consistent</Text>
        <Text style={styles.subText}>Dedication</Text>
        <Text style={styles.subText}>Hard Work</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/auth/register")}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  mainText: {
    color: "white",
    fontSize: 68,
    fontWeight: "bold",
    textAlign: "center",
  },
  subText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  tagline: {
    color: "white",
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: "#6200ea",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3, // Adds a shadow effect on Android
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
