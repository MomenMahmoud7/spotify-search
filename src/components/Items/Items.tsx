import {type FC, useMemo} from 'react';
import useGetAllItems from '../../hooks/useGetAllItems';
import Empty from '../Empty';
import Card from '../Card';

import classes from './Items.module.scss';

const Items: FC<{searchText: string}> = ({searchText}) => {
  const {data, isLoading, isFetching, isError} = useGetAllItems();

  const targetData = useMemo(
    () =>
      data?.filter(item => {
        const itemName = item.name.toLowerCase();
        const searchValue = searchText.toLowerCase();
        return itemName.includes(searchValue);
      }),
    [searchText, data],
  );

  if (isLoading || isFetching) {
    return <Empty message="Loading..." />;
  }

  if (isError) {
    return <Empty message="Something went wrong" />;
  }

  if (targetData == null || targetData?.length === 0) {
    return <Empty message="No music found" />;
  }

  return (
    <main className={classes.content}>
      {targetData.map((item, index) => (
        <Card key={`${item.head}-${item.tail}-${index}`} item={item} />
      ))}
    </main>
  );
};

export default Items;
