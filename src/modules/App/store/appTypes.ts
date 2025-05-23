export const GET_CHILDS = 'GET_CHILDS';
export const SET_CHILDS = 'SET_CHILDS';
export const SET_CURRENT_KID = 'SET_CURRENT_KID';
export const ADD_KID = 'ADD_KID';
export const UPDATE_KID = 'UPDATE_KID';

export interface Kid {
  id?: number;
  firstName: string;
  lastName: string;
  age: number;
  enabled?: boolean;
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
