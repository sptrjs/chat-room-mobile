export enum ChatStatusEnum {
  _NULL,
  INIT,
  WAIT,
  CHATING,
}

export interface SendMessage {
  operate: MessageOperateEnum
  token?: string
  type?: MessageTypeEnum.REQUEST | MessageTypeEnum.ACK
  memberToken?: string
  content?: string
  roomId?: string | number
}

export enum MessageOperateEnum {
  LOGIN,
  /** 发送给匹配用户消息 */SELF_MESSAGE,
  /** 收到匹配用户消息 */OTHER_MESSAGE,
  SYSTEM_MESSAGE,
  /** 匹配 */APPLY_MATCH,
  ENTER_WAITING,
  /** 匹配用户成功 */ENTER_SUCCESS,
  /** 停止匹配 */EXIT,
  EXIT_WAITING,
  /** 匹配用户离开 */EXIT_SUCCESS,
  HEARTBEAT,
  /** 好友通知消息 */STATE,
  EXIT_APPLY_MATCH,
  ALREAD_ENTER_SUCCESS,
  /** 发给好友的消息 */SELF_PRIVATE_MESSAGE,
  /** 收到好友消息 */OTHER_PRIVATE_MESSAGE,
  /** 匹配用户正在输入 */TYPING,
  ATTENTION,
  READ_MESSAGE,
  /** 收到客服消息 */FEEDBACK_MESSAGE,
  /** 发送客服消息 */FEEDBACK_REPLY_MESSAGE,
}

export enum MessageTypeEnum {
  /* 发送消息 */ REQUEST,
  /* 收到无需处理消息 */ RESPONSE,
  /* 收到需要处理消息 */NOTIFY,
  /* 反馈处理消息 */ACK,
}

export interface MESSAGE_BASE_DATA {
  operate: MessageOperateEnum
  type: Omit<MessageTypeEnum, 'ACK' | 'REQUEST'>
  system: boolean
}
/** ---- 系统消息 ---- */
interface MESSAGE_SYSTEM extends MESSAGE_BASE_DATA {
  system: true
  type: MessageTypeEnum.NOTIFY
  chatStatus: number
}
interface MESSAGE_SYSTEM_STATE extends MESSAGE_SYSTEM {
  operate: MessageOperateEnum.STATE
  data: { friendApplyList: Array<any>, friendApplyResultList: Array<any>, lastFeedbackMessageId: number }
}

export interface MESSAGE_SYSTEM_ENTER_SUCCESS extends MESSAGE_SYSTEM {
  operate: MessageOperateEnum.ENTER_SUCCESS
  chatStatus: 3
  content: string
  deleted: boolean
  id: number
  memberId: number
  roomId: number
}
export interface MESSAGE_SYSTEM_EXIT_SUCCESS extends MESSAGE_SYSTEM {
  operate: MessageOperateEnum.EXIT_SUCCESS
  chatStatus: 1
  content: string
  deleted: boolean
  id: number
  memberId: number
  roomId: number
}
export type MESSAGE_SYSTEM_DATA =
  | MESSAGE_SYSTEM_STATE
  | MESSAGE_SYSTEM_ENTER_SUCCESS
  | MESSAGE_SYSTEM_EXIT_SUCCESS

/** ---- 用户消息 ---- */
interface MESSAGE_CHAT extends MESSAGE_BASE_DATA {
  system: false
  type: MessageTypeEnum.NOTIFY
  chatStatus: number
}

export interface MESSAGE_CHAT_DATA extends MESSAGE_CHAT {
  operate: MessageOperateEnum.SELF_MESSAGE
  | MessageOperateEnum.OTHER_MESSAGE
  | MessageOperateEnum.SELF_PRIVATE_MESSAGE
  | MessageOperateEnum.OTHER_PRIVATE_MESSAGE
  content: string
  createTime: string
  deleted: boolean
  id: number
  memberGender: number
  memberId: number
  /**
   * MessageOperateEnum.SELF_MESSAGE
   * MessageOperateEnum.OTHER_MESSAGE
   * 没有 roomId
   */
  roomId?: number
}

interface MESSAGE_CHAT_FEEDBACK_MESSAGE extends MESSAGE_CHAT {
  operate: MessageOperateEnum.FEEDBACK_MESSAGE
}
interface MESSAGE_CHAT_TYPING extends MESSAGE_CHAT {
  operate: MessageOperateEnum.TYPING
}

export type MESSAGE_DATA =
  | MESSAGE_SYSTEM_DATA
  | MESSAGE_CHAT_DATA
  | MESSAGE_CHAT_TYPING
  | MESSAGE_CHAT_FEEDBACK_MESSAGE
  | { type: MessageTypeEnum.RESPONSE }
