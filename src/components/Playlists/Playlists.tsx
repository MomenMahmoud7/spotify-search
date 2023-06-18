import {type MouseEvent, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {IoMdClose} from 'react-icons/io';
import appQueryClient from '../../configs/appQueryClient';
import Empty from '../Empty';
import Playlist from '../Playlist';
import CreatePlaylist from '../CreatePlaylist';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';
import useRemovePlaylist from '../../hooks/useRemovePlaylist';

import classes from './Playlists.module.scss';

import type PlaylistType from '../../types/playlist.type';

const Playlists = () => {
  const playlists =
    appQueryClient.getQueryData<PlaylistType[]>(['playlists']) ?? [];

  const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0]?.name);

  useEffect(() => {
    setSelectedPlaylist(playlists[0]?.name);
  }, [playlists]);

  const selectPlaylist =
    (playlistName: string) => (e: MouseEvent<HTMLButtonElement>) => {
      setSelectedPlaylist(playlistName);
    };

  const {playlistName, onInputChange, createPlaylist} = useCreatePlaylist();

  const removePlaylist = useRemovePlaylist();

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <Link to="/">
          <img src="logo.svg" className={classes.logo} />
        </Link>
        <CreatePlaylist
          playlistName={playlistName}
          onInputChange={onInputChange}
          createPlaylist={createPlaylist}
        />
      </header>
      <header className={classes.playlists}>
        {playlists.map(playlist => (
          <button
            key={playlist.name}
            onClick={selectPlaylist(playlist.name)}
            className={`
              ${classes.playlist}
              ${playlist.name === selectedPlaylist ? classes.selected : ''}
            `}>
            <p className={classes.title}>{playlist.name}</p>
            <button
              className={classes.button}
              onClick={removePlaylist(playlist.name)}>
              <IoMdClose />
            </button>
          </button>
        ))}
      </header>
      {playlists.length === 0 ? (
        <Empty message="No playlist found" />
      ) : (
        <Playlist selectedPlaylist={selectedPlaylist} />
      )}
    </div>
  );
};

export default Playlists;
