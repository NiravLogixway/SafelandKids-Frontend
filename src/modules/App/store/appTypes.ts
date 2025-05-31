export const GET_CHILDS = 'GET_CHILDS';
export const SET_CHILDS = 'SET_CHILDS';
export const SET_CURRENT_KID = 'SET_CURRENT_KID';
export const ADD_KID = 'ADD_KID';
export const UPDATE_KID = 'UPDATE_KID';
export const DELETE_KID = 'DELETE_KID';
export const GET_PLAYLISTS = 'GET_PLAYLISTS';
export const SET_PLAYLISTS = 'SET_PLAYLISTS';
export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST';
export const REMOVE_STATE = 'REMOVE_STATE';

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
  playlists: any[];
}

export interface GetKidsAction {
  type: typeof GET_CHILDS;
  resolve?: (value: unknown) => void;
  reject?: (reason?: any) => void;
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

export interface GetPlaylistsAction {
  type: typeof GET_PLAYLISTS;
  data: number;
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}

export interface AddChildPlaylistAction {
  type: typeof ADD_PLAYLIST;
  data: any[];
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}

export interface UpdatePlaylistAction {
  type: typeof UPDATE_PLAYLIST;
  data: any;
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}

export interface DeletePlaylistAction {
  type: typeof DELETE_PLAYLIST;
  data: any;
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}
