import React from 'react'
import { Audio } from 'expo-av'

export function useAudio() {
  const [record, setRecord] = React.useState<Audio.Recording>()
  const [permissionResponse, requestPermission] = Audio.usePermissions()

  async function startRecording() {
    try {
      if (permissionResponse?.status !== 'granted') {
        console.log('Requesting permission..')
        await requestPermission()
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })

      console.log('Starting recording..')
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY)
      setRecord(recording)
      console.log('Recording started')
    }
    catch (err) {
      console.error('Failed to start recording', err)
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..')
    setRecord(undefined)
    await record?.stopAndUnloadAsync()
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      },
    )
    const uri = record?.getURI()
    console.log('Recording stopped and stored at', uri)
  }

  return {
    record,
    startRecording,
    stopRecording,
  }
}
