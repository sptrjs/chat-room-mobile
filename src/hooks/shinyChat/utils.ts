import type { FriendItem, MyProfile, Profile } from './apis'

export function isObject(obj: unknown): obj is object {
  const type = typeof obj
  return type === 'function' || (type === 'object' && !!obj)
}

export function isMyProfile(val: Profile | FriendItem | MyProfile): val is MyProfile {
  return 'websiteLocation' in val
}

export function isFriendItem(val: Profile | FriendItem | MyProfile): val is FriendItem {
  return 'member2' in val
}

interface IProfile {
  roomId: number
  nickename: string
  avatar: string
  defaultAvatar: boolean
  age?: number
  lastActiveTime?: string
  unreadMessageCount: number
}

export function unifyProfile(profile: Profile | FriendItem): IProfile {
  if (isFriendItem(profile)) {
    return {
      roomId: profile.roomId,
      nickename: profile.member2.nickname,
      avatar: profile.member2.avatar,
      defaultAvatar: profile.member2.defaultAvatar,
      lastActiveTime: profile.member2.lastActiveTime,
      unreadMessageCount: profile.unreadMessageCount,
    }
  }

  // if (isMyProfile(profile)) {
  //   return {
  //     nickename: profile.nickname ?? 'empty nickname',
  //     avatar: profile.avatar,
  //     defaultAvatar: profile.defaultAvatar,
  //     age: profile.age,
  //     lastActiveTime: profile.lastActiveTime,
  //   }
  // }

  return {
    roomId: 0,
    nickename: 'partner user',
    avatar: profile.avatar,
    defaultAvatar: profile.defaultAvatar,
    age: profile.age,
    unreadMessageCount: profile.unreadMessageCount,
  }
}
