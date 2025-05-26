import * as appTypes from './appTypes';

export const getKids = () => ({
  type: appTypes.GET_CHILDS,
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

export const addChildPlaylist = (
  videos: any[],
  resolve: (value: unknown) => void,
  reject: (reason?: any) => void,
) => ({
  type: appTypes.ADD_CHILD_PLAYLIST,
  data: videos,
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
