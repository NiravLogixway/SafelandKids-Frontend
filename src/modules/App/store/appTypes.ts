export const GET_CHILDS = 'GET_CHILDS';
export const SET_CHILDS = 'SET_CHILDS';
export const SET_CURRENT_KID = 'SET_CURRENT_KID';
export const ADD_KID = 'ADD_KID';
export const UPDATE_KID = 'UPDATE_KID';
export const DELETE_KID = 'DELETE_KID';
export const ADD_CHILD_PLAYLIST = 'ADD_CHILD_PLAYLIST';
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST';

export interface Kid {
  id?: number;
  firstName: string;
  lastName: string;
  age: number;
  enabled?: boolean;
  playlists?: any[];
}

export interface AppState {
  kids: Kid[];
  currentKid: Kid | null;
}

export interface AddKidAction {
  type: typeof ADD_KID;
  data: Kid;
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}

export interface UpdateKidAction {
  type: typeof UPDATE_KID;
  data: Kid;
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}

export interface DeleteKidAction {
  type: typeof DELETE_KID;
  data: Kid;
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}

export interface AddChildPlaylistAction {
  type: typeof ADD_CHILD_PLAYLIST;
  data: any[];
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}

export interface DeletePlaylistAction {
  type: typeof DELETE_PLAYLIST;
  data: any;
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}
