import type { MESSAGE_CHAT_DATA, MESSAGE_DATA } from '../interface'
import { MessageOperateEnum, MessageTypeEnum } from '../interface'

interface CreateOnMessage {
  ack: (operate: number) => void
  onMessage?: (roomId: number, msg: MESSAGE_CHAT_DATA) => void
  onTyping?: () => void
  onChangeChatStatus?: (chatStatus: number) => void
}

export function createOnMessage(opts: CreateOnMessage) {
  let chatStatus = 0
  const handle = (msg: MESSAGE_DATA) => {
    if (msg.type === MessageTypeEnum.RESPONSE)
      return

    const operate = msg.operate
    opts.ack(operate)

    if (msg.type === MessageTypeEnum.NOTIFY) {
      if (msg.chatStatus !== chatStatus) {
        chatStatus = msg.chatStatus
        opts.onChangeChatStatus?.(chatStatus)
      }

      if (msg.system) {
        switch (msg.operate) {
          case MessageOperateEnum.ENTER_SUCCESS:
          case MessageOperateEnum.EXIT_SUCCESS:
            // 检测 chatStatus 状态, 不需要处理 匹配和离开消息
            break
          case MessageOperateEnum.STATE:
            // 连接成功后会检测一次
            // shinyChat.onState?.(msg)
            break
          default:
        }
      }
      else {
        switch (operate) {
          case MessageOperateEnum.OTHER_MESSAGE:
          case MessageOperateEnum.SELF_MESSAGE:
            opts.onMessage?.(0, msg)
            break
          case MessageOperateEnum.SELF_PRIVATE_MESSAGE:
          case MessageOperateEnum.OTHER_PRIVATE_MESSAGE:
            opts.onMessage?.(msg.roomId!, msg)
            break
          // case MessageOperateEnum.FEEDBACK_MESSAGE:
          //   // FEEDBACK_MESSAGE
          //   break
          case MessageOperateEnum.TYPING:
            opts.onTyping?.()
            break
        }
      }
    }
  }

  return (data: MessageEvent) => handle(JSON.parse(data.data))
}
