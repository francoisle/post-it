/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View
} from "react-native";

import { RNCamera } from "react-native-camera";

import {
  hasWriteExternalStoragePermission,
  askWriteExternalStoragePermission,
  savePicture
} from "./src/Utils";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      imageUri: null,
      analyseText: false
    };

    this.takePicture = this.takePicture.bind(this);
    this.startTextAnalyze = this.startTextAnalyze.bind(this);
    this.handleTextRecognized = this.handleTextRecognized.bind(this);
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await this.camera.takePictureAsync(options);
      this.state.imageUri = data.uri;

      const canWriteExternalStorage = await hasWriteExternalStoragePermission();
      if (!canWriteExternalStorage) {
        const granted = await askWriteExternalStoragePermission();

        console.log("granted", granted);
        if (granted) {
          savePicture(this.state.imageUri);
        }
      } else {
        savePicture(this.state.imageUri);
      }
    }
  }

  handleTextRecognized(textRecognizedEvent) {
    const { analyseText } = this.state;
    if (!analyseText) {
      return;
    }

    Vibration.vibrate(400);
    console.log(
      "textRecognizedEvent.textBlocks",
      textRecognizedEvent.textBlocks
    );
    this.stopTextAnalyze();
  }

  startTextAnalyze() {
    this.setState({ analyseText: true });
  }

  stopTextAnalyze() {
    this.setState({ analyseText: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          captureAudio={false}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          androidCameraPermissionOptions={{
            title: "Permission to use camera",
            message: "We need your permission to use your camera",
            buttonNeutral: "Ask Me Later",
            buttonPositive: "Proceed",
            buttonNegative: "Cancel"
          }}
          onTextRecognized={this.handleTextRecognized}
        />
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Take a photo ! </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.startTextAnalyze}
            style={styles.capture}
          >
            <Text style={{ fontSize: 14 }}> Analyze Text ! </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  }
});
