import { Box, Button, Text } from '@gluestack-ui/themed'
import { Camera, CameraType } from 'expo-camera'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

export default function CameraButton() {
  const [cameraType, setCameraType] = React.useState(CameraType.back)
  const [cameraPermissionStatus, requestCameraPermission] = Camera.useCameraPermissions()
  const camera = React.useRef<Camera>(null)

  const takePicture = React.useCallback(async () => {
    const result = await camera.current?.takePictureAsync({
      quality: 0.7,
    })
    console.log(JSON.stringify(result, null, 2))
  }, [])

  const reverse = React.useCallback(() => {
    setCameraType(cameraType === CameraType.back ? CameraType.front : CameraType.back)
  }, [cameraType])

  const onCameraReady = React.useCallback(() => {
    console.log('Camera is ready!')
  }, [])

  if (!cameraPermissionStatus) {
    requestCameraPermission()
    return null
  }

  return (
    <Box style={styles.exampleContainer}>
      <Camera ref={camera} style={styles.camera} type={cameraType} onCameraReady={onCameraReady}>
        <Box style={styles.cameraShutterButtonContainer}>
          <TouchableOpacity style={styles.cameraShutterButton} onPress={takePicture} />
        </Box>
      </Camera>
      <Box>
        <Button onPress={takePicture}>
          <Text>
            Take picture
          </Text>
        </Button>
        <Button onPress={reverse}>
          <Text>
            {cameraType === CameraType.back ? 'Switch to front' : 'Switch to back'}
          </Text>
        </Button>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
  },
  exampleContainer: {
    padding: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderColor: '#242c39',
  },
  image: {
    flex: 1,
    height: 200,
  },
  gradient: {
    height: 200,
  },
  blurExample: {
    height: 200,
  },
  blurImage: {
    ...StyleSheet.absoluteFillObject,
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    // color: PlatformColor('labelColor'),
  },
  videoExample: {
    justifyContent: 'center',
  },
  video: {
    alignSelf: 'center',
    width: 400,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    height: 500,
    backgroundColor: 'red',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraShutterButtonContainer: {
    width: 70,
    height: 70,
    margin: 20,
    padding: 3,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#fff9',
  },
  cameraShutterButton: {
    flex: 1,
    borderRadius: 35,
    backgroundColor: '#fff',
  },
})
