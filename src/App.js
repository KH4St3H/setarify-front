import React, { useState, useContext } from 'react';
import { Login, AuthProvider, AuthContext } from './components/auth';
import { SongList, AudioProvider, PlayerBar } from './components/songs';
import { AlbumList } from './components/albums';
import { Album } from './components/album';
import { NavBar } from './components/ui/navbar';
import { api } from "./api"
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

const queryClient = new QueryClient();

const Home = ({searchQuery}) => {
  const { data: songs } = useQuery({ queryKey: ['songs', searchQuery], queryFn: () => api.getSongs(searchQuery) });
  return (
    <AudioProvider>
        <div class="p-4 sm:ml-64">
          <div className="container mx-auto p-4">
            {songs && (
              <SongList songs={songs} />
            )}
          </div>
        </div>
        <div className='h-screen'></div>
        <footer className='mx-auto sticky bottom-0 sm:ml-64'>
          <PlayerBar></PlayerBar>
        </footer>

    </AudioProvider>
  );
}

const Albums = () => {
  // const { data: albums } = api.getAlbums();
  const { data: albums } = useQuery({ queryKey: ['songs', ""], queryFn: () => api.getAlbums("") });
  console.log(albums);
  return (
    <AudioProvider>
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

    </AudioProvider>
  );
}

// Root App Component remains the same
const AppPage = ({searchQuery}) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log("authenticated:");
  console.log(isAuthenticated);
  return (
    <>
      {isAuthenticated ? (
        <Home searchQuery={searchQuery} />
      ) : (
        <Login />
      )}
    </>
  );
}
// const MainPage = () => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//        <AppPage />
//       </AuthProvider>
//     </QueryClientProvider>
//   );
// };

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* <NavBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} /> */}
        <Routes >
          <Route element={<><NavBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} /> <Outlet /></>}>
            <Route path="/" element={<AuthProvider><AppPage searchQuery={searchQuery} /></AuthProvider>} />
            <Route path="albums">
              <Route index element={<Albums />} />
              <Route path=':slug' element={<Album />} />

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
