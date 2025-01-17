import React, {useState} from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { Heart, Play } from 'lucide-react';
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
      <div>
      <img
        src={imageUrl || "/api/placeholder/400/400"}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="p-4">
        <div className="flex items-start justify-between">

          <div>
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            <Link to={`/albums/${slug}`}>{title}</Link>
          </h3>
          <p className="text-sm text-gray-600 mt-1 truncate">{subtitle}</p>
          </div>

          {onPlay !== null ?
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => {liked ? onDislike(slug) : onLike(slug); setLiked(!liked)}}
              className="text-red-500 rounded-full p-2"
              aria-label="Like"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                {/* <path d="M12 21.35C10.55 20.03 7.55 17.36 5.4 15.36C2 12.28 2 8.5 2 8.5C2 6.42 3.42 5 5.5 5C7.54 5 9.04 6.42 9.57 7.78C10.1 9.14 11 10.5 11 10.5C11 10.5 13 8.36 14.46 7.78C15.92 7.21 17.5 5 17.5 5C19.58 5 21 6.42 21 8.5C21 12.28 17.6 15.36 14.45 17.36C11.3 19.36 12 21.35 12 21.35Z" /> */}
                <path d="M12.1 21.35l-1.1-1.05C5.14 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.14 6.86-8.9 11.8l-1.1 1.05z" stroke="currentColor" strokeWidth="2" fill={liked ? "red" : "white"} />

                {/* {isLiked ? (
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.42 3.42 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87C14.46 5.99 15.96 5 17.5 5 19.58 5 21 6.42 21 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              ) : (
              )} */}

              </svg>
            </button>

            <button
              onClick={onPlay}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gray"
                viewBox="0 0 24 24"
                className="w-5 h-5 mr-2"
              >
                {isPlaying ? (
                  <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                ) : (
                  <path d="M8 5v14l11-7z" />
                )}
                {isPlaying ? "Pause" : "Play"}
              </svg>
              {/* Play */}
            </button>
          </div>
          :<></>}
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
              className= "w-4 h-4 text-gray-600"
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
