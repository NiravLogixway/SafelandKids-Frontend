import * as appTypes from './appTypes';

export const getKids = () => ({
  type: appTypes.GET_CHILDS,
});

export const setKids = (kids: appTypes.Kid[]) => ({
  type: appTypes.SET_CHILDS,
  data: kids,
});

export const setCurrentKid = (kid: appTypes.Kid) => ({
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
