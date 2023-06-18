import {type ChangeEvent, useState, type MouseEvent} from 'react';
import {useMutation} from '@tanstack/react-query';
import appQueryClient from '../configs/appQueryClient';

import type PlaylistType from '../types/playlist.type';

const useCreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState('');

  const playlists =
    appQueryClient.getQueryData<PlaylistType[]>(['playlists']) ?? [];

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(e.target.value);
  };

  const clearPlaylistName = () => {
    setPlaylistName('');
  };

  const {mutate: mutatePlaylist} = useMutation(
    async (playlist: PlaylistType) => {
      const existedPlaylist = playlists.find(
        _playlist => _playlist?.name === playlist.name,
      );

      if (existedPlaylist != null || playlist.name === '') {
        return;
      }

      const newPlaylists = playlists.concat(playlist);
      appQueryClient.setQueryData(['playlists'], newPlaylists);
    },
    {
      onSuccess: clearPlaylistName,
    },
  );

  const createPlaylist = (e: MouseEvent<HTMLButtonElement>) => {
    mutatePlaylist({
      name: playlistName,
      items: [],
      createdAt: new Date().toLocaleDateString('en-UK', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
  };
  return {playlists, playlistName, onInputChange, createPlaylist};
};

export default useCreatePlaylist;
