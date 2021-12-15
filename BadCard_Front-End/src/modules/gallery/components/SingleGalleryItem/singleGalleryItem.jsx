// @flow
import React from 'react';

const SingleGalleryItem = () => {
  return (
    <div className='col-md-3 col-lg-2 mb-4'>
      <div className='single-widget-block gallery-item'>
        <div
          className='thumbnail-image'
          style={{
            backgroundImage:
              'url(https://www.demorgan.org.uk/wp-content/uploads/2019/07/image-3QEVHjo07Clvtg-large.jpg)',
          }}
        ></div>
        <div className='thumbnail-title'>Evening Star over the Sea</div>
        <div className='thumbnail-meta d-none'>De Morgan, Evelyn</div>
        <div className='thumbnail-info d-none'>
          Object Number: P_EDM_0048
          <br />
          Date: Probably 1910 - 1914
          <br />
          Category: Oil on canvas and Paintings
          <br />
          Material: Oil on canvas
          <br />
          Dimensions: Canvas: H 307 x W 385 mm Framed: H 406 x W 480 x D 34 mm
          The evening star is more commonly known as the planet Venus, which is
          often visible in the night sky at sunset. Venus is also the planet of
          love and frequently depicted in art as a beautiful woman. Evelyn often
          chose to personify elements such as the Moon, Mist and Stars  not only
          reinforcing her predominant interest in representing the feminine, but
          also in the ancient sources of symbolism in which tradition she
          follows.
        </div>
        <div className='widget-action-icons'>
          <a
            type='button'
            className='icon editColumn'
            data-toggle='modal'
            data-target='#editColumnModal'
          >
            <i className='fas fa-pen'></i>
          </a>
          <button type='button' className='icon delete'>
            <i className='fas fa-trash'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleGalleryItem;
