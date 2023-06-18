import {createSyncStoragePersister} from '@tanstack/query-sync-storage-persister';
import {QueryClient} from '@tanstack/react-query';
import {persistQueryClient} from '@tanstack/react-query-persist-client';

const oneDay = 24 * 60 * 60 * 1000;

const appQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: oneDay,
      staleTime: oneDay,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: localStorage,
});

persistQueryClient({
  queryClient: appQueryClient,
  persister: localStoragePersister,
});

export default appQueryClient;
