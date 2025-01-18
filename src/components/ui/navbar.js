import { Layout, Search } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const NavBar = ({ searchQuery, setSearchQuery }) => {
    let location = useLocation();
    return (
        <>

            <header className="bg-white shadow-sm sticky top-0 px-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4 sm:hidden">
                        <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span class="sr-only">Open sidebar</span>
                            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button> 
                    </div>
                    <div className="items-center space-x-4 justify-self-start hidden sm:flex">
                        <Layout className="h-8 w-8 text-indigo-600" />
                        <h1 className="text-2xl font-bold text-gray-900">Setarify</h1>
                    </div>
                    <div className="flex items-center space-x-4 grow max-w-96 justify-self-end w-auto">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search songs, artists, albums..."
                                className="pl-10 pr-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </header>
            <aside className='fixed left-0 top-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-white' id='default-sidebar' aria-labelledby='asd'>
                <nav className="space-y-4 mt-20 top-auto text-3xl">
                    {/* <Link to="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg"> */}
                    <Link to="/" className={`flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg ${location.pathname === "/" ? "font-semibold" : ""}`}>
                        Home
                    </Link>
                    <Link to="albums" className={`flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg ${location.pathname.startsWith("/albums") ? "font-semibold" : ""}`}>
                        Albums
                    </Link>
                    <Link to="artists" className={`flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg ${location.pathname.startsWith("/artists") ? "font-semibold" : ""}`}>
                        Artists
                    </Link>
                </nav>
                {/* Playlists */}
                <div className="mt-8">
                    <h3 className="px-4 font-semibold text-gray-500 uppercase tracking-wider text-3xl">
                        Playlists
                    </h3>
                </div>
            </aside>
        </>
    );
}

export { NavBar };