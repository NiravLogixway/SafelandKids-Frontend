import axios from 'axios';
import api from '@/api';

export interface YoutubeOEmbedResponse {
  title: string;
  author_name: string;
  author_url: string;
  type: string;
  height: number;
  width: number;
  version: string;
  provider_name: string;
  provider_url: string;
  thumbnail_height: number;
  thumbnail_width: number;
  thumbnail_url: string;
  html: string;
}

export const getKidsList = (parentId: string) => {
  return api(`parent/${parentId}/children`, null, 'get');
};

export const addKid = (kid: any) => {
  return api(`childrens`, kid, 'post');
};

export const updateKid = (id: number, kid: any) => {
  return api(`childrens/${id}`, kid, 'put');
};

export const addChildPlaylist = (playlist: any) => {
  return api(`playlists`, playlist, 'post');
};

export const getChildPlaylists = (kidId: number) => {
  return api(`children/${kidId}/playlist`, null, 'get');
};

export const deleteKid = (id: number) => {
  return api(`childrens/${id}`, null, 'delete');
};

export const deletePlaylist = (id: number) => {
  return api(`playlists/${id}`, null, 'delete');
};

export async function fetchYoutubeOEmbed(
  url: string,
): Promise<YoutubeOEmbedResponse> {
  const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
  const response = await axios.get<YoutubeOEmbedResponse>(oEmbedUrl);
  return response.data;
}
