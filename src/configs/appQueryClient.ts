import {createSyncStoragePersister} from '@tanstack/query-sync-storage-persister';
import {QueryClient} from '@tanstack/react-query';
import {persistQueryClient} from '@tanstack/react-query-persist-client';

const appQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      staleTime: Infinity,
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
