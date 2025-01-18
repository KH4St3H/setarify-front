import React, {useState} from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { Heart, PauseIcon, Play, PlayIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// Card component with hover effects and play button
const MusicCard = ({ 
  title=null, 
  subtitle=null, 
  imageUrl=null, 
  isLiked=false,
  isPlaying=false,
  onPlay=null, 
  onLike=null,
  onDislike=null,
  slug=null
}) => {
  const [liked, setLiked] = useState(isLiked);
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className='relative text-center'>
        <button onClick={onPlay}>
          <img
            src={imageUrl || "/api/placeholder/400/400"}
            alt={title}
            className="w-full h-full object-cover duration-300 group-hover:scale-105 hover:opacity-85 transition-opacity"
          />
        <div className="absolute inset-0 z-0 bg-white text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300">

          {/* <button className="mt-10 text-black font-bold py-2 px-4 rounded text-center z-50"> */}
          {/* <PlayIcon size={48} className='text-center'>Play</PlayIcon> */}
            {/* Test Button */}
          {/* </button> */}
            <p
              // onClick={onPlay}
              className="mt-10 text-black font-bold py-2 px-4 rounded text-center z-50"
            >
                {isPlaying ? (
                  <PauseIcon size={48} className='text-center'>Pause</PauseIcon>
                ) : (
                  <PlayIcon size={48} className='text-center'>Play</PlayIcon>
                )}
              {/* Play */}
            </p>
        </div>
        </button>
        </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className='w-full'>
            <h3 className="text-lg font-semibold text-gray-800 truncate shrink">
              <Link to={`/albums/${slug}`}>{title}</Link>
            </h3>
            <div className='flex items-center flex-row content-center w-full'>
              <p className="text-sm text-gray-600 mt-1 truncate">{subtitle}</p>
              {onPlay !== null ?
                <div className="flex justify-end grow">
                  <button
                    onClick={() => { liked ? onDislike(slug) : onLike(slug); setLiked(!liked) }}
                    className="text-red-500 rounded-full p-2"
                    aria-label="Like"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                    >
                      <path d="M12.1 21.35l-1.1-1.05C5.14 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.14 6.86-8.9 11.8l-1.1 1.05z" stroke="currentColor" strokeWidth="2" fill={liked ? "red" : "white"} />
                    </svg>
                  </button>


                </div>
                : <></>}

            </div>
          </div>

        </div>
      </div>
    </div>
    );
};

// Horizontal Card component for playlist/search results
const HorizontalMusicCard = ({
  title,
  subtitle,
  imageUrl,
  duration,
  isLiked = false,
  onPlay,
  onLike,
  className
}) => {
  return (
    <div
      className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:bg-gray-50 transition-colors duration-200"
    >
      <div className="flex items-center p-3 gap-4">
        <div className="relative flex-shrink-0">
          <img
            src={imageUrl || "/api/placeholder/60/60"}
            alt={title}
            className="w-12 h-12 object-cover rounded-md"
          />
          <button
            onClick={onPlay}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          >
            <Play className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{title}</h3>
          <p className="text-sm text-gray-600 truncate">{subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{duration}</span>
          <button
            onClick={onLike}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <Heart
              className="w-4 h-4 text-gray-600"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

// Audio Progress Slider component
const Slider = React.forwardRef(({value, max, step, onValueChange}, ref) => {
  return (
    <SliderPrimitive.Root
      ref={ref}
      value={value}
      max={max}
      step={step}
      onValueChange={onValueChange}
      // {...props}
      className="relative flex items-center w-full h-4"
    >
      <SliderPrimitive.Track className="relative flex-grow h-1 bg-gray-300 rounded">
        <SliderPrimitive.Range className="absolute h-full bg-blue-500 rounded" />
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb className="block w-4 h-4 bg-blue-500 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300" />
    </SliderPrimitive.Root>
  );
});
Slider.displayName = "Slider";

// Volume Slider component
const VolumeSlider = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className="relative flex w-24 touch-none select-none items-center"
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-gray-200">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-indigo-600" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-3 w-3 rounded-full border border-indigo-600 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
});
VolumeSlider.displayName = "VolumeSlider";

// Usage Example Component
const ExampleUsage = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Grid of Music Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MusicCard
          title="Album Title"
          subtitle="Artist Name"
          imageUrl="/api/placeholder/400/400"
          onPlay={() => console.log('Play clicked')}
          onLike={() => console.log('Like clicked')}
        />
      </div>

      {/* List of Horizontal Cards */}
      <div className="space-y-2">
        <HorizontalMusicCard
          title="Song Title"
          subtitle="Artist Name"
          duration="3:45"
          onPlay={() => console.log('Play clicked')}
          onLike={() => console.log('Like clicked')}
        />
      </div>

      {/* Sliders */}
      {/* <div className="space-y-4">
        <div className="w-full"> */}
          <Slider
            defaultValue={[33]}
            max={100}
            step={1}
            // className="w-full"
          />
        {/* </div>
        <div> */}
          <SliderPrimitive.Slider
            defaultValue={[75]}
            max={100}
            step={1}
          />
        {/* </div>
      </div> */}
    </div>
  );
};

export { MusicCard, HorizontalMusicCard, Slider, VolumeSlider, ExampleUsage, SliderPrimitive };
