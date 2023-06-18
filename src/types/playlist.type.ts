import type ItemType from './item.type';

interface PlaylistType {
  name: string;
  items: ItemType[];
  createdAt: string;
}
export default PlaylistType;
