import {useMemo, type FC} from 'react';
import {IoMdClose} from 'react-icons/io';
import appQueryClient from '../../configs/appQueryClient';
import useRemoveItem from '../../hooks/useRemoveItem';

import classes from './Playlist.module.scss';

import type PlaylistType from '../../types/playlist.type';

const Playlist: FC<{selectedPlaylist: string}> = ({selectedPlaylist}) => {
  const playlists =
    appQueryClient.getQueryData<PlaylistType[]>(['playlists']) ?? [];

  const {playlist, playlistIndex} = useMemo(() => {
    const index = playlists.findIndex(
      _playlist => _playlist.name === selectedPlaylist,
    );
    return {playlist: playlists[index], playlistIndex: index};
  }, [playlists, selectedPlaylist]);

  const removeItem = useRemoveItem(playlist, playlistIndex);

  return (
    <main className={classes.content}>
      <div className={classes.titleWrapper}>
        <p className={classes.description}>PLAYLIST</p>
        <h2 className={classes.title}>{playlist?.name}</h2>
        <p className={classes.description}>{`Created at: ${
          playlist?.createdAt ?? ''
        } - ${(playlist?.items ?? []).length} Items`}</p>
      </div>
      <div className={classes.items}>
        {(playlist?.items ?? []).map((item, index) => (
          <div
            key={`${item.head}-${item.tail}-${index}`}
            className={classes.item}>
            <img src={item.image} className={classes.image} />
            <p className={classes.title}>{item.name}</p>
            <button className={classes.button} onClick={removeItem(index)}>
              <IoMdClose />
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Playlist;
