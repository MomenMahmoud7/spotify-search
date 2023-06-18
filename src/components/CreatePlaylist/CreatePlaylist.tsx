import {type MouseEvent, type ChangeEvent, type FC} from 'react';
import {FiPlus} from 'react-icons/fi';

import classes from './CreatePlaylist.module.scss';

interface CreatePlaylistPropsType {
  playlistName: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  createPlaylist: (e: MouseEvent<HTMLButtonElement>) => void;
}

const CreatePlaylist: FC<CreatePlaylistPropsType> = ({
  playlistName,
  onInputChange,
  createPlaylist,
}) => {
  return (
    <div className={classes.inputContainer}>
      <input
        value={playlistName}
        placeholder="New playlist name"
        className={classes.input}
        onChange={onInputChange}
      />
      <button className={classes.addButton} onClick={createPlaylist}>
        <FiPlus size={20} />
      </button>
    </div>
  );
};

export default CreatePlaylist;
