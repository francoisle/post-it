import RNTextDetector from 'react-native-text-detector';

import {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

export default class TextDetectionComponent extends Component {

  constructor() {
    super();
    this.detectText = this.detectText.bind(this);
    console.log("camera", this.camera);
  }

  async detectText() {
    try {
      const options = {
        quality: 0.8,
        base64: true,
        skipProcessing: true,
      };
      const {uri} = await this.camera.takePictureAsync(options);
      const visionResp = await RNTextDetector.detectFromUri(uri);
      console.log('visionResp', visionResp);
    } catch (e) {
      console.warn(e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.detectText}
        >
          <Text>Start OCR !</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#dddddd',
    padding: 10
  }
});
