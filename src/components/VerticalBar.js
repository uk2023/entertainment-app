import React from 'react';
import { useRouter } from 'next/router';
import { Apps, Bookmark, Movie, Theaters, Tv, AccountCircleRounded } from '@mui/icons-material';
import './../styles/VerticalBar.css';

const VerticalBar = () => {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div className="vertical-bar">
      <div className="logo">
        <Movie className="icon-1" />
      </div>

      <div className="icon-wrapper" onClick={() => navigateTo('/Home')}>
        <Apps className="icon" />
      </div>

      <div className="icon-wrapper" onClick={() => navigateTo('/Movies')}>
        <Theaters className="icon" />
      </div>

      <div className="icon-wrapper" onClick={() => navigateTo('/TV')}>
        <Tv className="icon" />
      </div>

      <div className="icon-wrapper" onClick={() => navigateTo('/Bookmarks')}>
        <Bookmark className="icon" />
      </div>

      <div className="bottom-icon-wrapper">
        <div className="icon-wrapper" onClick={() => navigateTo('/Login')}>
          <AccountCircleRounded className="icon-2" />
        </div>
      </div>
    </div>
  );
};

export default VerticalBar;
