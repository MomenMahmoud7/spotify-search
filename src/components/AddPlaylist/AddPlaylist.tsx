import {useState, type FC} from 'react';
import {FiPlus} from 'react-icons/fi';
import {Popover} from 'react-tiny-popover';
import appQueryClient from '../../configs/appQueryClient';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';
import useAddToPlaylist from '../../hooks/useAddToPlaylist';
import CreatePlaylist from '../CreatePlaylist';

import classes from './AddPlaylist.module.scss';

import type ItemType from '../../types/item.type';
import type PlaylistType from '../../types/playlist.type';

const AddPlaylist: FC<{item: ItemType}> = ({item}) => {
  const [open, setOpen] = useState(false);

  const playlists =
    appQueryClient.getQueryData<PlaylistType[]>(['playlists']) ?? [];

  const openPopover = () => {
    setOpen(true);
  };

  const closePopover = () => {
    setOpen(false);
  };

  const {playlistName, onInputChange, createPlaylist} = useCreatePlaylist();

  const addToPlaylist = useAddToPlaylist({
    item,
    onSuccess: closePopover,
  });

  return (
    <Popover
      isOpen={open}
      align="start"
      onClickOutside={closePopover}
      content={
        <div className={classes.content}>
          <p className={classes.label}>Create new playlist</p>
          <CreatePlaylist
            playlistName={playlistName}
            onInputChange={onInputChange}
            createPlaylist={createPlaylist}
          />
          {playlists.length > 0 && <div className={classes.divider}></div>}
          {playlists.map((playlist, playlistIndex) => (
            <button
              key={playlist.name}
              className={classes.playlist}
              onClick={addToPlaylist(playlist, playlistIndex)}>
              {playlist.name}
            </button>
          ))}
        </div>
      }>
      <button className={classes.button} onClick={openPopover}>
        <FiPlus size={20} />
      </button>
    </Popover>
  );
};

export default AddPlaylist;
