import React, { useState, useEffect, useRef } from 'react';
import { AuthProvider } from './components/auth';
import { SongList, AudioProvider, PlayerBar } from './components/songs';
import { AlbumList } from './components/albums';
import { Album } from './components/album';
import { NavBar } from './components/ui/navbar';
import { api } from "./api"
import { useInfiniteQuery, useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Artist, Artists } from './components/artists';

const queryClient = new QueryClient();

const Home = ({searchQuery}) => {
  const sentinelRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['songs', searchQuery],
    queryFn: ({ pageParam = 1 }) => api.getSongs(searchQuery, 'search', pageParam),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return url.searchParams.get('page');
    },
  });

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting && hasNextPage) fetchNextPage(); },
      { threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const songs = data?.pages.flatMap(page => page.results) ?? [];

  return (
  <>
        <div class="p-4 sm:ml-64">
          <div className="container mx-auto p-4">
            <SongList songs={songs} />
            <div ref={sentinelRef} className="h-10 flex items-center justify-center">
              {isFetchingNextPage && <span className="text-gray-400 text-sm">Loading...</span>}
            </div>
          </div>
        </div>
        <div className='h-screen'></div>
        <footer className='mx-auto sticky bottom-0 sm:ml-64'>
          <PlayerBar></PlayerBar>
        </footer>
  </>
  );
}

const Albums = () => {
  // const { data: albums } = api.getAlbums();
  const { data: albums } = useQuery({ queryKey: ['songs', ""], queryFn: () => api.getAlbums("") });
  console.log(albums);
  return (
    <>
        <div class="p-4 sm:ml-64">
          <div className="container mx-auto p-4">
            {albums && (
              <AlbumList albums={albums} />
            )}
          </div>
        </div>
        <div className='h-screen'></div>
        <footer className='mx-auto sticky bottom-0 sm:ml-64'>
          <PlayerBar></PlayerBar>
        </footer>

    </>
  );
}

const RoutedApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* <NavBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} /> */}
        <Routes >
          <Route element={<><NavBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} /> <Outlet /></>}>
            <Route path="/" element={<AuthProvider><Home searchQuery={searchQuery} /></AuthProvider>} />
            <Route path="albums">
              <Route index element={<Albums />} />
              <Route path=':slug' element={<Album />} />
            </Route>
            <Route path="artists">
              <Route index element={<Artists />} />
              <Route path=':slug' element={<Artist />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};


// Root App Component remains the same
const AppPage = () => {
  return (
    <AudioProvider>
      <RoutedApp />
    </AudioProvider>
  );
}
const MainPage = () => {
  // const [searchQuery, setSearchQuery] = useState('');
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
       <AppPage />
      </AuthProvider>
    </QueryClientProvider>
  );
};

const App = () => {
  return (
    <><MainPage /></>
    // <QueryClientProvider client={queryClient}>

    // </QueryClientProvider>
  );
};

export default App;
