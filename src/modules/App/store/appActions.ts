import * as appTypes from './appTypes';

export const getKids = (
  resolve?: (value: unknown) => void,
  reject?: (reason?: any) => void,
) => ({
  type: appTypes.GET_CHILDS,
  resolve,
  reject,
});

export const setKids = (kids: appTypes.Kid[]) => ({
  type: appTypes.SET_CHILDS,
  data: kids,
});

export const setCurrentKid = (kid: appTypes.Kid | null) => ({
  type: appTypes.SET_CURRENT_KID,
  data: kid,
});

export const addKid = (
  kid: appTypes.Kid,
  resolve: (value: unknown) => void,
  reject: (reason?: any) => void,
) => ({
  type: appTypes.ADD_KID,
  data: kid,
  resolve,
  reject,
});

export const updateKid = (
  kid: appTypes.Kid,
  resolve: (value: unknown) => void,
  reject: (reason?: any) => void,
) => ({
  type: appTypes.UPDATE_KID,
  data: kid,
  resolve,
  reject,
});

export const deleteKid = (
  kid: appTypes.Kid,
  resolve: (value: unknown) => void,
  reject: (reason?: any) => void,
) => ({
  type: appTypes.DELETE_KID,
  data: kid,
  resolve,
  reject,
});

export const addPlaylist = (
  videos: any[],
  resolve: (value: unknown) => void,
  reject: (reason?: any) => void,
) => ({
  type: appTypes.ADD_PLAYLIST,
  data: videos,
  resolve,
  reject,
});

export const getPlaylists = (
  kidId: number,
  resolve: (value: unknown) => void,
  reject: (reason?: any) => void,
) => ({
  type: appTypes.GET_PLAYLISTS,
  data: kidId,
  resolve,
  reject,
});

export const setPlaylists = (playlists: any[]) => ({
  type: appTypes.SET_PLAYLISTS,
  data: playlists,
});

export const updatePlaylist = (
  playlist: any,
  resolve: (value: unknown) => void,
  reject: (reason?: any) => void,
) => ({
  type: appTypes.UPDATE_PLAYLIST,
  data: playlist,
  resolve,
  reject,
});

export const deletePlaylist = (
  playlist: any,
  resolve: (value: unknown) => void,
  reject: (reason?: any) => void,
) => ({
  type: appTypes.DELETE_PLAYLIST,
  data: playlist,
  resolve,
  reject,
});

export const removeState = () => ({
  type: appTypes.REMOVE_STATE,
});
