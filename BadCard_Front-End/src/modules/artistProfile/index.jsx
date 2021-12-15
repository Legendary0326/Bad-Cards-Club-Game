import React from 'react';
import Layout from 'components/Layout';

import ProfileInfo from './components/profileInfo';
// import CustomizeGallery from './components/customGallery';

import './styles.scss';

const ArtistProfile = () => {
  return (
    <Layout>
      <div className='artist-profile'>
        <div className='artist-profile-section'>
          <div className='artist-profile-section-header mb-5 text-center'>
            <span className="fw-bold fs-2 cursor-default">Profile Information</span>
          </div>
          <div className='artist-profile-section-content'>
            <ProfileInfo />
          </div>
        </div>
        {/* <div className='artist-profile-section'>
          <div className='artist-profile-section-header mb-5 text-center'>
            Customize Art Gallery
          </div>
          <div className='artist-profile-section-content'>
            <CustomizeGallery />
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default ArtistProfile;
