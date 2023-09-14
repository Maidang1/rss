import { atom, createStore } from 'jotai';


export interface User {
  avatarUrl: string
  email: string;
  emailVerified: boolean;
  fullName: string
  provider: string
}


export const userStore = createStore()
export const userAtom = atom<User>({ avatarUrl: '', email: '', emailVerified: false, fullName: '', provider: '' });
export const userLoadingAtom = atom(true)