import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
  ViroBox,
  ViroMaterials,
  ViroAnimations,
  ViroAmbientLight,
  ViroARPlaneSelector,
} from '@reactvision/react-viro';

const InitialScene = () => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state: any, reason: any) {
    console.log('AR State:', state, reason);

    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('Hello, AR World!');
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setText('Tracking Lost');
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color="#ffffff" />

      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />

      <ViroARPlaneSelector>
        <ViroBox
          position={[0, 0, -1]}
          scale={[0.3, 0.3, 0.3]}
          materials={['red']}
          animation={{ name: 'rotate', run: true, loop: true }}
        />
      </ViroARPlaneSelector>
    </ViroARScene>
  );
};

ViroMaterials.createMaterials({
  red: {
    diffuseColor: '#FF0000',
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: { rotateY: 360 },
    duration: 2000,
  },
});

export default () => {
  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        key="main-ar"
        autofocus={true}
        initialScene={{ scene: InitialScene }}
        style={styles.f1}
      />

      <View style={styles.overlay}>
        <Text style={styles.overlayText}>Solar AR</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  f1: { flex: 1 },
  mainView: { flex: 1 },
  helloWorldTextStyle: {
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  overlayText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
  },
});