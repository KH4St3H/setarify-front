import React from 'react';
import { SongList, AudioProvider, PlayerBar } from './songs';
import { api } from "../api"
import { useQuery } from '@tanstack/react-query';
import {  useParams } from 'react-router-dom';


const Album = () => {
    let params = useParams();
    console.log(params);
    const { data: songs } = useQuery({ queryKey: ['album', params.slug], queryFn: () => api.getSongs(params.slug, 'album') });
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

export {Album};