import React, { useState, useContext } from 'react';
import { Layout, Search } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';
import { Login as Login, AuthProvider, AuthContext } from './components/auth';
import { SongList, AudioProvider, PlayerBar } from './components/songs';
import {api} from "./api"
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


const MainApp = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: songs } = useQuery({queryKey:['songs', searchQuery], queryFn: () => api.getSongs(searchQuery)});
  return (
    <AudioProvider>
      <div className="h-screen bg-gray-100 flex flex-col">

        <div className="h-screen bg-gray-100 flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Layout className="h-8 w-8 text-indigo-600" />
                <h1 className="text-2xl font-bold text-gray-900">Setarify</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Search songs, artists, albums..."
                    className="pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </header>
       <div className="flex-1 flex">
         <aside className="w-64 bg-white shadow-sm p-4 hidden md:block">
           <nav className="space-y-2">
             <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg">
               Home
             </a>
             <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg">
               Library
             </a>
           </nav>
        
           {/* Playlists */}
           <div className="mt-8">
             <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
               Playlists
             </h3>
             <div className="mt-2 space-y-1">
               {/* {playlists?.map(playlist => (
                 <a
                   key={playlist.slug}
                   href="#"
                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-lg"
                 >
                   {playlist.title}
                 </a>
               ))} */}
             </div>
           </div>
         </aside>
         <main className="flex-1 p-6 overflow-auto">
           <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Featured Songs</h2>
               {/* {albums?.map((album) => (
                 <Card title={album.title} imageUrl={album.cover} className="p-4 hover:shadow-lg transition-shadow">
                   <img
                     src={album.cover || '/api/placeholder/200/200'}
                     alt={album.title}
                     className="aspect-square object-cover rounded-lg mb-4"
                   />
                   <h3 className="font-medium">{album.title}</h3>
                   <p className="text-sm text-gray-600">
                     {album.artist.map(a => a.name).join(', ')}
                   </p>
                 </Card>
               ))} */}
                {songs && (
                  // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <SongList songs={songs} />
                  // </div>
                )}
             </div>
           {/* </div> */}
         </main>
         <PlayerBar />
        </div>
      </div>
         </div>
    </AudioProvider>
  );
}


// Updated Main App Component
// const MainApp = () => {
//     const [currentSong, setCurrentSong] = useState(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');

//     // Fetch data using React Query
//     const { data: albums } = useQuery({queryKey: ['albums'], queryFn: api.getAlbums});
//     const { data: songs } = useQuery({queryKey:['songs', searchQuery], queryFn: () => api.getSongs(searchQuery)});
//     const { data: playlists } = useQuery({queryKey:['playlists'], queryFn: api.getPlaylists});
//     // const { currentSong,
//     //     isPlaying,
//     //     togglePlay,
//     // } = useContext(AudioContext);

//     // const { playSong, currentSong } = useContext(AudioContext);
//     // const { 
//     //     currentSong,
//     //     isPlaying,
//     // } = useContext(AudioProvider);
//     //

//       // const { playSong } = useContext(AudioContext);
//       // const { playSong } = useContext(AudioProvider);
//   return (
//     <AudioProvider>
//       <div className="h-screen bg-gray-100 flex flex-col">

//       <div className="h-screen bg-gray-100 flex flex-col">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Layout className="h-8 w-8 text-indigo-600" />
//             <h1 className="text-2xl font-bold text-gray-900">Setarify</h1>
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="search"
//                 placeholder="Search songs, artists, albums..."
//                 className="pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="flex-1 flex">
//         <aside className="w-64 bg-white shadow-sm p-4 hidden md:block">
//           <nav className="space-y-2">
//             <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg">
//               <Home className="mr-3 h-5 w-5" />
//               Home
//             </a>
//             <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg">
//               <Library className="mr-3 h-5 w-5" />
//               Library
//             </a>
//           </nav>
          
//           {/* Playlists */}
//           <div className="mt-8">
//             <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
//               Playlists
//             </h3>
//             <div className="mt-2 space-y-1">
//               {playlists?.map(playlist => (
//                 <a
//                   key={playlist.slug}
//                   href="#"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 rounded-lg"
//                 >
//                   {playlist.title}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </aside>

//         <main className="flex-1 p-6 overflow-auto">
//           <div className="max-w-7xl mx-auto">
//             <h2 className="text-xl font-semibold mb-4">Featured Albums</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {albums?.map((album) => (
//                 <Card title={album.title} imageUrl={album.cover} className="p-4 hover:shadow-lg transition-shadow">
//                   <img
//                     src={album.cover || '/api/placeholder/200/200'}
//                     alt={album.title}
//                     className="aspect-square object-cover rounded-lg mb-4"
//                   />
//                   <h3 className="font-medium">{album.title}</h3>
//                   <p className="text-sm text-gray-600">
//                     {album.artist.map(a => a.name).join(', ')}
//                   </p>
//                 </Card>
//               ))}
//             </div>
//             <h2 className="text-xl font-semibold mb-4">Featured Songs</h2>
//       {songs && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           <SongList songs={songs} />
//             </div>
//       )}

 
//             {searchQuery && songs && (
//               <div className="mt-8">
//                 <h2 className="text-xl font-semibold mb-4">Search Results</h2>
//                 <div className="space-y-2">
//                   {songs.map((song) => (
//                     <Card imageUrl={song.cover} title={song.title} key={song.slug} onPlay={() => {}} className="p-4">
          
//                       <div className="flex items-center space-x-4">
//                         <img
//                           src={song.cover || '/api/placeholder/50/50'}
//                           alt={song.title}
//                           className="w-12 h-12 rounded"
//                         />
//                         <div>
//                           <h3 className="font-medium">{song.title}</h3>
//                           <p className="text-sm text-gray-600">
//                             {song.artist.map(a => a.name).join(', ')}
//                           </p>
//                         </div>
//                       </div>
//                     </Card>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>

//       {/* Player Bar */}
//       <footer className="bg-white border-t">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               {currentSong && (
//                 <>
//                   <img
//                     src={currentSong.cover || '/api/placeholder/48/48'}
//                     alt={currentSong.title}
//                     className="w-12 h-12 rounded"
//                   />
//                   <div>
//                     <h4 className="font-medium">{currentSong.title}</h4>
//                     <p className="text-sm text-gray-600">
//                       {currentSong.artist.map(a => a.name).join(', ')}
//                     </p>
//                   </div>
//                 </>
//               )}
//             </div>
//             <div className="flex items-center space-x-6">
//               <button className="text-gray-500 hover:text-gray-700">
//                 <SkipBack className="w-6 h-6" />
//               </button>
//               <button 
//                 className="text-indigo-600 hover:text-indigo-700"
//                 onClick={() => setIsPlaying(!isPlaying)}
//               >
//                 {isPlaying ? (
//                   <PauseCircle className="w-10 h-10" />
//                 ) : (
//                   <PlayCircle className="w-10 h-10" />
//                 )}
//               </button>
//               <button className="text-gray-500 hover:text-gray-700">
//                 <SkipForward className="w-6 h-6" />
//               </button>
//             </div>
//             <div>
//               <button className="text-gray-500 hover:text-gray-700">
//                 <Heart className="w-6 h-6" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//         <PlayerBar />
//       </div>
//     </AudioProvider>
//   );
// };

// Root App Component remains the same
const AppPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);
  return (
    <QueryClientProvider client={queryClient}>
        {isAuthenticated ? (
          <MainApp />
        ) : (
          <Login />
        )}
    </QueryClientProvider>
  );
}
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
       <AppPage />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
