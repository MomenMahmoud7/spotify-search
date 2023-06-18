import {type FC} from 'react';
import AddPlaylist from '../AddPlaylist';

import classes from './Card.module.scss';

import type ItemType from '../../types/item.type';

const Card: FC<{item: ItemType}> = ({item}) => {
  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <img
          src={item.image}
          width={100}
          height={100}
          className={classes.image}
        />
        <AddPlaylist item={item} />
      </div>
      <div className={classes.content}>
        <p className={classes.title}>{item.name}</p>
        <p className={classes.description}>{`${item.character} - ${
          item.release.au ??
          item.release.eu ??
          item.release.jp ??
          item.release.na
        }`}</p>
      </div>
    </div>
  );
};

export default Card;
