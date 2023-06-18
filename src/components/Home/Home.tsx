import {useState, type FC, type ChangeEvent} from 'react';
import {Link} from 'react-router-dom';
import {LuSearch} from 'react-icons/lu';
import Items from '../Items';

import classes from './Home.module.scss';

const Home: FC = () => {
  const [searchText, setSearchText] = useState('');

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <Link to="/">
          <img src="logo.svg" className={classes.logo} />
        </Link>
        <div className={classes.input}>
          <LuSearch size={24} className={classes.icon} />
          <input
            placeholder="What do you want to listen to?"
            onChange={onSearch}
          />
        </div>
        <Link to="/playlists" className={classes.link}>
          Playlists
        </Link>
      </header>
      <Items searchText={searchText} />
    </div>
  );
};

export default Home;
