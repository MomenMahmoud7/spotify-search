import axiosInstance from '../configs/axiosInstance';

import type ItemType from '../types/item.type';

interface ItemResponseType {
  amiibo: ItemType[];
}

export default {
  getAll: async () =>
    await axiosInstance
      .get<ItemResponseType>('/amiibo/')
      .then(res => res.data.amiibo),
};
