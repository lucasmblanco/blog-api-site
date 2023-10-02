import { atom } from 'nanostores';

export const user = atom({logged: false, username: null});