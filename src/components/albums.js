import React from 'react';
import { MusicCard as Card} from './ui';



// album List Component
const AlbumList = ({ albums }) => {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {albums.map((album) => (
        <div>
          <Card
            key={album.slug}
            slug={album.slug}
            title={album.title}
            subtitle={album.artist.map(a => a.name).join(', ')}
            // isLiked={album.liked}
            imageUrl={album.cover !== null ? album.cover : ''}
            // onPlay={() => playalbum(album)}
            // onLike={api.likealbum}
            // onDislike={api.dislikeSong}
            className={`p-4 hover:shadow-lg transition-shadow`}
          >
          </Card>
        </div>
      ))}
    </div>
  );
};


export {AlbumList};