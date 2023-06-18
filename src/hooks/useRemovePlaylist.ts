import {type MouseEvent} from 'react';
import {useMutation} from '@tanstack/react-query';
import appQueryClient from '../configs/appQueryClient';

import type PlaylistType from '../types/playlist.type';

const useRemovePlaylist = () => {
  const playlists =
    appQueryClient.getQueryData<PlaylistType[]>(['playlists']) ?? [];

  const {mutate} = useMutation(async (name: string) => {
    appQueryClient.setQueryData(
      ['playlists'],
      playlists.filter(_playlist => _playlist.name !== name),
    );
  });

  const removePlaylist =
    (playlistName: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      mutate(playlistName);
    };

  return removePlaylist;
};

export default useRemovePlaylist;
