import React from 'react';
import Layout from 'components/Layout';
import SingleGalleryItem from 'modules/gallery/components/SingleGalleryItem';

const GalleryListing = () => {
  return (
    <Layout>
      <div className='row justify-content-center'>
        <div className='col-md-3 col-lg-2 mb-4'>
          <a className='single-widget-block add-new-item'>
            <div className='add-content' style={{ marginTop: '100px' }}>
              <i className='fas fa-plus-square'></i>
              <p>Add New</p>
            </div>
          </a>
        </div>

        <SingleGalleryItem />
        <SingleGalleryItem />
        <SingleGalleryItem />
      </div>
    </Layout>
  );
};

export default GalleryListing;
