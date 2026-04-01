import React, { useEffect, useRef } from 'react';
import { SongList, AudioProvider, PlayerBar } from './songs';
import { api } from "../api"
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';


const Album = () => {
    let params = useParams();
    const sentinelRef = useRef(null);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['album', params.slug],
        queryFn: ({ pageParam = 1 }) => api.getSongs(params.slug, 'album', pageParam),
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
        <AudioProvider>
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
        </AudioProvider>
    );
}

export {Album};
