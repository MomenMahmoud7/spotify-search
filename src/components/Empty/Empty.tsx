import {type FC} from 'react';
import {TbMusicOff} from 'react-icons/tb';

import classes from './Empty.module.scss';

const Empty: FC<{message: string}> = ({message}) => {
  return (
    <div className={classes.container}>
      <TbMusicOff size={100} className={classes.icon} />
      <p className={classes.text}>{message}</p>
    </div>
  );
};

export default Empty;
