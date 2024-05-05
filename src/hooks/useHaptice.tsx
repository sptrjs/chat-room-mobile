// https://docs.expo.dev/versions/latest/sdk/haptics/
import * as Haptics from 'expo-haptics'

export function useHaptice() {
  // 用于让用户知道何时注册了选择更改。
  Haptics.selectionAsync()

  // 在 iOS 上直接映射到 UINotificationFeedbackType 的通知反馈类型，
  // 而在 Android 上，这些是使用 Vibrator 模拟的。
  // 您可以使用以下之一。
  // Haptics.NotificationFeedbackType.{ Success, Warning, Error }
  Haptics.notificationAsync(
    Haptics.NotificationFeedbackType.Success,
  )
  Haptics.notificationAsync(
    Haptics.NotificationFeedbackType.Error,
  )
  Haptics.notificationAsync(
    Haptics.NotificationFeedbackType.Warning,
  )
  // 在 iOS 上直接映射到 UIImpactFeedbackStyle 的碰撞指示器，
  // 而在 Android 上，这些是使用 Vibrator 模拟的。
  // 您可以使用以下之一。
  // Haptics.ImpactFeedbackStyle.{ Light, Medium, Heavy }
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
}
