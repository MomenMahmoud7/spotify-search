import {type MouseEvent} from 'react';
import {useMutation} from '@tanstack/react-query';
import appQueryClient from '../configs/appQueryClient';
import _set from 'lodash/set';
import _cloneDeep from 'lodash/cloneDeep';

import type PlaylistType from '../types/playlist.type';

const useRemoveItem = (playlist: PlaylistType, playlistIndex: number) => {
  const playlists =
    appQueryClient.getQueryData<PlaylistType[]>(['playlists']) ?? [];

  const {mutate} = useMutation(async (itemIndex: number) => {
    const newPlaylists = _cloneDeep(playlists);
    const newItems = playlist.items.filter((item, i) => itemIndex !== i);

    _set(newPlaylists, [playlistIndex, 'items'], newItems);
    appQueryClient.setQueryData(['playlists'], newPlaylists);
  });

  const removeItem =
    (itemIndex: number) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      mutate(itemIndex);
    };

  return removeItem;
};

export default useRemoveItem;
