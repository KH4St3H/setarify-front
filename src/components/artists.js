import React, { useEffect, useRef } from 'react';
import { SongList, AudioProvider, PlayerBar } from './songs';
import { api } from "../api"
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';

const ArtistCard = ({
  title=null,
  subtitle=null,
  imageUrl=null,
  isLiked=false,
  isPlaying=false,
  slug=null
}) => {
//   const [liked, setLiked] = useState(isLiked);
    return (
        <Link to={`/artists/${slug}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div>
                    <img
                        src={imageUrl || "/api/placeholder/400/400"}
                        alt={title}
                        className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="p-4">
                        <div className="flex items-start justify-between justify-items-center">

                            {/* <div> */}
                                <h3 className="text-lg font-semibold text-gray-800 truncate text-center grow">
                                    {title}
                                </h3>
                                {/* <p className="text-sm text-gray-600 mt-1 truncate">{subtitle}</p> */}
                            {/* </div> */}

                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const ArtistList = ({ artists }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {artists.map((artist) => (
        <div>
          <ArtistCard
            key={artist.slug}
            slug={artist.slug}
            title={artist.name}
            // subtitle={album.artist.map(a => a.name).join(', ')}
            // isLiked={album.liked}
            imageUrl={artist.cover !== null ? artist.cover : `${process.env.PUBLIC_URL}/Unknown_person.jpg`}
            // onPlay={() => playalbum(album)}
            // onLike={api.likealbum}
            // onDislike={api.dislikeSong}
            className={`p-4 hover:shadow-lg transition-shadow`}
          >
          </ArtistCard>
        </div>
      ))}
    </div>
  );
};

const Artists = () => {
    const sentinelRef = useRef(null);
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['artists'],
        queryFn: ({ pageParam }) => api.getArtists(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined;
            return new URL(lastPage.next).searchParams.get('page');
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

    const artists = data?.pages.flatMap(page => page.results) ?? [];

    return (
        <AudioProvider>
            <div class="p-4 sm:ml-64">
                <div className="container mx-auto p-4">
                    <ArtistList artists={artists} />
                    <div ref={sentinelRef} className="h-10 flex items-center justify-center">
                        {isFetchingNextPage && <span className="text-gray-400 text-sm">Loading...</span>}
                    </div>
                </div>
            </div>
            <div className='h-screen'></div>
            <footer className='mx-auto sticky bottom-0 sm:ml-64'>
                <PlayerBar></PlayerBar>
            </footer>
        </AudioProvider>
    );
}

const Artist = () => {
    let params = useParams();
    const sentinelRef = useRef(null);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['artist', params.slug],
        queryFn: ({ pageParam }) => api.getSongs(params.slug, 'artist', pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined;
            return new URL(lastPage.next).searchParams.get('page');
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

export {Artist, Artists};
