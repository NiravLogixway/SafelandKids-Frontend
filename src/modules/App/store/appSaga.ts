import {all, fork, put, call, select, takeLatest} from 'redux-saga/effects';
import * as appTypes from './appTypes';
import * as appActions from './appActions';
import * as appApi from '../api/appApi';
import {RootState} from '@/store';
import {navigate} from '@/navigation/NavigationService';
import toast from '@/utils/toast';

interface User {
  id: string;
  [key: string]: any;
}

const getUser = (state: RootState) => state.auth.user;

function* getKids(): Generator<any, void, any> {
  try {
    const user = (yield select(getUser)) as User;
    const response = yield call(appApi.getKidsList, user.id);
    if (Array.isArray(response)) {
      yield put(appActions.setKids(response));
    }
  } catch (error) {
    console.error('Error in getKids saga:', error);
  }
}

function* addKid(action: appTypes.AddKidAction): Generator<any, void, any> {
  try {
    const user = (yield select(getUser)) as User;
    const payload = {
      data: {
        ...action.data,
        parent: user.id,
      },
    };
    const response = yield call(appApi.addKid, payload);
    if (response?.data?.id) {
      yield call(getKids);
      navigate('Home', {});
      toast.success('Child added successfully');
      action.resolve(response.data);
    } else {
      action.reject(response.data);
    }
  } catch (error: any) {
    toast.error(error.error?.message || 'Failed to add child');
    console.error('Error in addKid saga:', error);
    action.reject(error);
  }
}

function* updateKid(
  action: appTypes.UpdateKidAction,
): Generator<any, void, any> {
  try {
    const kid = action.data;
    const response = yield call(appApi.updateKid as any, kid.id, {data: kid});
    if (response?.data?.id) {
      yield call(getKids);
      navigate('Home', {});
      toast.success('Child updated successfully');
      action.resolve(response.data);
    } else {
      action.reject(response.data);
    }
  } catch (error: any) {
    toast.error(error.error?.message || 'Failed to update child');
    action.reject(error);
    console.error('Error in updateKid saga:', error);
  }
}

function* deleteKid(
  action: appTypes.DeleteKidAction,
): Generator<any, void, any> {
  try {
    const response = yield call(appApi.deleteKid as any, action.data.id);
    if (response?.data?.id) {
      yield call(getKids);
      toast.success('Child deleted successfully');
      action.resolve(response.data);
    } else {
      action.reject(response.data);
    }
  } catch (error: any) {
    toast.error(error.error?.message || 'Failed to delete child');
    action.reject(error);
    console.error('Error in deleteKid saga:', error);
  }
}

function* getPlaylists(
  action: appTypes.GetPlaylistsAction,
): Generator<any, void, any> {
  try {
    const response = yield call(appApi.getPlaylists as any, action.data);
    if (Array.isArray(response)) {
      yield put(appActions.setPlaylists(response));
      action.resolve(response);
    } else {
      action.reject(response);
    }
  } catch (error: any) {
    action.reject(error);
    console.error('Error in getPlaylists saga:', error);
  }
}

function* addPlaylist(
  action: appTypes.AddChildPlaylistAction,
): Generator<any, void, any> {
  try {
    const response = yield call(appApi.addPlaylist as any, action.data);
    if (response?.success) {
      toast.success('Playlist added successfully');
      yield call(getKids);
      navigate('Home', {});
      action.resolve(response);
    } else {
      action.reject(response);
    }
  } catch (error: any) {
    toast.error(error.error?.message || 'Failed to add child playlist');
    action.reject(error);
    console.error('Error in addPlaylist saga:', error);
  }
}

function* updatePlaylist(
  action: appTypes.UpdatePlaylistAction,
): Generator<any, void, any> {
  try {
    const playlists = yield select((state: RootState) => state.app.playlists);
    const data = action.data.data;
    const response = yield call(
      appApi.updatePlaylist as any,
      data.id,
      action.data,
    );
    const {id, attributes} = response.data ?? {};
    if (id) {
      const updatedPlaylists = playlists.map((playlist: any) =>
        playlist.id === id ? {id, ...attributes} : playlist,
      );
      yield put(appActions.setPlaylists(updatedPlaylists));
      action.resolve(response.data);
    } else {
      action.reject(response.data);
    }
  } catch (error: any) {
    toast.error(error.error?.message || 'Failed to update playlist');
    action.reject(error);
    console.error('Error in updatePlaylist saga:', error);
  }
}

function* deletePlaylist(
  action: appTypes.DeletePlaylistAction,
): Generator<any, void, any> {
  try {
    const response = yield call(appApi.deletePlaylist as any, action.data);
    if (response?.data?.id) {
      toast.success('Playlist deleted successfully');
      action.resolve(response.data);
    } else {
      action.reject(response.data);
    }
  } catch (error: any) {
    toast.error(error.error?.message || 'Failed to delete playlist');
    action.reject(error);
    console.error('Error in deletePlaylist saga:', error);
  }
}

export function* watchSagas(): Generator<any, void, any> {
  yield takeLatest(appTypes.GET_CHILDS, getKids);
  yield takeLatest(appTypes.ADD_KID, addKid);
  yield takeLatest(appTypes.UPDATE_KID, updateKid);
  yield takeLatest(appTypes.DELETE_KID, deleteKid);
  yield takeLatest(appTypes.GET_PLAYLISTS, getPlaylists);
  yield takeLatest(appTypes.ADD_PLAYLIST, addPlaylist);
  yield takeLatest(appTypes.UPDATE_PLAYLIST, updatePlaylist);
  yield takeLatest(appTypes.DELETE_PLAYLIST, deletePlaylist);
}

export default function* runSagas(): Generator<any, void, any> {
  yield all([fork(watchSagas)]);
}
