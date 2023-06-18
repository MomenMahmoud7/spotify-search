import {type MouseEvent} from 'react';
import {useMutation} from '@tanstack/react-query';
import _set from 'lodash/set';
import _cloneDeep from 'lodash/cloneDeep';
import appQueryClient from '../configs/appQueryClient';

import type PlaylistType from '../types/playlist.type';
import type ItemType from '../types/item.type';

interface PropsType {
  item: ItemType;
  onSuccess: () => void;
}

interface MutationFnPropsType {
  playlist: PlaylistType;
  playlistIndex: number;
  item: ItemType;
}

const useAddToPlaylist = ({item, onSuccess}: PropsType) => {
  const playlists =
    appQueryClient.getQueryData<PlaylistType[]>(['playlists']) ?? [];

  const {mutate: mutateItem} = useMutation(
    async ({playlist, playlistIndex, item}: MutationFnPropsType) => {
      const existedItem = playlist.items.find(
        _item => _item.head === item.head && _item.tail === item.tail,
      );

      if (existedItem != null) {
        return;
      }

      const newPlaylists = _cloneDeep(playlists);
      const newItems = playlist.items.concat(item);

      _set(newPlaylists, [playlistIndex, 'items'], newItems);
      appQueryClient.setQueryData(['playlists'], newPlaylists);
    },
    {
      onSuccess,
    },
  );

  const addToPlaylist =
    (playlist: PlaylistType, playlistIndex: number) =>
    (e: MouseEvent<HTMLButtonElement>) => {
      mutateItem({playlist, playlistIndex, item});
    };

  return addToPlaylist;
};

export default useAddToPlaylist;
