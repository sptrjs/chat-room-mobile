import * as ImagePicker from 'expo-image-picker'
import React from 'react'

export function useImagePicker() {
  const [image, setImage] = React.useState<string>()
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    })

    if (!result.canceled)
      setImage(result.assets[0].uri)
  }

  return {
    image,
    pickImage,
  }
}
