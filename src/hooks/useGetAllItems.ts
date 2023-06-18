import {useQuery} from '@tanstack/react-query';
import itemsAPI from '../apis/itemsAPI';

const useGetAllItems = () =>
  useQuery(['allItem'], async () => await itemsAPI.getAll());

export default useGetAllItems;
