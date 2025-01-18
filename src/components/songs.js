import React, { useState, useRef, createContext, useContext, useEffect } from 'react';
import { PlayCircle, PauseCircle, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import {api} from "../api"
import { MusicCard as Card } from './ui';

import Slider from '@mui/material/Slider';
import { Link } from 'react-router-dom';

const AudioContext = createContext(null);

// Audio Provider Component
const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [currentSong, setCurrentSong] = useState({title: "null", cover: null, artist: [{name: null}]});
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const playSong = async (song) => {
    try {
      if (currentSong?.slug === song.slug) {
        togglePlay();
        return;
      }

      const { file_url } = await api.getSongUrl(song.slug);
      audioRef.current.src = file_url;
      setCurrentSong(song);
      audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error playing song:', error);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const adjustVolume = (newVolume) => {
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        isPlaying,
        duration,
        currentTime,
        volume,
        isMuted,
        playSong,
        togglePlay,
        seek,
        toggleMute,
        adjustVolume,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

// Progress Bar Component
const ProgressBar = () => {
  const { duration, currentTime, seek } = useContext(AudioContext);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-7 min-w-full">
      <span className="text-sm text-gray-500">{formatTime(currentTime)}</span>
      <Slider
          aria-label="time-indicator"
          size="small"
          value={currentTime}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => seek(value)}
        />
      {/* <Slider
        value={[Math.floor(currentTime ? currentTime : 0)]}
        max={Math.floor(duration)}
        step={1}
        onValueChange={(value) => console.log(value)}
      /> */}
      <span className="text-sm text-gray-500">{formatTime(duration)}</span>
    </div>
  );
};

// Song List Component
const SongList = ({ songs }) => {
  const { playSong, currentSong, isPlaying } = useContext(AudioContext);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {songs.map((song) => (
        <div>
          <Card
            key={song.slug}
            slug={song.slug}
            title={song.title}
            // subtitle={song.artist.map(a => a.name).join(', ')}
            subtitle={song.artist.map(a => <Link to={`/artists/${a.slug}`}>{a.name}</Link>)}
            isLiked={song.liked}
            imageUrl={song.cover}
            onPlay={() => playSong(song)}
            isPlaying={isPlaying && currentSong.slug === song.slug}
            onLike={api.likeSong}
            onDislike={api.dislikeSong}
            className={`p-4 hover:shadow-lg transition-shadow ${currentSong?.slug === song.slug ? 'bg-indigo-50' : ''}`}
          >
          </Card>
        </div>
      ))}
    </div>
  );
};

// Updated Player Bar Component
const PlayerBar = () => {
  const { 
    currentSong,
    isPlaying,
    togglePlay,
    volume,
    isMuted,
    toggleMute,
    adjustVolume
  } = useContext(AudioContext);

  if (!currentSong) return null;

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={currentSong.cover || '/api/placeholder/48/48'}
              alt={currentSong.title}
              className="w-12 h-12 rounded"
            />
            <div>
              <h4 className="font-medium">{currentSong.title}</h4>
              <p className="text-sm text-gray-600">
                {currentSong.artist.map(a => a.name).join(', ')}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 w-1/2 grow">
            <div className="flex items-center space-x-6">
              <button className="text-gray-500 hover:text-gray-700">
                <SkipBack className="w-6 h-6" />
              </button>
              <button 
                className="text-indigo-600 hover:text-indigo-700"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <PauseCircle className="w-10 h-10" />
                ) : (
                  <PlayCircle className="w-10 h-10" />
                )}
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <SkipForward className="w-6 h-6" />
              </button>
            </div>
            <ProgressBar />
          </div>

          {/* <div className="items-center space-x-4 hidden sm:flex w-1/5 ">
            <button onClick={toggleMute} className="text-gray-500 hover:text-gray-700">
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
            <Slider
              value={[isMuted ? 0 : volume * 100]}
              max={100}
              className="w-24"
              onChange={(value) => adjustVolume(value[0] / 100)}
            />
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export {SongList, AudioProvider, PlayerBar};