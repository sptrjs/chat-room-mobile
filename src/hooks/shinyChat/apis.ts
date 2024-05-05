export const SHINY_CHAT_URL = 'https://chat-api.xueliang.org'

export const SHINY_CHAT_UPLOADER_URL = 'https://uploader.xueliang.org/server-uploader/uploader/upload/file'

export interface Profile {
  age: number
  avatar: string
  city: string
  country: string
  defaultAvatar: boolean
  gender: number
  genderMatchAvailable: boolean
  location: string
  mole: number
  reportAvailable: boolean
  sendImageAvailable: boolean
  state: string
  unreadMessageCount: number
}

export interface MyProfile extends Profile {
  chatStatus: number
  createTime: string
  deleted: boolean
  id: number
  ip: string
  lastActiveTime: string
  nickname?: string
  token: string
  userAgent: string
  viewStatus: number
  websiteLocation: string
}

export function getOnlineCount() {
  return _fetch<number>('/api/get-online-count')
}

export function login(form: { email: string, password: string }) {
  return _fetch<{ token: string }>('/api/login', 'POST', form)
}

export function signin(form: { token: string }) {
  return _fetch('/api/signin', 'POST', form)
}

/**
 * 获取登录用户资料
 *
 * @param form { token: string }
 * @returns MyProfile
 */
export function getMyProfile(form: { token: string }) {
  return _fetch<MyProfile>('/api/get-my-profile', 'POST', form)
}

/**
 * 更新资料
 *
 * @param form
 * @returns
 */
export function updateProfile(form: {
  token: string
  avatar: string
  profile_avatar_remove: ''
  nickname: string
  country: string
  state: string
  city: string
  gender: number
  age: number
}) {
  return _fetch('/api/update-profile', 'POST', form)
}

// 取匹配用户资料
export function getPartnerDetail(form: { token: string }) {
  return _fetch<Profile>('/api/get-partner-detail', 'POST', form)
}

// 举报
export function report(form: {
  token: string
  type: string
  remark: string
  blockDayCount: number
}) {
  return _fetch('/api/report', 'POST', form)
}

// 保持联系
export function keepContact(form: { remark: string, token: string }) {
  return _fetch('/api/keep-contact', 'POST', form)
}

// 删除好友
export function deleteFriend(form: { friendId: number, token: string }) {
  return _fetch('/api/delete-friend', 'POST', form)
}

export interface FriendItem {
  createTime: string
  deleted: boolean
  fromRoomId: number
  id: number
  lastMessageId: number
  lastReadMessageId: number
  member2: {
    avatar: string
    defaultAvatar: boolean
    deleted: boolean
    lastActiveTime: string
    nickname: string
  }
  memberId1: number
  memberId2: number
  read: boolean
  remark: string
  roomId: number
  status: NumberConstructor
  unreadMessageCount: number
  zhangzhang: boolean
}

// 刷新列表
export function getMyFriendList(form: { pageNo?: number, token: string }) {
  if (!form.pageNo || form.pageNo <= 1)
    form.pageNo = 1
  return _fetch< {
    current: number
    optimizeCountSql: boolean
    orders: Array<any>
    pages: number
    records: Array<FriendItem>
    searchCount: boolean
    size: number
    total: number
  }>('/api/get-my-friend-list', 'POST', form)
}

// 同意添加
export function processFriendApply(form: { status: number, memberId: number, token: string }) {
  return _fetch('/api/process-friend-apply', 'POST', form)
}

// 同意或拒绝消息已读反馈
export function readFriendApplyResult(form: { id: number, token: string }) {
  return _fetch('/api/read-friend-apply-result', 'POST', form)
}

export interface MessageItem {
  content: string
  createTime: string
  deleted: boolean
  id: number
  memberGender?: number
  memberId: number
  operate: number
  roomId: number
  system: boolean
}

// 取聊天记录
export function getMessageListV2(form: { roomId?: number, token: string }) {
  if (form.roomId === 0)
    delete form.roomId
  return _fetch<{ list: MessageItem[], shareStatus: number }>('/api/get-message-list_v2', 'POST', form)
}

export interface MatchDetail {
  gender: number
  minAge: number
  maxAge: number
  minMole: number
}

// 取匹配设置
export function getMatchDetail(form: { token: string }) {
  return _fetch<MatchDetail>('/api/get-match-detail', 'POST', form)
}

// 更新匹配设置
export function updateMatch(form: {
  token: string
} & MatchDetail) {
  return _fetch('/api/update-match', 'POST', form)
}

// 上传
export function uploader(image: string) {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('file', dataURLtoBlob(image), dataURLtoFilename(image))
    fetch(SHINY_CHAT_UPLOADER_URL, {
      method: 'POST',
      body: formData,
    }).then(response => resolve(response.json()))
      .catch(err => reject(err))
  })
}

function dataURLtoBlob(dataURL: string) {
  // 将base64的数据部分提取出来
  const byteString = atob(dataURL.split(',')[1])

  // 获取mime类型
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]

  // 创建Uint8Array类型的数组
  const ia = new Uint8Array(byteString.length)

  // 将base64字符串中的每个字符转换成ascii码
  for (let i = 0; i < byteString.length; i++)
    ia[i] = byteString.charCodeAt(i)

  // 创建Blob对象
  return new Blob([ia], { type: mimeString })
}

function dataURLtoFilename(dataURL: string) {
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0].split('/')[1]
  return `image.${mimeString}`
}

interface Response<T> {
  code: 0
  data: T
  serverTime: string
  success: true
}

interface ErrorResponse {
  code: -1
  msg: string
  serverTime: string
  success: false
}

function _fetch<T>(
  url: string,
  method: 'GET' | 'POST' = 'GET',
  data?: Record<string, any>,
): Promise<Response<T> | ErrorResponse> {
  return new Promise((resolve, reject) => {
    fetch(new URL(url, SHINY_CHAT_URL), {
      method,
      headers: {
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => resolve(response.json()))
      .catch(err => reject(err))
  })
}
