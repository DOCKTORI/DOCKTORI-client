export interface User {
  email: string;
  password: string;
  nickname?: string;
}

export interface UserChangePassword extends User {
  newpassword1: string;
  newpassword2: string;
}

export interface UserInfo {
  userNickname: string;
  userGoal: string;
}
